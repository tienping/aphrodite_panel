import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
// import LoginForm from 'containers/LoginForm/Loadable';

const PrivateRoute = ({ component: Component, auth, ...remainingProps }) => (
    <Route
        render={(props) => (
            // auth
            // ? (<Component {...props} />)
            // : (<LoginForm />)
            <Component {...props}></Component>
        )}
        {...remainingProps}
    />
);

PrivateRoute.propTypes = {
    component: PropTypes.any,
    auth: PropTypes.bool.isRequired,
};

export default PrivateRoute;
