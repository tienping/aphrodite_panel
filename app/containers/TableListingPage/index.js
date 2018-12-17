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
import Switch from 'react-switch';

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
import dataGroup from './mockdata';

import './style.scss';

export class TableListingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        if (this.props.pageType && tableSetting && tableSetting[this.props.pageType]) {
            this.state = {
                tableConfig: tableSetting[this.props.pageType].fields,
                tableWidth: tableSetting[this.props.pageType].tableWidth,
                createButtonWidth: tableSetting[this.props.pageType].createButtonWidth,
                createFormHeight: tableSetting[this.props.pageType].createFormHeight,
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
                title: `New ${this.props.pageType}`,
                type: 'formAction',
            },
        ];

        return (
            <section className="page-actions">
                {
                    actionButton.map((item, index) => {
                        if (item.type === 'formAction') {
                            return (
                                <FormButton
                                    key={index}
                                    style={{ width: this.state.createButtonWidth }}
                                    tableConfig={this.state.tableConfig}
                                    formConfig={this.state.formConfig}
                                    formFields={this.state.formFields}
                                    createFormHeight={this.state.createFormHeight}
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
                                    style={{ width: head.width, maxWidth: head.width }}
                                >
                                    <span style={{ textAlign: head.align }}>{ head.label }</span>
                                </div>
                            ))
                        }
                    </div>
                    {
                        this.state.data && this.state.data.length ?
                            this.state.data.map((row, index) => (
                                <div key={index} className="table-row">
                                    {
                                        tableConfig.map((col, index2) => (
                                            <div
                                                key={index2}
                                                className="table-row-item"
                                                style={{ width: col.width, maxWidth: col.width }}
                                            >
                                                { this.renderCell(row, col) }
                                            </div>
                                        ))
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
            case 'boolean':
                return (
                    <Switch
                        onChange={(checked, event, id) => {
                            // alert('toggle function is not supported yet');
                            console.log(checked, event, id);
                        }}
                        disabled={true}
                        checked={row[col.key]}
                        // id="normal-switch"
                    />
                );
            case 'image':
                return <img src={row[col.key]} alt={row.name} width={row.width || '100%'} height={row.height || ''} />;
            case 'date':
                date = new Date(row[col.key]);
                return <span style={{ textAlign: col.align }}>{date.toLocaleDateString()}</span>;
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
