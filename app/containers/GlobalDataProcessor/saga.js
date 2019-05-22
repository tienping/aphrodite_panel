import { call, put, takeLatest } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import { NotificationManager } from 'react-notifications';
import globalScope from 'globalScope';

import {
    getListSuccess,
    getListFail,
    getListByFeatherSuccess,
    getListByFeatherFail,
    fireApiSuccess,
    fireApiFail,
    getDataKeyValueSuccess,
    getDataKeyValueFail,
} from './actions';
import {
    GET_LIST,
    GET_LIST_BY_FEATHER,
    FIRE_API,
    GET_DATA_KEY_VALUE,
} from './constants';

export function* getTableData(action) {
    try {
        let targetApi = action.params.api;
        if (action.params.id && action.params.api.indexOf(':id') !== -1) {
            targetApi = action.params.api.replace(':id', action.params.id);
        }
        const response = yield call(apiRequest, targetApi, 'get');
        if (response && response.ok) {
            yield put(getListSuccess(response));
        } else {
            if (response && response.error) {
                NotificationManager.error(response.error, 'Error!! (click to dismiss)', 5000, () => {
                    // alert(JSON.stringify(formbutton.fireApiError).replace('\"', '"'));
                });
            }
            yield put(getListFail(response));
        }
    } catch (response) {
        yield put(getListFail(response));
    }
}

export function* getTableDataByFeather(action) {
    try {
        const response = yield globalScope.feather.query(action.params.service).find(action.params.options);

        if (response && response.ok) {
            yield put(getListByFeatherSuccess(response));
        } else {
            if (response && response.error) {
                NotificationManager.error(response.error, 'Error!! (click to dismiss)', 5000, () => {
                    // alert(JSON.stringify(formbutton.fireApiError).replace('\"', '"'));
                });
            }
            yield put(getListByFeatherFail(response));
        }
    } catch (response) {
        yield put(getListByFeatherFail(response));
    }
}

export function* fireApi(action) {
    const { apiUrl, type, data } = action.payload;
    try {
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
        }
        yield put(getDataKeyValueFail(response.data));
    }
}

// Individual exports for testing
export default function* globalDataProcessorSaga() {
    yield takeLatest(GET_LIST, getTableData);
    yield takeLatest(GET_LIST_BY_FEATHER, getTableDataByFeather);
    yield takeLatest(FIRE_API, fireApi);
    yield takeLatest(GET_DATA_KEY_VALUE, getDataKeyValue);
}
