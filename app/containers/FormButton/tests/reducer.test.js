
import { fromJS } from 'immutable';
import formButtonReducer from '../reducer';

describe('formButtonReducer', () => {
    it('returns the initial state', () => {
        expect(formButtonReducer(undefined, {})).toEqual(fromJS({}));
    });
});
