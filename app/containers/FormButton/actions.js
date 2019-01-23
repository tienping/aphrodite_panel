/*
 *
 * FormButton actions
 *
 */

import {
    FIRE_API,
    FIRE_API_SUCCESS,
    FIRE_API_FAIL,
} from './constants';

export function fireApi(params) {
    return {
        type: FIRE_API,
        payload: params,
    };
}

export function fireApiSuccess() {
    return {
        type: FIRE_API_SUCCESS,
    };
}

export function fireApiFail() {
    return {
        type: FIRE_API_FAIL,
    };
}
