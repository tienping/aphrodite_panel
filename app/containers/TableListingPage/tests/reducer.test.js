
import { fromJS } from 'immutable';
import tableListingPageReducer from '../reducer';

describe('tableListingPageReducer', () => {
    it('returns the initial state', () => {
        expect(tableListingPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
