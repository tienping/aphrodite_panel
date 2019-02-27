/**
 *
 * GamiguidePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { NavLink, withRouter } from 'react-router-dom';
import { dataChecking } from 'globalUtils';
import tableSetting from 'utils/globalTableSetting';
import formSetting from 'utils/globalFormSetting';

// import messages from './messages';
import './style.scss';

export class GamiguidePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="gami-guide-page">
                <Helmet>
                    <title>How to use Gamicenter</title>
                    <meta name="description" content="Documentation for Gamicenter" />
                </Helmet>
                <h1>How to use Gamicenter</h1>
                <hr />
                <div className="documentation-content">
                    <section className="doc-pagetype">
                        <h3>Type of pages</h3>
                        <ul>
                            {
                                Object.keys(tableSetting).map((key) => (
                                    <li key={key}>
                                        <NavLink
                                            to={dataChecking(tableSetting, key, 'link')}
                                            title="Go to homepage"
                                            className=""
                                            type="default"
                                            onClick={() => {
                                                this.setState({ showSideMenu: false });
                                            }}
                                        >
                                            <span>{dataChecking(tableSetting, key, 'title')}</span>
                                        </NavLink>
                                        <div className="pl-2 pb-1">{dataChecking(tableSetting, key, 'description')}</div>
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                    <hr />
                    <section className="doc-tables">
                        <h3>Tables and their fields</h3>
                        <ul>
                            {
                                Object.keys(tableSetting).map((key) => (
                                    <li key={key}>
                                        <span>{dataChecking(tableSetting, key, 'title')}</span>
                                        <div className="pl-2 pb-1">
                                            <table className="doc-table">
                                                {
                                                    dataChecking(tableSetting, key, 'fields', 'length') ?
                                                        tableSetting[key].fields.map((value, index) => (
                                                            <tr key={index} className="doc-table-row">
                                                                <td className="header-cell field-key doc-table-cell">{dataChecking(value, 'key')}</td>
                                                                <td colSpan="5" className="field-desc doc-table-cell">{dataChecking(value, 'doc', 'description')}</td>
                                                            </tr>
                                                        ))
                                                        :
                                                        null
                                                }
                                            </table>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                    <hr />
                    <section className="doc-tables">
                        <h3>Form and their fields</h3>
                        <ul>
                            {
                                Object.keys(formSetting).map((key) => (
                                    <li key={key}>
                                        <span>{dataChecking(formSetting, key, 'title')}</span>
                                        <div className="pl-2 pb-1">
                                            <table className="doc-table">
                                                {
                                                    dataChecking(formSetting, key, 'fields', 'length') ?
                                                        formSetting[key].fields.map((value, index) => (
                                                            <tr key={index} className="doc-table-row">
                                                                <td className="header-cell field-key doc-table-cell">{dataChecking(value, 'key')}</td>
                                                                <td colSpan="5" className="field-desc doc-table-cell">{dataChecking(value, 'doc', 'description')}</td>
                                                            </tr>
                                                        ))
                                                        :
                                                        null
                                                }
                                            </table>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </section>
                    <hr />
                </div>
            </div>
        );
    }
}

GamiguidePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
    withConnect,
    withRouter,
)(GamiguidePage);
