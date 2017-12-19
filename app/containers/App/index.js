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
import { sessionService } from 'redux-react-session';

import HomePage from 'containers/HomePage/Loadable';
import LoginForm from 'containers/LoginForm/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { makeSelectAuthenticated } from './selectors';

import PrivateRoute from './PrivateRoute';

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { authenticated } = this.props;
        return (
            <section>
                {authenticated &&
                    <button onClick={sessionService.deleteSession}>Logout</button>
                }
                <Switch>
                    <PrivateRoute exact path="/" auth={authenticated} component={HomePage} />
                    <Route exact path="/login" component={LoginForm} />
                    <Route path="" component={NotFoundPage} />
                </Switch>
            </section>
        );
    }
}

App.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    authenticated: makeSelectAuthenticated(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(App);
