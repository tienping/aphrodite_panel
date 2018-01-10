
// import { fromJS } from 'immutable';
import { mallPageReducer, initialState } from '../reducer';

import {
    fetchMall,
    fetchMallSuccess,
    fetchMallFailed,
} from '../actions';

describe('mallPageReducer', () => {
    let state;
    const randomData = {
        data: 'some-random-data',
    };
    // const payLoad = { token: '123' };
    beforeEach(() => {
        state = initialState;
    });

    it('returns the initial state', () => {
        expect(mallPageReducer(undefined, {})).toEqual(initialState);
    });

    it('should show loading true and error false when fetching mall', (done) => {
        const expected = state.set('loading', true).set('error', false);
        expect(mallPageReducer(state, fetchMall())).toEqual(expected);
        done();
    });

    it('should show loading false and error false when fetch mall succed', (done) => {
        const expected = state.set('loading', false).set('error', false).setIn(['mall'], randomData);
        expect(mallPageReducer(state, fetchMallSuccess(randomData))).toEqual(expected);
        done();
    });

    it('should show loading false and error true when fetch mall failed', (done) => {
        const expected = state.set('loading', false).set('error', true).setIn(['mall'], randomData);
        expect(mallPageReducer(state, fetchMallFailed(randomData))).toEqual(expected);
        done();
    });
});
