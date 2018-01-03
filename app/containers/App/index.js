/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginForm from 'containers/LoginForm/Loadable';
import MallPage from 'containers/MallPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Topbar from 'containers/Topbar';

import {
    makeSelectAuthenticated,
    makeSelectLocation,
} from './selectors';

import PrivateRoute from './PrivateRoute';

const sidebarWidth = '40px';
const topbarHeight = '95px';

const HershopTopbar = styled.div`
    top: 0;
    left: 0;
    right: 0;
    z-index: 2000;
    overflow: hidden;
    position: absolute;
    height: ${topbarHeight};
    background-color: papayawhip;
`;
const HershopSideBar = styled.div`
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    overflow: hidden;
    position: absolute;
    width: ${sidebarWidth};
    background-color: skyblue;
    padding-top: ${topbarHeight};
`;

const HershopContent = styled.div`
    padding: 16px;
    margin-top: ${topbarHeight};
    margin-left: ${sidebarWidth};
`;

const HershopMobileBar = styled.div`
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    overflow: hidden;
    position: absolute;
    background-color: papayawhip;
`;

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        // anything to do after component rendered?
    }

    render() {
        const { authenticated } = this.props;
        return (
            <section>
                {authenticated &&
                    <HershopTopbar
                        id="hershop-topbar-container"
                        className="d-none d-md-block"
                    >
                        <Topbar />
                    </HershopTopbar>
                }
                {authenticated &&
                    <HershopSideBar
                        id="hershop-sidebar-container"
                        className="d-none d-md-block"
                    >
                        This is sidebar
                    </HershopSideBar>
                }
                <HershopContent id="hershop-content-container">
                    <Switch>
                        <PrivateRoute exact path="/" auth={authenticated} component={HomePage} />
                        <Route exact path="/mall" component={MallPage} />
                        <Route exact path="/mall/:id" component={MallPage} />
                        {/* <Route exact path="/flagship" auth={authenticated} component={Flagship} />
                        <Route exact path="/flagship/:id" auth={authenticated} component={Flagship} /> */}

                        <Route exact path="/login" component={LoginForm} />
                        <Route path="" component={NotFoundPage} />
                    </Switch>
                </HershopContent>
                <HershopMobileBar
                    id="hershop-mobilebar-container"
                    className="d-block d-md-none"
                >
                    This is bottom mobile bar
                </HershopMobileBar>
            </section>
        );
    }
}

App.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    // location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    authenticated: makeSelectAuthenticated(),
    location: makeSelectLocation(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(App);
