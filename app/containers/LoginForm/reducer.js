/*
 *
 * LoginForm reducer
 *
 */
import { fromJS } from 'immutable';
import { sessionService } from 'redux-react-session';
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
} from './constants';

const initialState = fromJS({
    loading: false,
    error: false,
});

const session = {
    save: sessionService.saveSession,
    reset: () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
    },
};

function loginFormReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return state
                .set('loading', true)
                .set('error', false);
        case LOGIN_SUCCESS:
            session.save(action.payload);
            return state
                .set('loading', false)
                .set('error', false);
        case LOGIN_FAILED:
            session.reset();
            return state
                .set('loading', false)
                .setIn(['error'], action.payload);
        default:
            return state;
    }
}

export default loginFormReducer;
