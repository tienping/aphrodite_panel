/**
 *
 * TableListingPage
 *
 */

import React from 'react';
import styled from 'styled-components';
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
import formSetting from 'utils/globalFormSetting';

import makeSelectTableListingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getXdp } from '../../utils/globalUtils';

const Item = styled.div`
    background-color: 'lightyellow';
`;

const TouchableOpacity = styled.div`
    &:hover {
        cursor: pointer;
        transform: scale(1.05);
        transition: transform .215s;
        color: ${(props) => props.theme.tertiary_color};
        text-decoration: none;
    };
`;

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
                showCreateModal: false,
                tableConfig: tableSetting[this.props.pageType].fields,
                tableWidth: tableSetting[this.props.pageType].tableWidth,
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
                action: () => {
                    this.setState({
                        showCreateModal: true,
                    });
                },
            },
        ];

        return (
            <section style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {
                    actionButton.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.action}
                            style={{ marginTop: getXdp(4), alignSelf: 'center', width: getXdp(20), justifyContent: 'center', backgroundColor: '#ffc94f' }}
                        >
                            <span style={{ color: 'black', textAlign: 'center', fontSize: 18 }}>{item.title}</span>
                        </button>
                    ))
                }
            </section>
        );
    }

    renderTable() {
        const { tableConfig, tableWidth } = this.state;

        return (
            <section className="table-container" style={{ width: getXdp(90), overflow: 'auto', padding: '1vw 3vw' }}>
                <div style={{ flex: 1, width: tableWidth || 'auto' }}>
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
            default:
                return <span style={{ textAlign: col.align }}>{ dataChecking(row, col.key) }</span>;
        }
    }

    renderCreateModal() {
        return (
            <div
                style={{
                    display: this.state.showCreateModal ? 'flex' : 'none',
                    position: 'absolute',
                    width: getXdp(50),
                    top: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#FFF',
                    borderLeftWidth: 2,
                    borderColor: 'gold',
                    shadowOpacity: 0.5,
                    padding: getXdp(2),
                }}
            >
                <div style={{ position: 'relative' }}>
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            borderRadius: 100,
                            zIndex: 100,
                        }}
                    >
                        <span
                            style={{
                                padding: getXdp(1),
                                fontWeight: '700',
                                color: 'white',
                            }}
                            onClick={() => { this.setState({ showCreateModal: false }); }}
                        >
                            X
                        </span>
                    </div>
                    <div>
                        <div style={{ borderBottomColor: 'gray', borderBottomWidth: 1, padding: getXdp(1) }}>
                            <span>{`Create ${this.props.pageType}`}</span>
                        </div>
                        <div>
                            {
                                this.state.formConfig ?
                                    <div>
                                        {
                                            this.state.formConfig.map((field, index) => (
                                                <div
                                                    key={index}
                                                    className="create-modal-form-field"
                                                >
                                                    <span style={{ color: 'red' }}>{dataChecking(this.state.formFields, field.key, 'error')}</span>
                                                    <Item style={{ marginTop: getXdp(3) }}>
                                                        <input onChangeText={(value) => this.handleTextChange(field.key, value)} placeholder={field.placeholder} />
                                                    </Item>
                                                </div>
                                            ))
                                        }
                                        <TouchableOpacity style={{ marginTop: getXdp(4) }} activeOpacity={0.9} onClick={() => this.state.formAction()}>
                                            {
                                                this.state.loading ?
                                                    <span>isloading</span>
                                                    :
                                                    <span style={{ fontSize: 20, borderWidth: 1, textAlign: 'center', padding: 20, width: getXdp(40) }}>Create</span>
                                            }
                                        </TouchableOpacity>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>TableListingPage</title>
                    <meta name="description" content="Description of TableListingPage" />
                </Helmet>
                <div>{dataChecking(this.props, 'id')}</div>
                {this.renderMenu()}
                {this.renderTable()}
                {this.renderCreateModal()}
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
