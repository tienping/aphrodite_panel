
import {
    doLogin,
    doLogout,
    loginSuccess,
    loginFailed,
    checkAuth,
    checkAuthDone,
    checkAuthError,
} from '../actions';
import {
    LOGIN,
    LOGOUT,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    AUTHENTICATE,
    AUTHENTICATE_DONE,
    AUTHENTICATE_ERROR,
} from '../constants';

describe('LoginForm actions', () => {
    describe('doLogin()', () => {
        it('has a type of LOGIN', () => {
            const expected = {
                type: LOGIN,
            };
            expect(doLogin()).toEqual(expected);
        });
    });

    describe('doLogout()', () => {
        it('has a type of LOGOUT', () => {
            const expected = {
                type: LOGOUT,
            };
            expect(doLogout()).toEqual(expected);
        });
    });

    describe('loginSuccess()', () => {
        it('has a type of LOGIN_SUCCESS', () => {
            const response = { token: '' };
            const expected = {
                type: LOGIN_SUCCESS,
                payload: response.token,
            };
            expect(loginSuccess(response)).toEqual(expected);
        });
    });

    describe('loginFailed()', () => {
        it('has a type of LOGIN_FAILED', () => {
            const expected = {
                type: LOGIN_FAILED,
                payload: undefined,
            };
            expect(loginFailed()).toEqual(expected);
        });
    });

    describe('checkAuth()', () => {
        it('has a type of AUTHENTICATE', () => {
            const expected = {
                type: AUTHENTICATE,
            };
            expect(checkAuth()).toEqual(expected);
        });
    });

    describe('checkAuthDone()', () => {
        it('has a type of AUTHENTICATE_DONE', () => {
            const expected = {
                type: AUTHENTICATE_DONE,
                payload: {},
            };
            expect(checkAuthDone({})).toEqual(expected);
        });
    });

    describe('checkAuthError()', () => {
        it('has a type of AUTHENTICATE_ERROR', () => {
            const expected = {
                type: AUTHENTICATE_ERROR,
                payload: {},
            };
            expect(checkAuthError({})).toEqual(expected);
        });
    });
});
