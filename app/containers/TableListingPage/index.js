/**
 *
 * TableListingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'utils/globalUtils';

import tableSetting from 'utils/globalTableSetting';


import makeSelectTableListingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

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
                    category: '14',
                    start: 1544537352618,
                    end: 1544537352900,
                    value: '{food: \'red\', good: \'almost\'}',
                },
                {
                    key: 'sparpse',
                    category: '14',
                    start: 1544537352334,
                    end: 1544537356500,
                    value: '{food: \'blue\', good: \'deal\'}',
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
                // showCreateModal: false,
                tableConfig: tableSetting[this.props.pageType].fields,
                // formConfig: dataChecking(formSetting, this.props.pageType, 'fields'),
                // formAction: dataChecking(formSetting, this.props.pageType, 'action'),
                data: dataChecking(dataGroup, this.props.pageType, 'result', 'result'),
                // formFields: {},
            };
        }
    }

    renderTable() {
        const { tableConfig } = this.state;

        return (
            <section style={{ flex: 1 }}>
                <div>
                    <div className="table-header" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {
                            tableConfig.map((head, index) => (
                                <div
                                    key={index}
                                    className="table-header-item"
                                    style={{ flex: 1, width: head.width, display: 'inline-block' }}
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
                                                style={{ flex: 1, width: col.width, display: 'inline-block' }}
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
                                onPress={() => {
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
            default:
                return <span style={{ textAlign: col.align }}>{ dataChecking(row, col.key) }</span>;
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>TableListingPage</title>
                    <meta name="description" content="Description of TableListingPage" />
                </Helmet>
                <FormattedMessage {...messages.header} />
                <div>{dataChecking(this.props, 'id')}</div>
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
)(TableListingPage);
