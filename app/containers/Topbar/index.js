/**
 *
 * Topbar
 *
 */

import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Navigator from 'components/Navigator';

import tableSetting from 'utils/globalTableSetting';
import { dataChecking } from 'globalUtils';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import globalScope from 'globalScope';

import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
// import {
//     makeSelectTopNav,
//     makeSelectTopbarLoading,
//     // makeSelectTopbarError,
// } from './selectors';
// import { fetchTopNav } from './actions';

import './style.scss';

export class Topbar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        showSideMenu: false,
        navItems: (() => {
            const items = [];

            if (Object.keys(tableSetting)) {
                Object.keys(tableSetting).forEach((key) => {
                    items.push({
                        code: key,
                        require_login: false,
                        type: 'internal_url',
                        title: dataChecking(tableSetting, key, 'title'),
                        verticalText: dataChecking(tableSetting, key, 'title'),
                        url: dataChecking(tableSetting, key, 'link'),
                        iconClass: dataChecking(tableSetting, key, 'iconClass'),
                    });
                });
            }

            if (globalScope.token) {
                items.push({
                    code: 'user_profile',
                    require_login: true,
                    type: 'dropdown',
                    title: 'Profile',
                    verticalText: 'Profile',
                    // text: 'Profile',
                    iconClass: 'fa fa-user',
                    items: [
                        {
                            code: 'logout',
                            require_login: true,
                            type: 'exec_function',
                            text: 'Logout',
                            iconClass: 'fa fa-sign-out',
                            handleLinkClick: () => {
                                globalScope.previousPage = window.location.pathname;
                                this.props.history.push('/logout');
                            },
                        },
                    ],
                });
            }

            return items;
        })(),
    }

    componentDidMount() {
        // this.props.dispatch(fetchTopNav({}));
    }

    render() {
        return (
            <div className="text-center top-bar-container">
                <div
                    className="visible-xs"
                    style={{ float: 'left' }}
                >
                    <span
                        className="side-menu-burder fa fa-bars"
                        onClick={() => {
                            this.setState({ showSideMenu: true });
                        }}
                    >
                    </span>
                    <div
                        className="side-menu-container"
                        style={{ display: this.state.showSideMenu ? 'block' : 'none' }}
                    >
                        <div
                            className="side-menu-overlay"
                            onClick={() => {
                                this.setState({ showSideMenu: false });
                            }}
                        ></div>
                        <div className="side-menu-content">
                            <div className="side-menu-header">
                                <NavLink
                                    to="/"
                                    title="Go to homepage"
                                    className="gami-header-logo"
                                    type="default"
                                    onClick={() => {
                                        this.setState({ showSideMenu: false });
                                    }}
                                >
                                    <span className="top-bar-title" style={{ backgroundColor: '#555', padding: '3rem 1rem' }}>GAMICENTER</span>
                                </NavLink>
                            </div>
                            <div className="side-menu-items" style={{ textAlign: 'left' }}>
                                <Navigator
                                    vertical={true}
                                    className=""
                                    itemClassName="text-secondary-color"
                                    items={this.state.navItems}
                                    clickHandler={() => {
                                        this.setState({ showSideMenu: false });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <NavLink to="/" title="Go to homepage" className="gami-header-logo" type="default">
                        <div>
                            <span className="top-bar-side-title text-main-color hidden-xs">HERMO</span>
                            <span className="top-bar-title big text-main-color text-hover-hermo-pink">GAMICENTER</span>
                            <span className="top-bar-side-title text-main-color hidden-xs">HERMO</span>
                        </div>
                    </NavLink>
                </div>
                <Navigator
                    className="visible-sm visible-md visible-lg"
                    itemClassName="text-white text-hover-hermo-pink"
                    items={this.state.navItems}
                />
            </div>
        );
    }
}

Topbar.propTypes = {
    // dispatch: PropTypes.func.isRequired,
    // topNav: PropTypes.object,
    // loading: PropTypes.bool,
    // error: PropTypes.oneOfType([
    //     PropTypes.bool,
    //     PropTypes.object,
    // ]),
};

const mapStateToProps = createStructuredSelector({
    // topNav: makeSelectTopNav(),
    // loading: makeSelectTopbarLoading(),
    // error: makeSelectTopbarError(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'topbar', reducer });
const withSaga = injectSaga({ key: 'topnav', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter,
)(Topbar);
