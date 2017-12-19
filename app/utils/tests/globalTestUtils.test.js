/**
 * Test injectors
 */

import {
    getURLParams,
    staticErrorResponse,
} from '../globalTestUtils';

describe('getURLParams', () => {
    it('should return object based on URL String passed', () => {
        const string = '?page=2&shit=3';
        const expected = getURLParams(string);
        expect(expected).toEqual({
            page: '2',
            shit: '3',
        });
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
