import { call, put, takeLatest } from 'redux-saga/effects';
import { apiRequest } from 'globalUtils';
import {
    getListSuccess,
    getListFail,
} from './actions';
import {
    TABLE_LISTING_GET_LIST,
} from './constants';

export function* getTableData(action) {
    try {
        // const response = yield call(apiRequest, 'services/gami/rewards/event_list', 'get', null, 'https://review-staging.hermo.my');
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

export default function* defaultSaga() {
    yield takeLatest(TABLE_LISTING_GET_LIST, getTableData);
}
