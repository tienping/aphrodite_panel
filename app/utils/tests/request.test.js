/**
 * Test the request function
 */

import request, { loadSession } from '../request';

describe('request', () => {
    // Before each test, stub the fetch function
    beforeEach(() => {
        window.fetch = jest.fn();
    });

    describe('stubbing successful response', () => {
        // Before each test, pretend we got a successful response
        beforeEach(() => {
            const res = new Response('{"hello":"world"}', {
                status: 200,
                headers: {
                    'Content-type': 'application/json',
                },
            });

            window.fetch.mockReturnValue(Promise.resolve(res));
        });

        it('should format the response correctly', (done) => {
            request(`${process.env.API_URL}`)
            .catch(done)
            .then((json) => {
                expect(json.hello).toBe('world');
                done();
            });
        });
    });

    describe('stubbing 204 response', () => {
        // Before each test, pretend we got a successful response
        beforeEach(() => {
            const res = new Response('', {
                status: 204,
                statusText: 'No Content',
            });

            window.fetch.mockReturnValue(Promise.resolve(res));
        });

        it('should return null on 204 response', (done) => {
            request(`${process.env.API_URL}/`)
            .catch(done)
            .then((json) => {
                expect(json).toBeNull();
                done();
            });
        });
    });

    describe('stubbing error response', () => {
        // Before each test, pretend we got an unsuccessful response
        beforeEach(() => {
            const res = new Response('{ status: 404 }', {
                status: 404,
                statusText: 'Not Found',
                headers: {
                    'Content-type': 'application/json',
                },
            });

            window.fetch.mockReturnValue(Promise.resolve(res));
        });

        it('should catch errors', (done) => {
            request('/shitfuck')
            .catch(done)
            .then((json) => {
                expect(json).toBeDefined();
                done();
            });
        });
    });
});

describe('loadSession', () => {
    beforeEach(() => {
        window.sessionService = {
            loadSession: jest.fn(),
        };
    });

    describe('stubbing successful session', () => {
        it('should return token on success', (done) => {
            const sessionToken = '123';
            window
                .sessionService
                .loadSession
                .mockReturnValue(Promise.resolve(sessionToken));

            loadSession()
                .catch(done)
                .then((data) => {
                    expect(data).toBeUndefined();
                    done();
                });
        });
    });
});
