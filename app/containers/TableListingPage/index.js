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
import tableSetting from 'configs/tableSetting';

import FormButton from 'containers/FormButton';
import globalScope from 'globalScope';
import Button from '@material-ui/core/Button';
import { NotificationManager } from 'react-notifications';
// import { Input } from '@tienping/my-react-kit';

import makeSelectGlobalDataProcessor from 'containers/GlobalDataProcessor/selectors';
import * as GDPActions from 'containers/GlobalDataProcessor/actions';
import makeSelectTableListingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import * as actions from './actions';
// import messages from './messages';

import './style.scss';

export class TableListingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {};
        this.socketChannel = null;
    }

    componentWillMount() {
        this.setState(this.initialiseProps(this.props));

        const id = dataChecking(this.props, 'match', 'params', 'id');
        if (this.props.pageType && tableSetting && tableSetting[this.props.pageType]) {
            if (tableSetting[this.props.pageType].listenSocket) {
                this.getFeatherQuery();
            } else if (tableSetting[this.props.pageType].getSocketParams) {
                this.props.dispatch(GDPActions.getListByFeather(tableSetting[this.props.pageType].getSocketParams({ id })));
            } else if (tableSetting[this.props.pageType].api) {
                this.props.dispatch(GDPActions.getList({ api: tableSetting[this.props.pageType].api, id }));
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        let obj = {};
        const { globaldataprocessor } = nextProps;

        if (nextProps.pageType !== this.props.pageType) {
            this.setState(this.initialiseProps(nextProps));
            if (dataChecking(tableSetting, nextProps.pageType, 'api')) {
                this.props.dispatch(GDPActions.getList({ api: tableSetting[nextProps.pageType].api }));
            }
        }

        if (globaldataprocessor.data !== this.props.globaldataprocessor.data) {
            const { data } = globaldataprocessor;
            this.setState({
                data: dataChecking(data, 'result'),
                pagination: {
                    _meta: dataChecking(data, '_meta'),
                    _links: dataChecking(data, '_links'),
                },
                sorter: null,
                sortDirection: 'desc',
            });
        }

        this.state.formButtonList.map((buttonKey) => {
            if (globaldataprocessor[buttonKey] &&
                    globaldataprocessor[buttonKey] !== this.props.globaldataprocessor[buttonKey]) {
                obj[buttonKey] = globaldataprocessor[buttonKey];
                obj[buttonKey].pageType = this.props.pageType;
                this.setState(obj);
            }
            return true;
        });

        if (globaldataprocessor.addNewButtonToList !== this.props.globaldataprocessor.addNewButtonToList
                && !this.state.formButtonList[globaldataprocessor.addNewButtonToList]) {
            obj = this.state.formButtonList;
            obj.push(globaldataprocessor.addNewButtonToList);
            this.setState({ formButtonList: obj });
        }

        if (globaldataprocessor.getItemData !== this.props.globaldataprocessor.getItemData) {
            const { data, field, buttonId } = globaldataprocessor.getItemData;

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

        this.state.formButtonList.map((buttonKey) => {
            if (globaldataprocessor[buttonKey] &&
                    globaldataprocessor[buttonKey] !== this.props.globaldataprocessor[buttonKey]) {
                obj[buttonKey] = globaldataprocessor[buttonKey];
                obj[buttonKey].pageType = this.props.pageType;
                this.setState(obj);
            }
            return true;
        });

        if (globaldataprocessor.toggleUtilFormButton !== this.props.globaldataprocessor.toggleUtilFormButton) {
            const { toggleUtilFormButton } = globaldataprocessor;
            const current = { ...this.state[toggleUtilFormButton.id] };
            current.toggleModal = toggleUtilFormButton.status;
            current.resetOnClose = toggleUtilFormButton.resetOnClose;
            current.onSuccessCallback = toggleUtilFormButton.onSuccessCallback;
            current.onFailureCallback = toggleUtilFormButton.onFailureCallback;

            obj = this.state.formButtonList;
            if (toggleUtilFormButton.status && !obj.includes(toggleUtilFormButton.id)) {
                obj.push(toggleUtilFormButton.id);
            }
            this.setState({ formButtonList: obj, [toggleUtilFormButton.id]: current });
        }
    }

    componentWillUnmount() {
        this.socketChannel(); // to unsubscribe channel
    }

    onPageChange(pageApi) {
        if (pageApi) {
            this.props.dispatch(GDPActions.getList({ api: pageApi }));
        }
    }

    onFeatherPageChange(direction) {
        if (direction === 'next') {
            this.getFeatherQuery({ $skip: this.state.pagination._meta.skip + this.state.pagination._meta.limit });
        } else if (direction === 'prev') {
            this.getFeatherQuery({ $skip: this.state.pagination._meta.skip - this.state.pagination._meta.limit });
        }
    }

    getFeatherQuery(topUpQuery) {
        const params = tableSetting[this.props.pageType].getSocketParams({ id: dataChecking(this.props, 'match', 'params', 'id') });

        if (topUpQuery) {
            params.options.query = {
                ...params.options.query,
                ...topUpQuery,
            };
        }

        globalScope.feather.authenticate(globalScope.token, 'aphrodite').then(console.log).catch(console.log);
        globalScope.feather.query(params.service, params.targetSocket).find(params.options)
            .then((response) => {
                console.log('getDataByAsyncAwait', response);
                this.setState({
                    data: dataChecking(response, 'result'),
                    pagination: {
                        _meta: dataChecking(response, 'paginate'),
                        // _links: dataChecking(data, '_links'),
                    },
                    // sorter: null,
                    // sortDirection: 'desc',
                });
            })
            .catch((response) => {
                NotificationManager.error(JSON.stringify(response), 'Error!! (click to dismiss)', 5000, () => {
                    // alert(JSON.stringify(formbutton.fireApiError).replace('\"', '"'));
                });
                console.log(JSON.stringify(response));
            });

        this.socketChannel = globalScope.feather.subscribe(params.service, params.targetSocket).onChange((response2) => {
            console.log('on subscribe update', response2);
            this.setState({
                data: response2,
            });
        });
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
                                        pageType={this.props.pageType}
                                        formId={`create_${this.props.pageType}`}
                                        formSettingKey={`create_${this.props.pageType}`}
                                        // formType="attach"
                                        formbutton={this.state[`formButton_create_${this.props.pageType}`] || {}}
                                        onModalComplete={(newState) => {
                                            if (newState && !tableSetting[newState.pageType].listenSocket) {
                                                this.props.dispatch(GDPActions.getList({ api: tableSetting[newState.pageType].api }));
                                            }
                                        }}
                                    >
                                        <div className="my-custom-button" style={{ width: item.width }}>{item.title}</div>
                                    </FormButton>
                                </span>
                            );
                        } else if (item.type === 'upload') {
                            return (
                                <span key={index} style={{ display: 'inline-block', width: item.width, margin: '0 1rem' }}>
                                    <FormButton
                                        key="upload-button"
                                        pageType={this.props.pageType}
                                        formId={`upload_${this.props.pageType}`}
                                        formSettingKey={`upload_${this.props.pageType}`}
                                        // formType="attach"
                                        formbutton={this.state[`formButton_upload_${this.props.pageType}`] || {}}
                                        onModalComplete={(newState) => {
                                            if (newState && !tableSetting[newState.pageType].listenSocket) {
                                                this.props.dispatch(GDPActions.getList({ api: tableSetting[newState.pageType].api }));
                                            }
                                        }}
                                    >
                                        <div className="my-custom-button" style={{ width: item.width }}>{item.title}</div>
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
                                    onModalComplete={(newState) => {
                                        if (newState && !tableSetting[newState.pageType].listenSocket) {
                                            this.props.dispatch(GDPActions.getList({ api: tableSetting[newState.pageType].api }));
                                        }
                                    }}
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

        if (dataChecking(pagination, '_meta', 'limit')) {
            return (
                <div className="table-paginator" style={{ width: dataChecking(this.state, 'tableWidth') || 'auto' }}>
                    {
                        pagination._meta.skip >= pagination._meta.limit ?
                            <a
                                className="pagi-button py-1 px-1"
                                onClick={() => {
                                    this.onFeatherPageChange('prev');
                                }}
                            >
                                <span className="pagi-prev pagi-item" title="Prev">&lt;</span>
                            </a>
                            :
                            null
                    }
                    <span className="pagi-current pagi-item px-1 py-1">
                        [&nbsp;
                        {(pagination._meta.skip) + 1}
                        &nbsp;to&nbsp;
                        {
                            pagination._meta.skip + pagination._meta.limit > pagination._meta.total ?
                                pagination._meta.total
                                :
                                pagination._meta.skip + pagination._meta.limit
                        }
                        &nbsp; out of &nbsp;
                        {pagination._meta.total}
                        &nbsp;]
                    </span>
                    {
                        pagination._meta.total > pagination._meta.skip + pagination._meta.limit ?
                            <a
                                className="pagi-button py-1 px-1"
                                onClick={() => {
                                    this.onFeatherPageChange('next');
                                }}
                            >
                                <span className="pagi-next pagi-item" title="Next">&gt;</span>
                            </a>
                            :
                            null
                    }
                </div>
            );
        }

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
                <div>{this.state.mockScrollLeft}</div>
                <div
                    id="mock-scroll-top"
                    className="mock-scroll-twin mock-scroll-top"
                    onScroll={(el) => {
                        const twin = document.getElementById('mock-scroll-bottom');
                        if (twin) { twin.scrollLeft = el.target.scrollLeft; }
                    }}
                >
                    <div style={{ width: dataChecking(this.state, 'tableWidth') || 'auto' }}></div>
                </div>
                <div
                    id="mock-scroll-bottom"
                    className="table-content mock-scroll-twin mock-scroll-bottom"
                    onScroll={(el) => {
                        const twin = document.getElementById('mock-scroll-top');
                        if (twin) { twin.scrollLeft = el.target.scrollLeft; }
                    }}
                >
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
                                            dataChecking(this.props, 'globaldataprocessor', 'loading') ?
                                                'loading'
                                                :
                                                dataChecking(this.props, 'globaldataprocessor', 'error') || 'No data found...'
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </section>
        );
    }

    renderUtilModals = () => (
        <div>
            <FormButton
                key="util-create-imagelink"
                pageType={this.props.pageType}
                formId="util_create_imagelink"
                formSettingKey="create_imagelink"
                submitButtonText="Create Imagelink Now"
                formbutton={this.state.formButton_util_create_imagelink || {}}
                onModalCancel={() => {
                    this.props.dispatch(GDPActions.toggleUtilFormButton('formButton_util_create_imagelink', false));
                }}
                onModalComplete={() => {
                    this.props.dispatch(GDPActions.toggleUtilFormButton('formButton_util_create_imagelink', false));
                }}
                dispatch={this.props.dispatch}
            ></FormButton>
        </div>
    );

    renderActionButton = (column, row, rowIndex) => {
        if (column.special === 'edit-form') {
            return (
                <FormButton
                    key="edit-button"
                    pageType={this.props.pageType}
                    formId={`edit_${this.props.pageType}__#__${rowIndex}`}
                    formSettingKey={`edit_${this.props.pageType}`}
                    initialData={row}
                    formbutton={this.state[`formButton_edit_${this.props.pageType}__#__${rowIndex}`] || {}}
                    onModalComplete={(newState) => {
                        if (newState && !tableSetting[newState.pageType].listenSocket) {
                            this.props.dispatch(GDPActions.getList({ api: tableSetting[newState.pageType].api }));
                        }
                    }}
                >
                    <Button variant="outlined" className="my-half">
                        <i className="fas fa-edit"></i>
                        <span className="pl-1">Edit</span>
                    </Button>
                </FormButton>
            );
        }

        return (
            <Button
                variant="outlined"
                className="my-half"
                onClick={(value2, index2) => {
                    if (column.onPressHandling) {
                        column.onPressHandling(index2, this, row, GDPActions);
                    }
                }}
            >
                {
                    column.image ?
                        <img src={column.image} alt={column.name} width="15px" height="15px" />
                        :
                        <i className={column.iconClass ? column.iconClass : 'fas fa-exclamation-circle'} />
                }
                <span className="pl-1">{column.name}</span>
            </Button>
        );
    }

    renderCell = (row, col, rowIndex) => {
        let date = null;

        if (!col || !col.key || !row || (row[col.key] === null) || (row[col.key] === '')) {
            return <span className="disabled">---</span>;
        }

        const value = dataChecking(row, col.dataPath || col.key);

        switch (col.type) {
            case 'action':
                return (
                    <div style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {
                            col.items && col.items.map((column, index) => (
                                <div
                                    key={index}
                                    className="action-item"
                                >
                                    { this.renderActionButton(column, row, rowIndex) }
                                </div>
                            ))
                        }
                    </div>
                );
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
                return <img src={row[col.key]} alt={row[col.key]} width={row.width || '100%'} height={row.height || ''} />;
            case 'date':
                date = new Date(value);
                return <span>{date.toLocaleDateString()}</span>;
            case 'datetime':
                date = new Date(value);
                return <span>{date.toLocaleString()}</span>;
            case 'object':
                return <ReactJson src={row[col.key]} name={false} enableClipboard={false}></ReactJson>;
            case 'json':
                return <ReactJson src={JSON.parse(row[col.key])} name={false} enableClipboard={false}></ReactJson>;
            case 'link':
                return <a href={value || ''}>{ value || '\u00A0' }</a>;
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
            case 'checkbox':
                return <span>[ ]</span>;
            case 'integer':
                return <span className="cell-type-integer">{value || '\u00A0'}</span>;
            default:
                return <span>{ value || '\u00A0'}</span>;
        }
    }

    render() {
        return (
            <div id="TableListingPage-container" className="TableListingPage-page">
                <Helmet>
                    <title style={{ textTransform: 'capitalize' }}>
                        {
                            dataChecking(this.props, 'pageType') && dataChecking(tableSetting, this.props.pageType, 'title') ?
                                `${tableSetting[this.props.pageType].title}${dataChecking(this.props, 'location', 'state', 'pageSubTitle') ? ` - ${this.props.location.state.pageSubTitle}` : ''}`
                                :
                                'Table'
                        }
                    </title>
                    <meta name="description" content="Description of TableListingPage" />
                </Helmet>
                <h1 style={{ textAlign: 'center', textTransform: 'capitalize' }}>{dataChecking(this.props, 'pageType') && dataChecking(tableSetting, this.props.pageType, 'title') ? `${tableSetting[this.props.pageType].title}` : 'Table'}</h1>
                {
                    dataChecking(this.props, 'location', 'state', 'pageSubTitle') &&
                        <h2 className="text-center text-underline">{this.props.location.state.pageSubTitle}</h2>
                }
                {this.renderMenu()}
                {this.renderTable()}
                {this.renderUtilModals()}
            </div>
        );
    }
}

TableListingPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    tablelistingpage: makeSelectTableListingPage(),
    globaldataprocessor: makeSelectGlobalDataProcessor(),
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
