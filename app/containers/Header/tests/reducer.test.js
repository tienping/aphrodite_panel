
import { fromJS } from 'immutable';
import headerReducer from '../reducer';

const initialState = fromJS({
    loading: false,
    error: false,
    topNav: [],
});

describe('headerReducer', () => {
    it('returns the initial state', () => {
        expect(headerReducer(undefined, {})).toEqual(fromJS(initialState));
    });
});
