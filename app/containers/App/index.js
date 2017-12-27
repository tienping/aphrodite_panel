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

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { authenticated } = this.props;
        return (
            <section>
                {authenticated &&
                    <Header />
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
