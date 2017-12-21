import 'whatwg-fetch';
import { sessionService } from 'redux-react-session';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
        return null;
    }

    try {
        return response.json();
    } catch (e) {
        return {
            success: false,
            messages: [{
                text: 'Please check your internet connection',
            }],
        };
    }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
    return fetch(url, options)
        .then(parseJSON)
        .catch(parseJSON);
}

export function loadSession() {
    return sessionService.loadSession()
        .then((data) => (data));
        // Catch was removed here
        // it should be
        // .catch((err) => {
        //     throw err;
        // });
}
