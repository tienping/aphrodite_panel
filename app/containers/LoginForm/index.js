/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Modal from 'components/Modal/Loadable';
import Input from 'components/Input';
// import Loading from 'components/Loading';
import ErrorMessage from 'components/ErrorMessage';

import reducer from './reducer';
import saga from './saga';

import { doLogin } from './actions';

import {
    makeSelectAuthError,
    makeSelectAuthLoading,
} from './selectors';

export const authkeys = ['username', 'password'];

export const Form = (props) => (
    <form onSubmit={props.action}>
        {props.keys.map((key) => (
            <Input key={key} type={key} placeholder={key} name={key} />)
        )}
        {props.error &&
            <ErrorMessage error={props.error} type="danger" />
        }
        <Input type="submit" className="btn btn-primary" value="Login" loading={props.loading} />
    </form>
);

export class LoginForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <Modal header={{}} title="Login to MyReact" dismissable={{}} origin="/test" >
                <Form action={this.props.login} keys={authkeys} {...this.props} />
            </Modal>
        );
    }
}

LoginForm.propTypes = {
    // dispatch: PropTypes.func.isRequired,
    login: PropTypes.func,
};

Form.propTypes = {
    action: PropTypes.func,
    keys: PropTypes.array,
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    loading: makeSelectAuthLoading(),
    error: makeSelectAuthError(),
});

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        login: (evt) => {
            evt.preventDefault();
            const form = {};
            authkeys.map((key) => (form[key] = evt.target[key].value));
            dispatch(doLogin(form));
        },
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'LoginForm', reducer });
const withSaga = injectSaga({ key: 'session', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(LoginForm);
