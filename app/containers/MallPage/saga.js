// import { take, call, put, select } from 'redux-saga/effects';

import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { staticErrorResponse } from 'utils/globalUtils';


import {
    FETCH_MALL,
} from './constants';

import {
    fetchMallSuccess,
    fetchMallFailed,
} from './actions';

const API = {
    URL: `${process.env.API_URL}/mall`,
    PARAMS: { method: 'GET', headers: { hertoken: '' } },
};

export function* getMallData(page) {
    const url = (page && typeof page.payload === 'number') ? `${API.URL}?page=${page.payload}` : API.URL;
    let err;

    try { // Trying the HTTP Request
        const response = yield call(request, url, API.PARAMS);
        if (response && response.success !== false) {
            yield put(fetchMallSuccess(response));
        } else if (response && response.success === false) {
            yield put(fetchMallFailed(response));
        } else {
            err = staticErrorResponse({ text: 'No response from server' });
            throw err;
        }
    } catch (e) {
        yield put(fetchMallFailed(e));
    }
}

export default function* mallSaga() {
    yield takeLatest(FETCH_MALL, getMallData);
}
