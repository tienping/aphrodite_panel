
// import { create } from 'apisauce';
import { globalScope } from 'globalScope';

export function getURLParams(urlparams) {
    const result = {};
    let param = urlparams;
    if (typeof param === 'string') {
        param = param.substr(1).split('&').forEach((str) => {
            const d = str.split('=');
            result[d[0]] = decodeURIComponent(d[1]);
        });
    }

    return result;
}

export function staticErrorResponse(message) {
    return {
        success: false,
        messages: [message],
    };
}

// to convert the  percentage of width to the dp;
// eg: getXdp(50)
export const getXdp = (percent) => `${percent}vw`;
// to convert the  percentage of height to the dp;
// eg: getYdp(50)
export const getYdp = (percent) => `${percent}vw`;

// const addHeaderToAPI = (apiString) => {
//     const api = create({
//         baseURL: apiString,
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept-Language': 'en',
//             'api-version': '1.0.0',
//             // 'app-os-name': Platform.OS,
//         },
//         timeout: 30000,
//     });

//     return api;
// };

// export function apiRequest(path, type, body, url, headerParams) {
//     const apiObject = addHeaderToAPI(url || globalScope.api);
//     return apiObject[type](path, body, headerParams);
// }

export function dataChecking(object) {
    let args = Array.prototype.slice.call(arguments, 1);
    if (args[0].constructor === Array) {
        args = args[0];
    }

    let obj = object;

    for (let i = 0; i < args.length; i += 1) {
        if (!obj || !Object.prototype.hasOwnProperty.call(obj, args[i])) {
            return null;
        }
        obj = obj[args[i]];
    }
    return obj;
}
