
import {
    fetchMall,
    fetchMallSuccess,
    fetchMallFailed,
} from '../actions';
import {
    FETCH_MALL,
    FETCH_MALL_SUCCESS,
    FETCH_MALL_FAILED,
} from '../constants';

describe('MallPage actions', () => {
    describe('Fetch mall action', () => {
        it('has a type of FETCH_MALL', () => {
            const expected = {
                type: FETCH_MALL,
            };
            expect(fetchMall()).toEqual(expected);
        });
    });
    describe('Fetch mall success action', () => {
        it('has a type of FETCH_MALL_SUCCESS', () => {
            const expected = {
                type: FETCH_MALL_SUCCESS,
            };
            expect(fetchMallSuccess()).toEqual(expected);
        });
    });
    describe('Fetch mall failed action', () => {
        it('has a type of FETCH_MALL_FAILED', () => {
            const expected = {
                type: FETCH_MALL_FAILED,
            };
            expect(fetchMallFailed()).toEqual(expected);
        });
    });
});
