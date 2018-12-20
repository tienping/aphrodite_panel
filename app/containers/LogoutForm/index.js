/**
 *
 * LogoutForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogoutForm from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import './style.scss';

export class LogoutForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div id="TableListingPage-container" className="TableListingPage-page">
                <Helmet>
                    <title>Login to Hermo Gamicenter</title>
                    <meta name="description" content="Description of TableListingPage" />
                </Helmet>
                <section className="container">
                    <div className="loginForm-wrapper">
                        logout
                    </div>
                </section>
            </div>
        );
    }
}

LogoutForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    logoutform: makeSelectLogoutForm(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'logoutForm', reducer });
const withSaga = injectSaga({ key: 'logoutForm', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(LogoutForm);
