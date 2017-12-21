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
