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
import Switch from 'react-switch';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'globalUtils';
import tableSetting from 'utils/globalTableSetting';

import FormButton from 'containers/FormButton';
// import { Input } from '@tienping/my-react-kit';

import makeSelectTableListingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
// import messages from './messages';

import './style.scss';

export class TableListingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    // constructor(props) {
    //     super(props);

    //     if (props.pageType && tableSetting && tableSetting[props.pageType]) {
    //         this.state = this.initialiseProps(props);
    //         if (tableSetting[props.pageType].api) {
    //             props.dispatch(actions.getList({ api: tableSetting[props.pageType].api }));
    //         }
    //     }
    // }

    componentWillMount() {
        this.setState(this.initialiseProps(this.props));

        if (this.props.pageType && tableSetting && tableSetting[this.props.pageType]) {
            if (tableSetting[this.props.pageType].api) {
                this.props.dispatch(actions.getList({ api: tableSetting[this.props.pageType].api }));
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pageType !== this.props.pageType) {
            this.setState(this.initialiseProps(nextProps));
            if (dataChecking(tableSetting, nextProps.pageType, 'api')) {
                this.props.dispatch(actions.getList({ api: tableSetting[nextProps.pageType].api }));
            }
        }

        if (nextProps.tablelistingpage.data !== this.props.tablelistingpage.data) {
            this.setState({ data: nextProps.tablelistingpage.data });
        }
    }

    initialiseProps = (theProps) => ({
        tableConfig: dataChecking(tableSetting, theProps.pageType, 'fields'),
        tableWidth: dataChecking(tableSetting, theProps.pageType, 'tableWidth'),
        actionButtons: dataChecking(tableSetting, theProps.pageType, 'actionButtons'),
        data: [],
    });

    renderMenu = () => (
        <section className="page-actions"style={{ width: dataChecking(this.state, 'tableWidth') || 'auto' }}>
            {
                dataChecking(this.state, 'actionButtons') ?
                    this.state.actionButtons.map((item, index) => {
                        if (item.type === 'createNew') {
                            return (
                                <span key={index} style={{ display: 'inline-block', width: item.width, margin: '1rem' }}>
                                    <FormButton
                                        key="create-button"
                                        style={{ width: item.width }}
                                        formId={`create_${this.props.pageType}`}
                                    >
                                        {item.title}
                                    </FormButton>
                                </span>
                            );
                        } else if (item.type === 'upload') {
                            return (
                                <span key={index} style={{ display: 'inline-block', width: item.width, margin: '1rem' }}>
                                    <FormButton
                                        key="upload-button"
                                        style={{ width: item.width }}
                                        formId={`upload_${this.props.pageType}`}
                                    >
                                        {item.title}
                                    </FormButton>
                                </span>
                            );
                        }

                        return (
                            <span key={index} style={{ display: 'inline-block', width: item.width, margin: '1rem' }}>
                                <FormButton
                                    key="create-button"
                                    style={{ width: item.width }}
                                    pageType={this.props.pageType}
                                    formId={`create_${this.props.pageType}`}
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

    renderTable() {
        return (
            <section className="table-container">
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
                                                    className="table-row-item"
                                                    style={{ width: col.width, maxWidth: col.width, textAlign: col.align }}
                                                >
                                                    { this.renderCell(row, col) }
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
                                    No data found...
                                </div>
                            </div>
                    }
                </div>
            </section>
        );
    }

    renderCell = (row, col) => {
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
                                </div>
                            ))
                        }
                    </div>
                );
            case 'checkbox':
                return <span>[ ]</span>;
            case 'boolean':
                return (
                    <Switch
                        onChange={() => {}}
                        disabled={true}
                        checked={row[col.key]}
                    />
                );
            case 'image':
                return <img src={row[col.key]} alt={row.name} width={row.width || '100%'} height={row.height || ''} />;
            case 'date':
                date = new Date(row[col.key]);
                return <span>{date.toLocaleDateString()}</span>;
            case 'datetime':
                date = new Date(row[col.key]);
                return <span>{date.toLocaleString()}</span>;
            case 'json':
                return <ReactJson src={JSON.parse(row[col.key])} name={false} enableClipboard={false}></ReactJson>;
            case 'link':
                return <a href={dataChecking(row, col.key) ? row[col.key] : ''}>{ dataChecking(row, col.key) ? row[col.key] : '\u00A0' }</a>;
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
                            dataChecking(this.props, 'pageType') ?
                                `${this.props.pageType.charAt(0).toUpperCase() + this.props.pageType.substr(1)} Page` :
                                'Table'
                        }
                    </title>
                    <meta name="description" content="Description of TableListingPage" />
                </Helmet>
                <h1 style={{ textAlign: 'center', textTransform: 'capitalize' }}>{dataChecking(this.props, 'pageType') ? `${this.props.pageType} Page` : 'Table'}</h1>
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
