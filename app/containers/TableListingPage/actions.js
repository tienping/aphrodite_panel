/*
 *
 * TableListingPage actions
 *
 */

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

// getDataKeyValue
export function getDataKeyValue(field) {
    return {
        type: GET_DATA_KEY_VALUE,
        field,
    };
}

export function getDataKeyValueSuccess(response, field) {
    return {
        type: GET_DATA_KEY_VALUE_SUCCESS,
        payload: response,
        field,
    };
}

export function getDataKeyValueFail(response) {
    return {
        type: GET_DATA_KEY_VALUE_FAILED,
        payload: response,
    };
}
