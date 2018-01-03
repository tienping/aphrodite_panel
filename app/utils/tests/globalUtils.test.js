/**
 * Test injectors
 */

import {
    getURLParams,
    staticErrorResponse,
} from '../globalUtils';

describe('getURLParams', () => {
    it('should return object based on URL String passed', () => {
        const string = '?page=2&shit=3';
        const expected = getURLParams(string);
        expect(expected).toEqual({
            page: '2',
            shit: '3',
        });
    });

    it('should return empty object if argument is not a string', () => {
        const string = true;
        const expected = getURLParams(string);
        expect(expected).toEqual({});
    });
});

describe('staticErrorResponse()', () => {
    it('should return message passed into messages array', () => {
        const message = { text: 'Testing error' };
        const mock = {
            success: false,
            messages: [message],
        };
        expect(staticErrorResponse(message)).toEqual(mock);
    });
});
