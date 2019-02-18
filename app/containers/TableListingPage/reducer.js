/*
 *
 * TableListingPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    TABLE_LISTING_GET_LIST,
    TABLE_LISTING_GET_LIST_SUCCESS,
    TABLE_LISTING_GET_LIST_FAILED,
} from './constants';

const initialState = fromJS({
    loading: false,
    error: false,
    data: {},
    createItemLoading: false,
    createItemError: false,
    deleteItemLoading: false,
    deleteItemError: false,
    deleting: {},
});

function tableListingPageReducer(state = initialState, action) {
    switch (action.type) {
        case TABLE_LISTING_GET_LIST:
            return state
                .set('deleting', {})
                .set('loading', true)
                .set('error', false);
        case TABLE_LISTING_GET_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.payload.result);
        case TABLE_LISTING_GET_LIST_FAILED:
            return state
                .set('loading', false)
                .set('error', true);
        default:
            return state;
    }
}

export default tableListingPageReducer;
