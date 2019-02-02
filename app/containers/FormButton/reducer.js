/*
 *
 * FormButton reducer
 *
 */

import { fromJS } from 'immutable';
import {
    FIRE_API,
    FIRE_API_SUCCESS,
    FIRE_API_FAIL,
} from './constants';

const initialState = fromJS({});

function formButtonReducer(state = initialState, action) {
    switch (action.type) {
        case FIRE_API:
            return state
                .set('fireApiReturnedData', null)
                .set('firing', true)
                .set('error', false);
        case FIRE_API_SUCCESS:
            return state
                .set('fireApiReturnedData', action.payload.data)
                .set('firing', false)
                .set('error', false);
        case FIRE_API_FAIL:
            return state
                .set('firing', false)
                .set('error', true);
        default:
            return state;
    }
}

export default formButtonReducer;
