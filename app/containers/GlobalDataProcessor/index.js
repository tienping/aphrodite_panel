/**
 *
 * GlobalDataProcessor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectGlobalDataProcessor from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class GlobalDataProcessor extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div />
        );
    }
}

GlobalDataProcessor.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    globaldataprocessor: makeSelectGlobalDataProcessor(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'globalDataProcessor', reducer });
const withSaga = injectSaga({ key: 'globalDataProcessor', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter,
)(GlobalDataProcessor);
