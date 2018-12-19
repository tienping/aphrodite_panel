import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest, setCookie, getCookie } from 'globalUtils';
import globalScope from 'globalScope';

import { AUTH_LOGIN } from './constants';
import {
    loginSuccess,
    loginFailed,
} from './actions';

export function* doLogin(action) {
    const { username, password } = action.payload;
    try {
        const base64 = require('base-64');
        const hash = base64.encode(`${username}:${password}`);
        const response = yield call(apiRequest, 'auth/token', 'post', {}, null, { headers: { 'Authorization': `Basic ${hash}` } });
        if (response && response.ok) {
            globalScope.token = response.data.token;

            const isAdminResponse = yield call(apiRequest, '/view/preview/145', 'post');
            globalScope.isAdmin = !!(isAdminResponse && isAdminResponse.data && isAdminResponse.data.id);

            console.log('old token', getCookie(process.env.TOKEN_KEY));
            setCookie(process.env.TOKEN_KEY, globalScope.token);
            setCookie(process.env.ADMIN_KEY, globalScope.isAdmin);
            console.log('new token', getCookie(process.env.TOKEN_KEY));
            yield put(loginSuccess(response.data.token));
        } else {
            yield put(loginFailed(response.data));
        }
    } catch (error) {
        yield put(loginFailed(error));
    }
}

// export function* getToken(userdata) {
//     const d = userdata.payload;
//     const encoded = btoa(`${d.username}:${d.password}`);

//     const API_URL = `${process.env.API_URL}/auth/token`;
//     const API_OPTIONS = {
//         method: 'POST',
//         headers: {
//             authorization: `Basic ${encoded}`,
//         },
//     };

//     try {
//         const response = yield call(request, API_URL, API_OPTIONS);
//         if (response && response.token) {
//             yield put(loginSuccess(response));
//         } else if (response && response.success === false) {
//             yield put(loginFailed(response));
//         } else {
//             const message = { text: JSON.stringify(response) };
//             yield put(loginFailed(staticErrorResponse(message)));
//         }
//     } catch (e) {
//         const message = { text: `Error: ${JSON.stringify(e)}` };
//         yield put(loginFailed(staticErrorResponse(message)));
//     }
// }

export default function* authSaga() {
    yield takeLatest(AUTH_LOGIN, doLogin);
}
