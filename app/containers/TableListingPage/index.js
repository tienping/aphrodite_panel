/**
 *
 * TableListingPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactJson from 'react-json-view';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'utils/globalUtils';
import tableSetting from 'utils/globalTableSetting';
import formSetting from 'utils/globalFormSetting';

import FormButton from 'components/FormButton';

import makeSelectTableListingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import './style.scss';

const dataGroup = {
    sysvar: {
        'success': true,
        'message': 'menu read successfully.',
        'result': {
            'page': {
                'base': 'https://hermo-test.herokuapp.com:1337/',
                'path': 'postgres/menu',
            },
            'meta': {
                'totalCount': 3,
                'currentPage': 1,
                'perPage': 10,
                'pageCount': 1,
            },
            'result': [
                {
                    key: 'bolder',
                    category: '10',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
                {
                    key: 'bolder',
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{"food":"red","good":"almost"}',
                },
            ],
        },
    },
    vendor: {},
    import: {},
};

export class TableListingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        if (this.props.pageType && tableSetting && tableSetting[this.props.pageType]) {
            this.state = {
                showCreateModal: false,
                tableConfig: tableSetting[this.props.pageType].fields,
                tableWidth: tableSetting[this.props.pageType].tableWidth,
                createButtonWidth: tableSetting[this.props.pageType].createButtonWidth,
                formConfig: dataChecking(formSetting, this.props.pageType, 'fields'),
                formAction: dataChecking(formSetting, this.props.pageType, 'action'),
                data: dataChecking(dataGroup, this.props.pageType, 'result', 'result'),
                // formFields: {},
            };
        }
    }

    renderMenu = () => {
        const actionButton = [
            {
                title: 'Import',
                action: () => {
                    alert('Import');
                },
            },
            {
                title: 'Export',
                action: () => {
                    alert('Export');
                },
            },
            {
                title: `New ${this.props.pageType}`,
                type: 'formAction',
                action: () => {
                    this.setState({
                        showCreateModal: true,
                    });
                },
            },
        ];

        return (
            <section className="page-actions" style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {
                    actionButton.map((item, index) => {
                        if (item.type === 'formAction') {
                            return (
                                <FormButton
                                    key={index}
                                    style={{ width: this.state.createButtonWidth }}
                                    action={item.action}
                                    tableConfig={this.state.tableConfig}
                                    formConfig={this.state.formConfig}
                                    formFields={this.state.formFields}
                                    show={this.showCreateModal}
                                >
                                    {item.title}
                                </FormButton>
                            );
                        }

                        return (
                            <div
                                key={index}
                                className="gamicenter-button"
                                onClick={item.action}
                            >
                                <span className="text-capitalize">{item.title}</span>
                            </div>
                        );
                    })
                }
            </section>
        );
    }

    renderTable() {
        const { tableConfig, tableWidth } = this.state;

        return (
            <section className="table-container">
                <div className="table-content-wrapper" style={{ width: tableWidth || 'auto' }}>
                    <div className="table-header table-row" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {
                            tableConfig.map((head, index) => (
                                <div
                                    key={index}
                                    className="table-header-item table-row-item"
                                    style={{ display: 'table-cell', width: head.width }}
                                >
                                    <span style={{ textAlign: head.align }}>{ head.label }</span>
                                </div>
                            ))
                        }
                    </div>
                    {
                        this.state.data ?
                            this.state.data.map((row, index) => (
                                <div
                                    key={index}
                                    className="table-row"
                                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                                >
                                    {
                                        tableConfig.map((col, index2) => (
                                            <div
                                                key={index2}
                                                className="table-row-item"
                                                style={{ display: 'table-cell', width: col.width }}
                                            >
                                                { this.renderCell(row, col) }
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                            :
                            null
                    }
                </div>
            </section>
        );
    }

    renderCell = (row, col) => {
        switch (col.type) {
            case 'action':
                return (
                    <div className="table-header" style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <div
                            key="1"
                            className="action-item"
                        >
                            <span
                                onClick={() => {
                                    if (dataChecking(this.props, 'changeView')) {
                                        this.props.changeView('Product');
                                    }
                                }}
                            >
                                Edit
                            </span>
                        </div>
                        <div
                            key="2"
                            className="action-item"
                        >
                            <span>Delete</span>
                        </div>
                    </div>
                );
            case 'checkbox':
                return <span style={{ textAlign: col.align }}>[ ]</span>;
            case 'json':
                console.log(row[col.key]);
                console.log(JSON.parse(row[col.key]));
                // return <span>{row[col.key]}</span>;
                return <ReactJson src={JSON.parse(row[col.key])} name={false} enableClipboard={false}></ReactJson>;
                // return <ReactJson src={{}} name={false} enableClipboard={false}></ReactJson>;
                // return <ReactJson src={row[col.key] ? JSON.parse(row[col.key]) : null} enableClipboard={false}></ReactJson>;
            default:
                return <span style={{ textAlign: col.align }}>{ dataChecking(row, col.key) ? row[col.key] : '\u00A0' }</span>;
        }
    }

    render() {
        return (
            <div id="TableListingPage-container" className="TableListingPage-page">
                <Helmet>
                    <title>
                        {
                            dataChecking(this.props, 'id') ?
                                `${this.props.id} Page` :
                                'Table'
                        }
                    </title>
                    <meta name="description" content="Description of TableListingPage" />
                </Helmet>
                <div>{dataChecking(this.props, 'id')}</div>
                {this.renderMenu()}
                {this.renderTable()}
            </div>
        );
    }
}

TableListingPage.propTypes = {
    // dispatch: PropTypes.func.isRequired,
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
)(TableListingPage);
