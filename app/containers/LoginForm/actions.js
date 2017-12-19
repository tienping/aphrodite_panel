/*
 *
 * LoginForm actions
 *
 */

import {
    LOGIN,
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTHENTICATE,
    AUTHENTICATE_DONE,
    AUTHENTICATE_ERROR,
} from './constants';

export function doLogin(userdata) {
    return {
        type: LOGIN,
        payload: userdata,
    };
}

export function doLogout() {
    return {
        type: LOGOUT,
    };
}

export function loginSuccess(response) {
    return {
        type: LOGIN_SUCCESS,
        payload: response.token,
    };
}

export function loginFailed(response) {
    return {
        type: LOGIN_FAILED,
        payload: response,
    };
}

export function checkAuth() {
    return {
        type: AUTHENTICATE,
    };
}

export function checkAuthDone(response) {
    return {
        type: AUTHENTICATE_DONE,
        payload: response,
    };
}

export function checkAuthError(response) {
    return {
        type: AUTHENTICATE_ERROR,
        payload: response,
    };
}
