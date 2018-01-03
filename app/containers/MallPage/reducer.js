/*
 *
 * Mall reducer
 *
 */

import { fromJS } from 'immutable';
import {
    FETCH_MALL,
    FETCH_MALL_SUCCESS,
    FETCH_MALL_FAILED,
} from './constants';

export const initialState = fromJS({
    loading: false,
    error: false,
    mall: {},
});

export function mallPageReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MALL:
            return state
                .set('loading', true)
                .set('error', false);
        case FETCH_MALL_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .setIn(['mall'], action.payload);
        case FETCH_MALL_FAILED:
            return state
                .set('loading', false)
                .set('error', true)
                .setIn(['mall'], action.payload);
        default:
            return state;
    }
}

export default mallPageReducer;
