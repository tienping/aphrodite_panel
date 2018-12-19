/*
 *
 * LoginForm reducer
 *
 */
import { fromJS } from 'immutable';

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
} from './constants';

const initialState = fromJS({
    loading: false,
    error: false,
});

function loginFormReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return state
                .set('loading', true)
                .set('error', false);
        case AUTH_LOGIN_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false);
        case AUTH_LOGIN_FAILED:
            return state
                .set('loading', false)
                .setIn(['error'], action.payload);
        default:
            return state;
    }
}

export default loginFormReducer;
