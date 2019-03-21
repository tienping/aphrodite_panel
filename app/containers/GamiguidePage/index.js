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
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="gami-guide-page">
                <Helmet>
                    <title>How to use Gamicenter</title>
                    <meta name="description" content="Documentation for Gamicenter" />
                </Helmet>
                <h1>How to use Gamicenter [Updated Feb 2019]</h1>
                <hr />
                <div className="smaller">
                    <p>Where to find this documentation in gamicenter?</p>
                    <p>
                        Have a look in the top bar, you will find a question mark button at the left side of the topbar.
                        Yes, that&apos;s it, you can always come back here when you need more help (it&apos;s FREE for lifetime!!!).
                        If you need any help or question for this genuine guide, feel free to drop a email to tplim@hermo.my.
                    </p>
                </div>
                <hr />
                <div className="documentation-content">
                    <section className="doc-step-by-step">
                        <h3>Step by Step, 1 2 3</h3>
                        <ol>
                            <li>Go to Gamicenter</li>
                            <li>Choose the page that you want to view/edit</li>
                            <li>To View</li>
                            <ul style={{ listStyleType: 'square' }}>
                                <li>Just go to the url listed in this <a href="#doc-pagetype">section</a></li>
                                <li>simply click it on the top bar.</li>
                            </ul>
                            <li>To Create new</li>
                            <ul style={{ listStyleType: 'square' }}>
                                <li>Click on the create button provided</li>
                                <li>Click on the Upload CSV button provided</li>
                            </ul>
                            <li>To update/delete</li>
                            <ul style={{ listStyleType: 'square' }}>
                                <li>Go to Action culumn and you will see the pencil icon over there (if supported by APIs)</li>
                            </ul>
                        </ol>
                    </section>
                    <section id="doc-pagetype" className="doc-pagetype anchor-target">
                        <h3>Type of pages</h3>
                        <ul>
                            {
                                Object.keys(tableSetting).map((key) => {
                                    if (!dataChecking(tableSetting, key, 'hideFromUser')) {
                                        return (
                                            <li key={key} id={`sect-pagetype-${key}`} className={`anchor-target ${this.state.highlight === `sect-pagetype-${key}` ? 'highlighted' : ''}`}>
                                                <span className="bigger">{dataChecking(tableSetting, key, 'title')} </span>
                                                <div className="pl-2 pb-1">
                                                    <div className="desc">{dataChecking(tableSetting, key, 'description')}</div>
                                                    <div className="pagetype-links-container">
                                                        <ul style={{ listStyleType: 'square' }}>
                                                            <li>
                                                                <a
                                                                    href={`#sect-tablefields-${key}`}
                                                                    onClick={() => { this.setState({ highlight: `sect-tablefields-${key}` }); }}
                                                                >
                                                                    link to table&apos;s fields
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href={`#sect-formfields-create_${key}`}
                                                                    onClick={() => { this.setState({ highlight: `sect-formfields-create_${key}` }); }}
                                                                >
                                                                    link to creation form&apos;s fields
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <NavLink to={dataChecking(tableSetting, key, 'link')} type="default">
                                                                    <span>{`link to ${dataChecking(tableSetting, key, 'title')}`}</span>
                                                                </NavLink>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    }
                                    return null;
                                })
                            }
                        </ul>
                    </section>
                    <hr />
                    <section className="doc-tablefields">
                        <h3>Tables and their fields</h3>
                        <ul>
                            {
                                Object.keys(tableSetting).map((key) => {
                                    if (!dataChecking(tableSetting, key, 'hideFromUser')) {
                                        return (
                                            <li key={key} id={`sect-tablefields-${key}`} className={`anchor-target ${this.state.highlight === `sect-tablefields-${key}` ? 'highlighted' : ''}`}>
                                                <span className="bigger">{dataChecking(tableSetting, key, 'title')}</span>
                                                <div className="pl-2 pb-1">
                                                    <table className="doc-table">
                                                        <tbody>
                                                            {
                                                                dataChecking(tableSetting, key, 'fields', 'length') ?
                                                                    tableSetting[key].fields.map((value, index) => (
                                                                        <tr key={index} className="doc-table-row">
                                                                            <td className={`header-cell field-key doc-table-cell key-${dataChecking(value, 'key')}`}>
                                                                                {dataChecking(value, 'key')}
                                                                            </td>
                                                                            <td className={`text-center field-type doc-table-cell type-${dataChecking(value, 'type')}`}>
                                                                                [ {dataChecking(value, 'type')} ]
                                                                            </td>
                                                                            <td colSpan="5" className="field-desc doc-table-cell">
                                                                                {dataChecking(value, 'doc', 'description')}
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                    :
                                                                    null
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </li>
                                        );
                                    }
                                    return null;
                                })
                            }
                        </ul>
                    </section>
                    <hr />
                    <section className="doc-formfields">
                        <h3>Form and their fields</h3>
                        <ul>
                            {
                                Object.keys(formSetting).map((key) => {
                                    if (!dataChecking(tableSetting, key, 'hideFromUser')) {
                                        return (
                                            <li key={key} id={`sect-formfields-${key}`} className={`anchor-target ${this.state.highlight === `sect-formfields-${key}` ? 'highlighted' : ''}`}>
                                                <span className="bigger">{dataChecking(formSetting, key, 'title')}</span>
                                                <div className="pl-2 pb-1">
                                                    <table className="doc-table">
                                                        <tbody>
                                                            {
                                                                dataChecking(formSetting, key, 'fields', 'length') ?
                                                                    formSetting[key].fields.map((value, index) => (
                                                                        <tr key={index} className="doc-table-row">
                                                                            <td className={`header-cell field-key doc-table-cell key-${dataChecking(value, 'key')}`}>
                                                                                {dataChecking(value, 'key')}
                                                                            </td>
                                                                            <td className={`text-center field-type doc-table-cell type-${dataChecking(value, 'type')}`}>
                                                                                [ {dataChecking(value, 'type')} ]
                                                                            </td>
                                                                            <td colSpan="5" className="field-desc doc-table-cell">
                                                                                {dataChecking(value, 'doc', 'description')}
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                    :
                                                                    null
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </li>
                                        );
                                    }
                                    return null;
                                })
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
