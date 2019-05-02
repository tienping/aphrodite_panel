/**
 *
 * AlternateRoute
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { dataChecking } from 'globalUtils';


import './style.scss';

export class AlternateRoute extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        const { history, location, dispatch } = this.props;
        if (dataChecking(location, 'state')) {
            dispatch(push({
                pathname: history.action === 'PUSH' ?
                    location.state.destination
                    :
                    location.state.source,
                state: dataChecking(location, 'state'),
            }));
        }
    }

    render() {
        return (
            <div>
                Routing...
            </div>
        );
    }
}

AlternateRoute.propTypes = {
    dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
    withConnect,
    withRouter,
)(AlternateRoute);
