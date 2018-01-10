// import { take, call, put, select } from 'redux-saga/effects';

// import { call, put, takeLatest } from 'redux-saga/effects';
// import request from 'utils/request';
// import { staticErrorResponse } from 'utils/globalUtils';ß


// import {
//     FETCH_CONFIG,
// } from './constants';

// import {
//     fetchConfigSuccess,
//     fetchConfigFailed,
// } from './actions';

// const API = {
//     URL: `${process.env.API_URL}/common/config`,
//     PARAMS: { method: 'GET', headers: { hertoken: '' } },
// };

export function* getConfigData() {
// export function* getConfigData(page) {
    // const url = (page && typeof page.payload === 'number') ? `${API.URL}?page=${page.payload}` : API.URL;
    // let err;

    try { // Trying the HTTP Request
        // const response = yield call(request, url, API.PARAMS);
        // if (response && response.success !== false) {
        //     yield put(fetchConfigSuccess(response));
        // } else if (response && response.success === false) {
        //     yield put(fetchConfigFailed(response));
        // } else {
        //     err = staticErrorResponse({ text: 'No response from server' });
        //     throw err;
        // }
    } catch (e) {
        // yield put(fetchConfigFailed(e));
    }
}
