import { takeLatest, call, put } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';

import {
    FIRE_API,
} from './constants';
import {
    fireApiSuccess,
    fireApiFail,
} from './actions';

export function* fireApi(action) {
    const { apiUrl, type, params } = action.payload;
    try {
        const response = yield call(apiRequest, '', type, params, apiUrl);

        if (response && response.ok) {
            yield put(fireApiSuccess(response.data));
        } else {
            yield put(fireApiFail(response.data));
        }
    } catch (error) {
        console.log('fireApiFail', error);
        yield put(fireApiFail(error));
    }
}

export default function* formButtontSaga() {
    yield takeLatest(FIRE_API, fireApi);
}
