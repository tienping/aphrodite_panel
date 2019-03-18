/*
 *
 * TableListingPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_LIST,
    GET_LIST_SUCCESS,
    GET_LIST_FAILED,
    FIRE_API,
    FIRE_API_SUCCESS,
    FIRE_API_FAIL,
    ADD_NEW_BUTTON_TO_LIST,
    GET_DATA_KEY_VALUE,
    GET_DATA_KEY_VALUE_SUCCESS,
    GET_DATA_KEY_VALUE_FAILED,
} from './constants';

const initialState = fromJS({
    loading: false,
    error: false,
    data: [],
});

function tableListingPageReducer(state = initialState, action) {
    let tempObj = {};
    switch (action.type) {
        case GET_LIST:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.payload);
        case GET_LIST_FAILED:
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
        // -------------------------- end of GET_LIST -------------------------------
        case GET_DATA_KEY_VALUE:
            return state
                .set('getItemLoading', true)
                .set('getItemError', false);
        case GET_DATA_KEY_VALUE_SUCCESS:
            return state
                .set('getItemLoading', false)
                .set('getItemError', false)
                .set('getItemData', { data: action.payload, field: action.field });
        case GET_DATA_KEY_VALUE_FAILED:
            return state
                .set('getItemLoading', false)
                .set('getItemError', true);
        default:
            return state;
    }
}

export default tableListingPageReducer;
