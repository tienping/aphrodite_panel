/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import Notify from 'containers/Notify';
import HomePage from 'containers/HomePage';
import TableListingPage from 'containers/TableListingPage';
import GamiguidePage from 'containers/GamiguidePage';
import LogoutForm from 'containers/LogoutForm';
import NotFoundPage from 'containers/NotFoundPage';
import GlobalDataProcessor from 'containers/GlobalDataProcessor';

import tableSetting from 'utils/globalTableSetting';
import { dataChecking } from 'globalUtils';
import globalScope from 'globalScope';

// import PrivateRoute from './PrivateRoute';

export default function App() {
    return (
        <div>
            <Helmet
                titleTemplate="%s - React.js Boilerplate"
                defaultTitle="Aphrodite Panel"
            >
                <meta name="description" content="Aphrodite Panel" />
            </Helmet>
            <section>
                <Notify></Notify>
                <GlobalDataProcessor />

                <div id="hershop-content-container">
                    <Switch>
                        {/* <Route exact={true} path="/login" component={globalScope.token ? LogoutForm : LoginForm} /> */}
                        <Route exact={true} path="/logout" component={LogoutForm} />
                        <Route exact={true} path="/howto" component={GamiguidePage} />
                        <Route
                        // <PrivateRoute
                            exact={true}
                            path="/"
                            token={globalScope.token || ''}
                            render={() => <HomePage />}
                        />
                        {
                            Object.keys(tableSetting).map((key, index) => (
                                <Route
                                // <PrivateRoute
                                    key={index}
                                    exact={true}
                                    token={globalScope.token || ''}
                                    path={dataChecking(tableSetting, key, 'link')}
                                    render={(props) => <TableListingPage {...props} pageType={key} />}
                                />
                            ))
                        }
                        <Route path="" component={NotFoundPage} />
                    </Switch>
                </div>
            </section>
        </div>
    );
}
