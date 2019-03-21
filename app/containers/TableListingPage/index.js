/**
 *
 * TableListingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactJson from 'react-json-view';
// import Switch from 'react-switch';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'globalUtils';
import tableSetting from 'utils/globalTableSetting';

import FormButton from 'containers/FormButton';
import globalScope from 'globalScope';
// import { Input } from '@tienping/my-react-kit';

import makeSelectTableListingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
// import messages from './messages';

import './style.scss';

export class TableListingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.setState(this.initialiseProps(this.props));

        if (this.props.pageType && tableSetting && tableSetting[this.props.pageType]) {
            if (tableSetting[this.props.pageType].api) {
                this.props.dispatch(actions.getList({ api: tableSetting[this.props.pageType].api }));
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        let obj = {};

        if (nextProps.pageType !== this.props.pageType) {
            this.setState(this.initialiseProps(nextProps));
            if (dataChecking(tableSetting, nextProps.pageType, 'api')) {
                this.props.dispatch(actions.getList({ api: tableSetting[nextProps.pageType].api }));
            }
        }

        if (nextProps.tablelistingpage.data !== this.props.tablelistingpage.data) {
            const { data } = nextProps.tablelistingpage;
            // const fields = tableSetting[nextProps.pageType].fields;
            // const result = this.toggledSortResult(0, fields[0].type, dataChecking(data, 'data', 'items')) || [];
            this.setState({
                data: dataChecking(data, 'data', 'items'),
                pagination: {
                    _meta: dataChecking(data, '_meta'),
                    _links: dataChecking(data, '_links'),
                },
                sorter: null,
                sortDirection: 'desc',
            });
        }

        this.state.formButtonList.map((buttonKey) => {
            if (nextProps.tablelistingpage[buttonKey] &&
                    nextProps.tablelistingpage[buttonKey] !== this.props.tablelistingpage[buttonKey]) {
                obj[buttonKey] = nextProps.tablelistingpage[buttonKey];
                obj[buttonKey].getListApi = tableSetting[this.props.pageType].api;
                this.setState(obj);
            }
            return true;
        });

        if (nextProps.tablelistingpage.addNewButtonToList !== this.props.tablelistingpage.addNewButtonToList
                && !this.state.formButtonList[nextProps.tablelistingpage.addNewButtonToList]) {
            obj = this.state.formButtonList;
            obj.push(nextProps.tablelistingpage.addNewButtonToList);
            this.setState({ formButtonList: obj });
        }

        if (nextProps.tablelistingpage.getItemData !== this.props.tablelistingpage.getItemData) {
            const { data, field, buttonId } = nextProps.tablelistingpage.getItemData;

            const arr = dataChecking(data, field.itemDataPath) || [];
            const tempItems = [];
            arr.forEach((value) => {
                tempItems.push({
                    id: `${field.key}_${value.id}`,
                    value: `${dataChecking(value, field.itemDataValuePath)}`,
                    label: `${dataChecking(value, field.itemDataLabelPath)}`,
                });
            });

            globalScope.selectionData[field.key] = tempItems;
            if (buttonId) {
                console.log(buttonId);
            }
        }
    }

    onPageChange(pageApi) {
        if (pageApi) {
            this.props.dispatch(actions.getList({ api: pageApi }));
        }
    }

    customSorting(data1, data2, dataType) {
        if (dataType === 'datetime') {
            const firstDate = data1 ? new Date(data1) : 0;
            const secondDate = data2 ? new Date(data2) : 0;
            return firstDate > secondDate;
        } else if (dataType === 'integer' || dataType === 'boolean') {
            return (data1 || 0) - (data2 || 0);
        } else if (dataType === 'string') {
            return `${data1 || ''}`.localeCompare(`${data2 || ''}`);
        }
        return true;
    }

    toggledSortResult(index, dataType, dataPassed) {
        const arr = dataPassed || (this.state.data);

        if (arr && arr.length) {
            const fields = tableSetting[this.props.pageType].fields;
            return arr.sort((a, b) => this.customSorting(a[fields[index].key], b[fields[index].key], dataType));
        }

        console.warn('[TP Warning]: arr is empty in toggledSortResult');

        return arr;
    }

    toggleReverseResult(dataPassed) {
        const arr = dataPassed || (this.state.data);

        return arr.reverse();
    }

    initialiseProps = (theProps) => {
        const obj = {
            tableConfig: dataChecking(tableSetting, theProps.pageType, 'fields') || [],
            tableWidth: dataChecking(tableSetting, theProps.pageType, 'tableWidth') || 150,
            actionButtons: dataChecking(tableSetting, theProps.pageType, 'actionButtons') || [],
            data: [],
            sorter: {},
            formButtonList: [],
        };

        obj.actionButtons.map((item) => {
            obj.formButtonList.push(`formButton_${item.type === 'upload' ? 'upload' : 'create'}_${this.props.pageType}`);
            return true;
        });

        return obj;
    };

    renderMenu = () => (
        <section className="page-actions" style={{ width: dataChecking(this.state, 'tableWidth') || 'auto' }}>
            {
                dataChecking(this.state, 'actionButtons') ?
                    this.state.actionButtons.map((item, index) => {
                        if (item.type === 'createNew') {
                            return (
                                <span key={index} style={{ display: 'inline-block', width: item.width, margin: '0 1rem' }}>
                                    <FormButton
                                        key="create-button"
                                        formId={`create_${this.props.pageType}`}
                                        formSettingKey={`create_${this.props.pageType}`}
                                        // formType="attach"
                                        formbutton={this.state[`formButton_create_${this.props.pageType}`] || {}}
                                    >
                                        <div className="gamicenter-button" style={{ width: item.width }}>{item.title}</div>
                                    </FormButton>
                                </span>
                            );
                        } else if (item.type === 'upload') {
                            return (
                                <span key={index} style={{ display: 'inline-block', width: item.width, margin: '0 1rem' }}>
                                    <FormButton
                                        key="upload-button"
                                        formId={`upload_${this.props.pageType}`}
                                        formSettingKey={`upload_${this.props.pageType}`}
                                        // formType="attach"
                                        formbutton={this.state[`formButton_upload_${this.props.pageType}`] || {}}
                                    >
                                        <div className="gamicenter-button" style={{ width: item.width }}>{item.title}</div>
                                    </FormButton>
                                </span>
                            );
                        }

                        return (
                            <span key={index} style={{ display: 'inline-block', width: item.width, margin: '0 1rem' }}>
                                <FormButton
                                    key="create-button"
                                    style={{ width: item.width }}
                                    pageType={this.props.pageType}
                                    formId={`create_${this.props.pageType}`}
                                    formSettingKey={`create_${this.props.pageType}`}
                                    formType="attach"
                                    formbutton={this.state[`formButton_create_${this.props.pageType}`] || {}}
                                >
                                    {item.title}
                                </FormButton>
                            </span>
                        );
                    })
                    :
                    null
            }
        </section>
    );

    renderSorter(head, index) {
        if (head.type === 'integer' || head.type === 'string' || head.type === 'datetime' || head.type === 'boolean') {
            return (
                <div
                    onClick={() => {
                        let data = {};
                        let direction = 'asc';

                        if (dataChecking(this.state, 'sorter') === index) {
                            data = this.toggleReverseResult();
                            direction = (dataChecking(this.state, 'sortDirection') === 'desc') ? 'asc' : 'desc';
                        } else {
                            data = this.toggledSortResult(index, head.type);
                        }

                        this.setState({
                            sorter: index,
                            sortDirection: direction,
                            data,
                        });
                    }}
                    className="sort-container"
                    title={`${
                        dataChecking(this, 'state', 'sorter') === index ?
                            dataChecking(this, 'state', 'sortDirection') === 'desc' ? 'Change to Descending' : 'Change to Ascending'
                            :
                            'Toggle Ascending Sort'
                    }`}
                >
                    <i
                        className={
                            `
                                fas
                                ${dataChecking(this, 'state', 'sorter') === index ? 'active' : ''}
                                ${dataChecking(this, 'state', 'sorter') === index && dataChecking(this, 'state', 'sortDirection') === 'desc' ? 'fa-sort-down' : 'fa-sort-up'}
                            `
                        }
                    />
                </div>
            );
        }
        return null;
    }

    renderHelp(head, index) {
        if (dataChecking(head, 'doc', 'description')) {
            return (
                <div className={`help-container ${index < 2 ? 'x-axis-adjustment' : ''}`}>
                    <i
                        onClick={() => {
                            this.setState({ showHelp: index });
                        }}
                        className="far fa-question-circle"
                    />
                    <div className={`content-container ${this.state.showHelp === index ? 'active' : ''}`}>
                        <div
                            className="close-btn"
                            onClick={() => {
                                this.setState({ showHelp: null });
                            }}
                        >
                            <img alt="unselect-upload" width="18px" src={require('../../Resources/ic-close.png')} />
                        </div>
                        <div className="content">
                            <div className="pb-1">
                                <span>Data type: </span>
                                <span className="text-secondary-color bigger">{head.type}</span>
                            </div>
                            <div>{head.doc.description}</div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }

    renderPaginatior() {
        const { pagination } = this.state;
        return (
            dataChecking(pagination, '_meta', 'currentPage') ?
                <div className="table-paginator" style={{ width: dataChecking(this.state, 'tableWidth') || 'auto' }}>
                    {
                        dataChecking(pagination, '_links', 'first', 'href') ?
                            <a
                                className="pagi-button py-1 px-1"
                                onClick={() => {
                                    this.onPageChange(pagination._links.last.href);
                                }}
                            >
                                <span className="pagi-next pagi-item" title="First">&lt;&lt;</span>
                            </a>
                            :
                            null
                    }
                    {
                        dataChecking(pagination, '_links', 'prev', 'href') ?
                            <a
                                className="pagi-button py-1 px-1"
                                onClick={() => {
                                    this.onPageChange(pagination._links.prev.href);
                                }}
                            >
                                <span className="pagi-prev pagi-item" title="Prev">&lt;</span>
                            </a>
                            :
                            null
                    }
                    <span className="pagi-current pagi-item px-1 py-1">
                        [&nbsp;
                        {(((pagination._meta.currentPage - 1) * pagination._meta.perPage) + 1)}
                        &nbsp;to&nbsp;
                        {
                            pagination._meta.totalCount > pagination._meta.perPage ?
                                ((pagination._meta.currentPage) * pagination._meta.perPage)
                                :
                                pagination._meta.totalCount
                        }
                        &nbsp; out of &nbsp;
                        {pagination._meta.totalCount}
                        &nbsp;]
                    </span>
                    {
                        dataChecking(pagination, '_links', 'next', 'href') ?
                            <a
                                className="pagi-button py-1 px-1"
                                onClick={() => {
                                    this.onPageChange(pagination._links.next.href);
                                }}
                            >
                                <span className="pagi-next pagi-item" title="Next">&gt;</span>
                            </a>
                            :
                            null
                    }
                    {
                        dataChecking(pagination, '_links', 'last', 'href') ?
                            <a
                                className="pagi-button py-1 px-1"
                                onClick={() => {
                                    this.onPageChange(pagination._links.last.href);
                                }}
                            >
                                <span className="pagi-next pagi-item" title="Last">&gt;&gt;</span>
                            </a>
                            :
                            null
                    }
                </div>
                :
                null
        );
    }

    renderTable() {
        return (
            <section className="table-container">
                {this.renderPaginatior()}
                <div className="table-content">
                    <div className="table-content-wrapper" style={{ width: dataChecking(this.state, 'tableWidth') || 'auto' }}>
                        <div className="table-header table-row" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            {
                                dataChecking(this.state, 'tableConfig') ?
                                    this.state.tableConfig.map((head, index) => (
                                        <div
                                            key={index}
                                            className="table-header-item table-row-item"
                                            style={{ width: head.width, maxWidth: head.width, textAlign: head.align }}
                                        >
                                            <span>{ head.label }</span>
                                            {this.renderSorter(head, index)}
                                            {this.renderHelp(head, index)}
                                        </div>
                                    ))
                                    :
                                    null
                            }
                        </div>
                        {
                            this.state && this.state.data && this.state.data.length ?
                                this.state.data.map((row, index) => (
                                    <div key={index} className="table-row">
                                        {
                                            dataChecking(this.state, 'tableConfig') ?
                                                this.state.tableConfig.map((col, index2) => (
                                                    <div
                                                        key={index2}
                                                        className={`table-row-item ${col.type === 'html' ? 'posi-relative' : ''}`}
                                                        style={{ width: col.width, maxWidth: col.width, textAlign: col.align }}
                                                    >
                                                        { this.renderCell(row, col, index) }
                                                    </div>
                                                ))
                                                :
                                                null
                                        }
                                    </div>
                                ))
                                :
                                <div className="table-row" >
                                    <div
                                        className="table-row-item"
                                        style={{ display: 'inline-block', padding: '3vh 1vw', width: '100%' }}
                                    >
                                        {
                                            dataChecking(this.props, 'tablelistingpage', 'loading') ?
                                                'loading'
                                                :
                                                'No data found...'
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </section>
        );
    }

    renderCell = (row, col, rowIndex) => {
        let date = null;

        switch (col.type) {
            case 'action':
                return (
                    <div style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {
                            col.items && col.items.map((value, index) => (
                                <div
                                    key={index}
                                    className="action-item"
                                >
                                    {
                                        value.special === 'edit-form' ?
                                            <FormButton
                                                key="create-button"
                                                formId={`edit_${this.props.pageType}__#__${rowIndex}`}
                                                formSettingKey={`edit_${this.props.pageType}`}
                                                initialData={row}
                                                formbutton={this.state[`formButton_edit_${this.props.pageType}__#__${rowIndex}`] || {}}
                                            >
                                                <div className="gamicenter-button invert smaller px-1 py-half my-quater">
                                                    <i className="fas fa-edit"></i>
                                                    <span className="pl-1">Edit</span>
                                                </div>
                                            </FormButton>
                                            :
                                            <a
                                                className="gamicenter-button invert smaller px-1 py-half my-quater"
                                                onClick={(value2, index2) => {
                                                    if (value.onPressHandling) {
                                                        value.onPressHandling(index2, this, row, actions);
                                                    }
                                                }}
                                            >
                                                {
                                                    value.image ?
                                                        <img src={value.image} alt={value.name} width="15px" height="15px" />
                                                        :
                                                        <i className={value.iconClass ? value.iconClass : 'fas fa-exclamation-circle'} />
                                                }
                                                <span className="pl-1">{value.name}</span>
                                            </a>
                                    }
                                </div>
                            ))
                        }
                    </div>
                );
            case 'checkbox':
                return <span>[ ]</span>;
            case 'boolean':
                return (
                    // <Switch
                    //     onChange={() => {}}
                    //     disabled={true}
                    //     checked={row[col.key] || false}
                    // />
                    <div className="">
                        <i className={`fas fa-circle ${row[col.key] ? 'text-success' : 'text-danger'}`}></i>
                        <span className="pl-1">{row[col.key] ? 'Active' : 'Inactive'}</span>
                    </div>
                );
            case 'image':
                return <img src={row[col.key]} alt={row.name} width={row.width || '100%'} height={row.height || ''} />;
            case 'date':
                if (row[col.key]) {
                    date = new Date(row[col.key]);
                    return <span>{date.toLocaleDateString()}</span>;
                }
                return null;
            case 'datetime':
                if (row[col.key]) {
                    date = new Date(row[col.key]);
                    return <span>{date.toLocaleString()}</span>;
                }
                return null;
            case 'json':
                return <ReactJson src={JSON.parse(row[col.key])} name={false} enableClipboard={false}></ReactJson>;
            case 'link':
                return <a href={dataChecking(row, col.key) ? row[col.key] : ''}>{ dataChecking(row, col.key) ? row[col.key] : '\u00A0' }</a>;
            case 'html':
                return (
                    <div className={`html-cell-block ${dataChecking(this.state, `fullmode_${col.key}`, rowIndex) ? 'full-mode' : ''}`}>
                        <div className="html-cell-container">
                            <span
                                className={`html-indicator ${dataChecking(this.state, `htmlmode_${col.key}`, rowIndex) ? 'hide-it' : ''}`}
                                dangerouslySetInnerHTML={{ __html: dataChecking(row, col.key) ? row[col.key] : '' }}
                            ></span>
                            <span className={`html-indicator code-type ${dataChecking(this.state, `htmlmode_${col.key}`, rowIndex) ? '' : 'hide-it'}`}>
                                { dataChecking(row, col.key) ? row[col.key] : '\u00A0' }
                            </span>
                            <div className="toggle-actions">
                                <div
                                    title="toggle full mode"
                                    className="toggler full-mode-toggler"
                                    onClick={() => {
                                        const tempObj = {};
                                        const fullmode = { ...this.state[`fullmode_${col.key}`] } || {};
                                        fullmode[rowIndex] = !fullmode[rowIndex];
                                        tempObj[`fullmode_${col.key}`] = fullmode;
                                        this.setState(tempObj);
                                    }}
                                >
                                    {
                                        dataChecking(this.state, `fullmode_${col.key}`, rowIndex) ?
                                            <i className="fas fa-compress-arrows-alt"></i>
                                            :
                                            <i className="fas fa-expand"></i>
                                    }
                                </div>
                                <div
                                    title="toggle html mode"
                                    className="toggler html-mode-toggler"
                                    onClick={() => {
                                        const tempObj = {};
                                        const htmlmode = { ...this.state[`htmlmode_${col.key}`] } || {};
                                        htmlmode[rowIndex] = !htmlmode[rowIndex];
                                        tempObj[`htmlmode_${col.key}`] = htmlmode;
                                        this.setState(tempObj);
                                    }}
                                >
                                    <i className="fas fa-code" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <span>{ dataChecking(row, col.key) ? row[col.key] : '\u00A0' }</span>;
        }
    }

    render() {
        return (
            <div id="TableListingPage-container" className="TableListingPage-page">
                <Helmet>
                    <title style={{ textTransform: 'capitalize' }}>
                        {
                            dataChecking(this.props, 'pageType') && dataChecking(tableSetting, this.props.pageType, 'title') ?
                                `${tableSetting[this.props.pageType].title}`
                                :
                                'Table'
                        }
                    </title>
                    <meta name="description" content="Description of TableListingPage" />
                </Helmet>
                <h1 style={{ textAlign: 'center', textTransform: 'capitalize' }}>{dataChecking(this.props, 'pageType') && dataChecking(tableSetting, this.props.pageType, 'title') ? `${tableSetting[this.props.pageType].title}` : 'Table'}</h1>
                {/* <div style={{ padding: '1rem', background: 'lime' }}>
                    <Input></Input>
                </div> */}
                {this.renderMenu()}
                {this.renderTable()}
            </div>
        );
    }
}

TableListingPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    tablelistingpage: makeSelectTableListingPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'tableListingPage', reducer });
const withSaga = injectSaga({ key: 'tableListingPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter,
)(TableListingPage);
