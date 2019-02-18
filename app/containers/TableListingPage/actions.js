/*
 *
 * TableListingPage actions
 *
 */

import {
    TABLE_LISTING_GET_LIST,
    TABLE_LISTING_GET_LIST_SUCCESS,
    TABLE_LISTING_GET_LIST_FAILED,
} from './constants';

export function getList(pageType) {
    return {
        type: TABLE_LISTING_GET_LIST,
        pageType,
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
