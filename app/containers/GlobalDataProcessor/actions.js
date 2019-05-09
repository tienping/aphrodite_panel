/*
 *
 * GlobalDataProcessor actions
 *
 */

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

export function getListByFeather(params) {
    return {
        type: GET_LIST_BY_FEATHER,
        params,
    };
}

export function getListByFeatherSuccess(response) {
    return {
        type: GET_LIST_BY_FEATHER_SUCCESS,
        payload: response,
    };
}

export function getListByFeatherFail(response) {
    return {
        type: GET_LIST_BY_FEATHER_FAILED,
        payload: response,
    };
}

export function getList(params) {
    return {
        type: GET_LIST,
        params,
    };
}

export function getListSuccess(response) {
    return {
        type: GET_LIST_SUCCESS,
        payload: response,
    };
}

export function getListFail(response) {
    return {
        type: GET_LIST_FAILED,
        payload: response,
    };
}

// fireApi
export function fireApi(params, formId) {
    return {
        type: FIRE_API,
        formId,
        payload: params,
    };
}

export function fireApiSuccess(response, formId) {
    return {
        type: FIRE_API_SUCCESS,
        formId,
        payload: response,
    };
}

export function fireApiFail(response, formId) {
    return {
        type: FIRE_API_FAIL,
        formId,
        payload: response,
    };
}

// addNewButtonToList
export function addNewButtonToList(newButtonId) {
    return {
        type: ADD_NEW_BUTTON_TO_LIST,
        newButtonId,
    };
}

// toggleUtilFormButton
export function toggleUtilFormButton(utilButtonId, status, onSuccessCallback, onFailureCallback, resetOnClose) {
    return {
        type: TOGGLE_UTIL_FORM_BUTTON,
        utilButtonId,
        status,
        onSuccessCallback,
        onFailureCallback,
        resetOnClose,
    };
}

// getDataKeyValue
export function getDataKeyValue(field, buttonId) {
    return {
        type: GET_DATA_KEY_VALUE,
        buttonId,
        field,
    };
}

export function getDataKeyValueSuccess(response, field, buttonId) {
    return {
        type: GET_DATA_KEY_VALUE_SUCCESS,
        payload: response,
        buttonId,
        field,
    };
}

export function getDataKeyValueFail(response) {
    return {
        type: GET_DATA_KEY_VALUE_FAILED,
        payload: response,
    };
}
