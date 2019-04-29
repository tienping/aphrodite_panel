/**
*
* AlternateRoute
*
*/

import React from 'react';
import { dataChecking } from 'globalUtils';

import './style.scss';

class AlternateRoute extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        this.props.history.push({
            pathname: this.props.location.state.destination,
            state: dataChecking(this.props, 'location', 'state'),
        });
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

};

export default AlternateRoute;
