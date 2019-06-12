import { takeLatest, call, put } from 'redux-saga/effects';
import { NotificationManager } from 'react-notifications';
import { apiRequest, setCookie } from 'globalUtils';
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
            globalScope.axios.setHeader('hertoken', globalScope.token);
            const isAdminResponse = yield call(apiRequest, '/view/preview/145', 'post');
            globalScope.isAdmin = !!(isAdminResponse && isAdminResponse.data && isAdminResponse.data.id);
            if (globalScope.isAdmin) {
                try {
                    yield globalScope.feather.authenticate({ token: globalScope.token }, 'custom', 'aphrodite')
                        .then((response2) => {
                            if (response2.user) {
                                globalScope.userData = response2.user;
                            }
                            globalScope.token = response.data.token;
                            setCookie(process.env.TOKEN_KEY, globalScope.token);
                            setCookie(process.env.ADMIN_KEY, globalScope.isAdmin);
                            console.log('Second tier authentication passed', response2.user);
                        })
                        .catch((response2) => {
                            globalScope.token = '';
                            globalScope.isAdmin = false;
                            NotificationManager.error(JSON.stringify(response2), 'Error!! (click to dismiss)', 5000);
                            console.log('Second tier authentication failed', response2);
                        });
                    yield put(loginSuccess(response.data.token));
                } catch (error) {
                    globalScope.token = '';
                    globalScope.isAdmin = false;
                    console.log('Second tier authentication failed-', error);
                }
            } else {
                globalScope.token = '';
                globalScope.axios.setHeader('hertoken', '');
                response.data.messages[0] = { type: 'error', text: 'Invalid user access level!' };
                yield put(loginFailed(response.data));
            }
        } else {
            yield put(loginFailed(response.data));
        }
    } catch (error) {
        yield put(loginFailed(error));
    }
}

export default function* authSaga() {
    yield takeLatest(AUTH_LOGIN, doLogin);
}
