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
    FIRE_API,
    FIRE_API_SUCCESS,
    FIRE_API_FAIL,
    ADD_NEW_BUTTON_TO_LIST,
} from './constants';

const initialState = fromJS({
    loading: false,
    error: false,
    data: [],
});

function tableListingPageReducer(state = initialState, action) {
    let tempObj = {};
    switch (action.type) {
        case TABLE_LISTING_GET_LIST:
            return state
                .set('loading', true)
                .set('error', false);
        case TABLE_LISTING_GET_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.payload);
        case TABLE_LISTING_GET_LIST_FAILED:
            return state
                .set('loading', false)
                .set('error', true);
        case FIRE_API:
            tempObj = {
                fireApiReturnedData: null,
                firing: true,
                fireApiError: false,
            };
            return state
                .set(`formButton_${action.formId}`, tempObj);
        case FIRE_API_SUCCESS:
            tempObj = {
                fireApiReturnedData: action.payload.data,
                firing: false,
                fireApiError: false,
            };
            return state
                .set(`formButton_${action.formId}`, tempObj);
        case FIRE_API_FAIL:
            tempObj = {
                fireApiReturnedData: null,
                firing: false,
                fireApiError: action.payload.errors || action.payload.errors || action.payload,
            };
            return state
                .set(`formButton_${action.formId}`, tempObj);
        case ADD_NEW_BUTTON_TO_LIST:
            return state
                .set('addNewButtonToList', action.newButtonId);
        default:
            return state;
    }
}

export default tableListingPageReducer;
