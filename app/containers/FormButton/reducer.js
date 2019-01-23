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
            return state;
        case FIRE_API_SUCCESS:
            return state;
        case FIRE_API_FAIL:
            return state;
        default:
            return state;
    }
}

export default formButtonReducer;
