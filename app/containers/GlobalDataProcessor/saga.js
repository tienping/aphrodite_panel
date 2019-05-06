import { call, put, takeLatest } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import { NotificationManager } from 'react-notifications';
import globalScope from 'globalScope';

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

export function* getTableData() {
// export function* getTableData(action) {
    console.log('1111', globalScope.socket);
    try {
        // let targetApi = action.params.api;
        // if (action.params.id && action.params.api.indexOf(':id') !== -1) {
        //     targetApi = action.params.api.replace(':id', action.params.id);
        // }
        const response = yield globalScope.socket.query('merchant').find({
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'en',
                'token': globalScope.token,
            },
        });
        // const response = yield featherSocket.query('order').find({ query: { merchant_id: action.params.id } });
        // const response = yield call(apiRequest, targetApi, 'get');

        if (response && response.ok) {
            yield put(getListSuccess(response.data));
        } else {
            if (response.data && response.data.error) {
                NotificationManager.error(response.data.error, 'Error!! (click to dismiss)', 5000, () => {
                    // alert(JSON.stringify(formbutton.fireApiError).replace('\"', '"'));
                });
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
        // const res = yield globalScope.socket.query('merchant').create({ id: 'sadsdf' });
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

// Individual exports for testing
export default function* globalDataProcessorSaga() {
    yield takeLatest(GET_LIST, getTableData);
    yield takeLatest(FIRE_API, fireApi);
    yield takeLatest(GET_DATA_KEY_VALUE, getDataKeyValue);
}
