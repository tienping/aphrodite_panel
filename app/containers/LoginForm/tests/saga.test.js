/**
 * Login sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put } from 'redux-saga/effects';
import { staticErrorResponse } from 'utils/globalUtils';
import authSaga, {
    getToken,
    checkAuthToken,
} from '../saga';

import {
    doLogin,
    loginSuccess,
    loginFailed,
    checkAuth,
    checkAuthDone,
    checkAuthError,
} from '../actions';

const userPayload = { username: '', password: '' };
const failedPayload = staticErrorResponse({ text: '{}' });
const successPayload = { success: true, token: '123' };

let generator;
describe('authSaga()', () => {
    generator = authSaga();

    it('should yield getToken() when LOGIN is dispatched', (done) => {
        const mock = generator.next().value;
        const expected = put(doLogin({ username: '', password: '' }));
        expect(mock.PUT).toEqual(expected.FORK);
        done();
    });

    it('should trigger checkAuthToken when AUTHENTICATE is dispatched', (done) => {
        const mock = generator.next().value;
        const expected = put(checkAuth());
        expect(mock.PUT).toEqual(expected.FORK);
        done();
    });
});

describe('getToken()', () => {
    beforeEach(() => {
        generator = getToken({ payload: userPayload });
    });
    it('should trigger loginSuccess() when success', (done) => {
        expect(generator.next()).toMatchSnapshot();
        const mock = generator.next(successPayload).value;
        const expected = put(loginSuccess(successPayload));
        expect(mock).toEqual(expected);
        done();
    });

    it('should trigger loginFailed() when API returned falsy success', (done) => {
        expect(generator.next()).toMatchSnapshot();
        const mock = generator.next(failedPayload).value;
        const expected = put(loginFailed(failedPayload));
        expect(mock).toEqual(expected);
        done();
    });

    it('should trigger loginFailed() no response returned', (done) => {
        expect(generator.next()).toMatchSnapshot();
        const errorPayload = staticErrorResponse({ text: JSON.stringify('Test Error') });
        const mock = generator.next('Test Error').value;
        const expected = put(loginFailed(errorPayload));
        expect(mock).toEqual(expected);
        done();
    });

    it('should throw loginFailed() if the generator throws error', (done) => {
        expect(generator.next()).toMatchSnapshot();
        const errorPayload = staticErrorResponse({ text: 'Error: {}' });
        const mock = generator.throw({}).value;
        const expected = put(loginFailed(errorPayload));
        expect(mock).toEqual(expected);
        done();
    });
});

describe('checkAuth()', () => {
    beforeEach(() => {
        generator = checkAuthToken();
    });

    it('should trigger checkAuthDone() when success', (done) => {
        expect(generator.next()).toMatchSnapshot();

        const mock = generator.next(successPayload.token).value;
        const expected = put(checkAuthDone(successPayload.token));
        expect(mock).toEqual(expected);
        done();
    });

    it('should throw checkAuthError() when there is no session', (done) => {
        expect(generator.next()).toMatchSnapshot();
        const mock = generator.next().value;

        const errorPayload = staticErrorResponse({ text: 'Session expired. Please login' });
        const expected = put(checkAuthError(errorPayload));
        expect(mock).toEqual(expected);
        done();
    });
});
