/*
 *
 * TableListingPage actions
 *
 */

import {
    TABLE_LISTING_GET_LIST,
    TABLE_LISTING_GET_LIST_SUCCESS,
    TABLE_LISTING_GET_LIST_FAILED,
    FIRE_API,
    FIRE_API_SUCCESS,
    FIRE_API_FAIL,
    ADD_NEW_BUTTON_TO_LIST,
} from './constants';

export function getList(params) {
    return {
        type: TABLE_LISTING_GET_LIST,
        params,
    };
}

export function getListSuccess(response) {
    return {
        type: TABLE_LISTING_GET_LIST_SUCCESS,
        payload: response,
    };
}

export function getListFail(response) {
    return {
        type: TABLE_LISTING_GET_LIST_FAILED,
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

export function addNewButtonToList(newButtonId) {
    return {
        type: ADD_NEW_BUTTON_TO_LIST,
        newButtonId,
    };
}
