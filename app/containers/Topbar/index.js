/**
 *
 * Topbar
 *
 */

import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Navigator from 'components/Navigator';

import tableSetting from 'utils/globalTableSetting';
import { dataChecking } from 'globalUtils';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

// import {
//     makeSelectTopNav,
//     makeSelectTopbarLoading,
//     // makeSelectTopbarError,
// } from './selectors';

import { fetchTopNav } from './actions';
import globalScope from '../../globalScope';

const HershopTopbarTitle = styled.span`
    padding: 8px;
    font-size: 50%;
    font-weight: 900;
    letter-spacing: 5px;
    font-family: cursive;
    display: inline-block;
    color: ${(props) => props.theme.main_color};
`;
const HershopTopbarBigTitle = styled.span`
    padding: 8px;
    font-size: 150%;
    font-weight: 900;
    letter-spacing: 5px;
    font-family: cursive;
    display: inline-block;
    color: ${(props) => props.theme.main_color};
`;

const HideHeader = styled.div`
    float: left;
    color: white;
    padding: 8px 16px;
`;

export class Topbar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        navItems: (() => {
            const items = [];

            if (Object.keys(tableSetting)) {
                Object.keys(tableSetting).forEach((key) => {
                    items.push({
                        code: key,
                        require_login: true,
                        type: 'internal_url',
                        title: dataChecking(tableSetting, key, 'title'),
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
                    text: 'Profile',
                    items: [
                        {
                            code: 'logout',
                            require_login: true,
                            type: 'internal_url',
                            text: 'Logout',
                            url: '/logout',
                        },
                    ],
                    iconClass: 'fa fa-user text-white',
                });
            }

            return items;
        })(),
    }

    componentDidMount() {
        this.props.dispatch(fetchTopNav({}));
    }

    render() {
        return (
            <div className="text-center">
                <HideHeader><span className="fa fa-bars"></span></HideHeader>
                <div>
                    <NavLink to="/" title="Go to homepage" className="gami-header-logo" type="default">
                        <div>
                            <HershopTopbarTitle>HERMO</HershopTopbarTitle>
                            <HershopTopbarBigTitle className="text-white text-hover-hermo-pink">GAMICENTER</HershopTopbarBigTitle>
                            <HershopTopbarTitle>HERMO</HershopTopbarTitle>
                        </div>
                    </NavLink>
                </div>
                <Navigator
                    items={this.state.navItems}
                />
            </div>
        );
    }
}

Topbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
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
)(Topbar);
