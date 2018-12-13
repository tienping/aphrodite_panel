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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Notify from 'containers/Notify';

import HomePage from 'containers/HomePage/Loadable';
import TableListingPage from 'containers/TableListingPage/Loadable';
import LoginForm from 'containers/LoginForm/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import tableSetting from 'utils/globalTableSetting';
import { dataChecking } from 'utils/globalUtils';

import {
    makeSelectAuthenticated,
    makeSelectLocation,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
    fetchConfig,
} from './actions';

import PrivateRoute from './PrivateRoute';

const topbarHeight = '40px';

const HershopContent = styled.div`
    margin-top: ${topbarHeight};
`;

const pageReference = {
    home: HomePage,
};

export class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(fetchConfig());
    }

    render() {
        const { authenticated } = this.props;
        return (
            <section>
                <Notify></Notify>

                <HershopContent id="hershop-content-container" className="container">
                    <Switch>
                        <PrivateRoute exact={true} path="/" auth={authenticated} component={pageReference.home} />
                        {
                            Object.keys(tableSetting).map((key, index) => (
                                <Route
                                    key={index}
                                    exact={true}
                                    path={dataChecking(tableSetting, key, 'link')}
                                    render={(props) => <TableListingPage {...props} pageType={dataChecking(tableSetting, key, 'id')} />}
                                />
                            ))
                        }
                        {/* <Route exact={true} path="/flagship" auth={authenticated} component={Flagship} />
                        <Route exact={true} path="/flagship/:id" auth={authenticated} component={Flagship} /> */}

                        <Route exact={true} path="/login" component={LoginForm} />
                        <Route path="" component={NotFoundPage} />
                    </Switch>
                </HershopContent>
            </section>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    // location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    authenticated: makeSelectAuthenticated(),
    location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'config', reducer });
const withSaga = injectSaga({ key: 'config', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(App);
