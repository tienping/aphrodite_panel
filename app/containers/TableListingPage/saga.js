import { call, put, takeLatest } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import {
    getListSuccess,
    getListFail,
    fireApiSuccess,
    fireApiFail,
    getDataKeyValueSuccess,
    getDataKeyValueFail,
} from './actions';
import {
    GET_LIST,
    FIRE_API,
    GET_DATA_KEY_VALUE,
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

export function* getDataKeyValue(action) {
    const { field, buttonId } = action;
    const response = yield call(apiRequest, field.itemApi, 'get');
    if (response && response.ok) {
        yield put(getDataKeyValueSuccess(response.data, field, buttonId));
    } else {
        if (response.data && response.data.error) {
            alert(JSON.stringify(response.data.error));
            console.log(response.data.error);
        }
        yield put(getDataKeyValueFail(response.data));
    }
}

export default function* defaultSaga() {
    yield takeLatest(GET_LIST, getTableData);
    yield takeLatest(FIRE_API, fireApi);
    yield takeLatest(GET_DATA_KEY_VALUE, getDataKeyValue);
}
