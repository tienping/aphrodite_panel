/*
 *
 * MallPage actions
 *
 */

import {
    FETCH_MALL,
    FETCH_MALL_SUCCESS,
    FETCH_MALL_FAILED,
} from './constants';

export function fetchMall(page) {
    return {
        type: FETCH_MALL,
        payload: page,
    };
}

export function fetchMallSuccess(response) {
    return {
        type: FETCH_MALL_SUCCESS,
        payload: response,
    };
}

export function fetchMallFailed(response) {
    return {
        type: FETCH_MALL_FAILED,
        payload: response,
    };
}
