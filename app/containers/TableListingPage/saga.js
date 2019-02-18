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
    const response = yield call(apiRequest, `/postgres/${action.pageType}`, 'get');
    if (response && response.ok) {
        yield put(getListSuccess(response.data));
    } else {
        if (response.data && response.data.error) {
            alert(response.data.error);
        }
        yield put(getListFail(response.data));
    }
}

export default function* defaultSaga() {
    yield takeLatest(TABLE_LISTING_GET_LIST, getTableData);
}
