/*
 *
 * GlobalDataProcessor reducer
 *
 */

import { fromJS } from 'immutable';
import { dataChecking } from 'globalUtils';
import {
    GET_LIST_BY_FEATHER,
    GET_LIST_BY_FEATHER_SUCCESS,
    GET_LIST_BY_FEATHER_FAILED,
    GET_LIST,
    GET_LIST_SUCCESS,
    GET_LIST_FAILED,
    FIRE_API,
    FIRE_API_SUCCESS,
    FIRE_API_FAIL,
    ADD_NEW_BUTTON_TO_LIST,
    TOGGLE_UTIL_FORM_BUTTON,
    GET_DATA_KEY_VALUE,
    GET_DATA_KEY_VALUE_SUCCESS,
    GET_DATA_KEY_VALUE_FAILED,
} from './constants';

const initialState = fromJS({
    loading: false,
    error: false,
    data: [],
});

function globalDataProcessorReducer(state = initialState, action) {
    let tempObj = {};
    switch (action.type) {
        case GET_LIST_BY_FEATHER:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_LIST_BY_FEATHER_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.payload);
        case GET_LIST_BY_FEATHER_FAILED:
            return state
                .set('loading', false)
                .set('error', dataChecking(action, 'payload', 'data', 'error') || true);
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
                .set('error', dataChecking(action, 'payload', 'data', 'error') || true);
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
        // -------------------------- end of GET_LIST -------------------------------
        case ADD_NEW_BUTTON_TO_LIST:
            return state
                .set('addNewButtonToList', action.newButtonId);
        // -------------------------- end of ADD_NEW_BUTTON_TO_LIST -------------------------------
        case TOGGLE_UTIL_FORM_BUTTON:
            // tempObj = state.get('toggleUtilFormButton') || {};
            // tempObj[action.utilButtonId] = !tempObj[action.utilButtonId] || true;
            return state
                .set('toggleUtilFormButton', {
                    id: action.utilButtonId,
                    status: action.status,
                    onSuccessCallback: action.onSuccessCallback,
                    onFailureCallback: action.onFailureCallback,
                    resetOnClose: action.resetOnClose,
                });
        // -------------------------- end of GET_LIST -------------------------------
        case GET_DATA_KEY_VALUE:
            return state
                .set('getItemLoading', true)
                .set('getItemError', false);
        case GET_DATA_KEY_VALUE_SUCCESS:
            return state
                .set('getItemLoading', false)
                .set('getItemError', false)
                .set('getItemData', { data: action.payload, field: action.field, buttonId: action.buttonId });
        case GET_DATA_KEY_VALUE_FAILED:
            return state
                .set('getItemLoading', false)
                .set('getItemError', true);
        // -------------------------- end of GET_DATA_KEY_VALUE -------------------------------
        default:
            return state;
    }
}

export default globalDataProcessorReducer;
