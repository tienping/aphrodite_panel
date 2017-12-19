import request, { loadSession } from 'utils/request';
import { takeLatest, call, put } from 'redux-saga/effects';
import { staticErrorResponse } from 'utils/globalTestUtils';

import { LOGIN, AUTHENTICATE } from './constants';
import {
    loginSuccess,
    loginFailed,
    checkAuthDone,
    checkAuthError,
} from './actions';

export function* getToken(userdata) {
    const d = userdata.payload;
    const encoded = btoa(`${d.username}:${d.password}`);

    const API_URL = `${process.env.API_URL}/auth/token`;
    const API_OPTIONS = {
        method: 'POST',
        headers: {
            authorization: `Basic ${encoded}`,
        },
    };

    try {
        const response = yield call(request, API_URL, API_OPTIONS);
        if (response && response.token) {
            yield put(loginSuccess(response));
        } else if (response && response.success === false) {
            yield put(loginFailed(response));
        } else {
            const message = { text: JSON.stringify(response) };
            yield put(loginFailed(staticErrorResponse(message)));
        }
    } catch (e) {
        const message = { text: `Error: ${JSON.stringify(e)}` };
        yield put(loginFailed(staticErrorResponse(message)));
    }
}

export function* checkAuthToken() {
    try {
        const token = yield call(loadSession);
        if (token) {
            yield put(checkAuthDone(token));
        } else {
            throw staticErrorResponse({ text: 'Session expired. Please login' });
        }
    } catch (e) {
        yield put(checkAuthError(e));
    }
}

export default function* authSaga() {
    yield takeLatest(LOGIN, getToken);
    yield takeLatest(AUTHENTICATE, checkAuthToken);
}
