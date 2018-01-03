
// import { fromJS } from 'immutable';
import { mallPageReducer, initialState } from '../reducer';

import {
    fetchMall,
    // fetchMallSuccess,
    // fetchMallFailed,
} from '../actions';

describe('mallPageReducer', () => {
    let state;
    // const payLoad = { token: '123' };
    beforeEach(() => {
        state = initialState;
    });

    it('returns the initial state', () => {
        expect(mallPageReducer(undefined, {})).toEqual(initialState);
    });

    it('should show loading when trying to login', (done) => {
        const expected = state.set('loading', true).set('error', false);
        expect(mallPageReducer(state, fetchMall())).toEqual(expected);
        done();
    });
});
