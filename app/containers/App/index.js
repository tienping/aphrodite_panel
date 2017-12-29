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

import Header from 'containers/Header';

import {
    makeSelectAuthenticated,
    makeSelectLocation,
} from './selectors';

import PrivateRoute from './PrivateRoute';


const HershopHeader = styled.div`
    background-color: papayawhip;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2000;
`;
const HershopSideBar = styled.div`
    background-color: skyblue;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    padding-top: ${(props) => props.paddingTop ? props.paddingTop : '70px'};
`;

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        // const headerEl = document.getElementById('hershop-header-container');
        // this.headerHeight = headerEl ? headerEl.clientHeight : '';
    }

    render() {
        const { authenticated } = this.props;
        return (
            <section>
                {authenticated &&
                    <HershopHeader id="hershop-header-container" className="d-none d-md-block">
                        <Header />
                    </HershopHeader>
                }
                {authenticated &&
                    <HershopSideBar className="d-none d-md-block" paddingTop={'300px'}>
                        asdfasdf
                    </HershopSideBar>
                }
                <Switch>
                    <PrivateRoute exact path="/" auth={authenticated} component={HomePage} />
                    <Route exact path="/mall" component={MallPage} />
                    <Route exact path="/mall/:id" component={MallPage} />
                    {/* <Route exact path="/flagship" auth={authenticated} component={Flagship} />
                    <Route exact path="/flagship/:id" auth={authenticated} component={Flagship} /> */}

                    <Route exact path="/login" component={LoginForm} />
                    <Route path="" component={NotFoundPage} />
                </Switch>
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
