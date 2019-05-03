
import { fromJS } from 'immutable';
import globalDataProcessorReducer from '../reducer';

describe('globalDataProcessorReducer', () => {
    it('returns the initial state', () => {
        expect(globalDataProcessorReducer(undefined, {})).toEqual(fromJS({}));
    });
});
