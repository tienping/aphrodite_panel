import { call, put, takeLatest } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import {
    getListSuccess,
    getListFail,
    fireApiSuccess,
    fireApiFail,
} from './actions';
import {
    TABLE_LISTING_GET_LIST,
    FIRE_API,
} from './constants';

export function* getTableData(action) {
    try {
        // const response = yield call(apiRequest, 'services/gami/rewards/event_list', 'get', null, 'https://api-staging.hermo.my');
        const response = yield call(apiRequest, action.params.api, 'get');

        if (response && response.ok) {
            yield put(getListSuccess(response.data));
        } else {
            if (response.data && response.data.error) {
                alert(response.data.error);
            }
            yield put(getListFail(response));
        }
    } catch (response) {
        console.log('getListFail', response);
        yield put(getListFail(response));
    }
}

export function* fireApi(action) {
    const { apiUrl, type, data } = action.payload;
    try {
        // const response = yield call(apiRequest, '', type, params, apiUrl, { headers: { 'Content-Type': 'multipart/form-data' } });
        const response = yield call(apiRequest, '', type, data, apiUrl);

        if (response && response.ok) {
            if (response && response.data && response.data.errors) {
                yield put(fireApiFail(response.data, action.formId));
            } else {
                yield put(fireApiSuccess(response.data, action.formId));
            }
        } else {
            yield put(fireApiFail(response.data, action.formId));
        }
    } catch (error) {
        console.log('fireApiFail', error);
        yield put(fireApiFail(error, action.formId));
    }
}

export default function* defaultSaga() {
    yield takeLatest(TABLE_LISTING_GET_LIST, getTableData);
    yield takeLatest(FIRE_API, fireApi);
}
