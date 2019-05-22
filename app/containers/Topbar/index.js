/**
 *
 * Topbar
 *
 */

import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Navigator from 'components/Navigator';
import { push } from 'react-router-redux';

// import tableSetting from 'configs/tableSetting';
import { Events, setCookie } from 'globalUtils';

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
    constructor(props) {
        super(props);
        this.state = {
            showSideMenu: false,
            navItems: (() => {
                const items = [];

                // if (Object.keys(tableSetting)) {
                //     Object.keys(tableSetting).forEach((key) => {
                //         if (!dataChecking(tableSetting, key, 'hideFromUser')) {
                //             items.push({
                //                 code: key,
                //                 requireLogin: false,
                //                 type: 'internal_url',
                //                 // type: 'internal_url',
                //                 title: dataChecking(tableSetting, key, 'title'),
                //                 verticalText: dataChecking(tableSetting, key, 'title'),
                //                 url: dataChecking(tableSetting, key, 'link'),
                //                 iconClass: dataChecking(tableSetting, key, 'iconClass'),
                //             });
                //         }
                //     });
                // }

                if (globalScope.token) {
                    items.push({
                        code: 'user_profile',
                        requireLogin: true,
                        type: 'dropdown',
                        title: 'Profile',
                        verticalText: 'Profile',
                        // text: 'Profile',
                        iconClass: 'fa fa-user p-1',
                        dropdownClass: 'text-white text-hover-my-style p-1',
                        items: [
                            {
                                code: 'logout',
                                requireLogin: true,
                                type: 'exec_function',
                                text: 'Logout',
                                iconClass: 'fas fa-sign-out-alt px-1',
                                handleLinkClick: () => {
                                    globalScope.previousPage = window.location.pathname;
                                    this.props.dispatch(push({
                                        pathname: '/logout',
                                    }));
                                },
                            },
                        ],
                    });
                }

                return items;
            })(),
        };

        Events.listen('updateTopBarState', 'topbar-updateTopBarState', (params) => { this.onUpdateState(params); });
        Events.listen('forceUpdateTopBar', 'topbar-forceUpdate', () => {
            this.forceUpdate();
        });
    }

    componentDidMount() {
        // this.props.dispatch(fetchTopNav({}));
        globalScope.dispatch = this.props.dispatch;
    }

    onUpdateState = ({ stateName, value }) => {
        if (!stateName) {
            this.setState({});
        }
        const obj = {};
        obj[stateName] = value;
        this.setState(obj);
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
                                    <span className="top-bar-title" style={{ backgroundColor: '#555', padding: '3rem 1rem' }}>APHRODITE</span>
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
                    <NavLink
                        to="/howto"
                        title="How to use Aphrodite like a Pro?"
                        className="how-to-use hidden-xs bg-white text-secondary-color"
                        type="default"
                    >&#63;</NavLink>
                    {
                        (!globalScope.token || globalScope.previewMode) &&
                            <div className="toggle-preview-mode-container">
                                <Button
                                    title={`${globalScope.previewMode ? 'Exit Preview Mode' : 'Enter Preview Mode'}`}
                                    className={`toggle-preview-mode hidden-xs ${globalScope.previewMode ? 'active' : ''}`}
                                    variant="outlined"
                                    onClick={() => {
                                        globalScope.token = globalScope.token ? '' : 'preview-mode';
                                        globalScope.isAdmin = globalScope.token ? '' : 'preview-mode';
                                        globalScope.previewMode = !globalScope.previewMode;
                                        setCookie(process.env.PREVIEW_KEY, globalScope.previewMode);

                                        globalScope.userData = {
                                            merchants: [{
                                                id: 'mock',
                                            }],
                                        };

                                        this.forceUpdate();
                                        Events.trigger('forceUpdateTopNavigation');
                                        globalScope.dispatch(push({
                                            pathname: globalScope.previewMode ? window.location.pathname : '/',
                                        }));
                                    }}
                                >{`${globalScope.previewMode ? 'Exit Preview Mode' : 'Enter Preview Mode'}`}</Button>
                            </div>
                    }
                    <div>
                        <NavLink to="/" title="Go to homepage" className="gami-header-logo" type="default">
                            <span className="top-bar-side-title text-main-color hidden-xs">HERMO</span>
                            <span className="top-bar-title big text-main-color text-hover-my-style">APHRODITE</span>
                            <span className="top-bar-side-title text-main-color hidden-xs">HERMO</span>
                        </NavLink>
                    </div>
                </div>
                <Navigator
                    className="visible-sm visible-md visible-lg"
                    itemClassName="text-white text-hover-my-style"
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
