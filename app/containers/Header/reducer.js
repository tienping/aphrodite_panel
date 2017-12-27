/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
import {
    FETCH_TOP_NAV,
    FETCH_TOP_NAV_SUCCESS,
    FETCH_TOP_NAV_FAILED,
} from './constants';

const initialState = fromJS({
    loading: false,
    error: false,
    topNav: [],
});

function headerReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TOP_NAV:
            return state
                .set('loading', true)
                .set('error', false);
        case FETCH_TOP_NAV_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .setIn(['header'].topNav, action.payload);
        case FETCH_TOP_NAV_FAILED:
            return state
                .set('loading', false)
                .set('error', true)
                .setIn(['header'].topNav, action.payload);
        default:
            return state;
    }
}

export default headerReducer;
