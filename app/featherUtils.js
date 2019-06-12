import globalScope from 'globalScope';
import { devlog, setDataByPath, dataChecking } from 'globalUtils';

export const get = ({ dataSet, service, socket, query, id, successCallback, failedCallback, mockData, mockDataPath }) => {
    devlog(`Get [${socket} -> ${service}] initiating`, { query });
    if (globalScope.previewMode && mockData) {
        const response = setDataByPath(mockData, mockDataPath);
        globalScope[`${socket}_${service}_${dataSet || 'nokey'}`] = response;
        devlog(`MockData [${socket} -> ${service}] mock get success`);
        if (successCallback) {
            successCallback(response);
        }
        return response;
    }

    return setTimeout(() => (
        globalScope.feather.query(service, socket).get(id, { query })
            .then((response) => {
                devlog(`Get [${socket} -> ${service}] get data success`, { query, response });
                if (successCallback) {
                    successCallback(response);
                }
            })
            .catch((response) => {
                devlog(`Get [${socket} -> ${service}] get data failed`, { query, response });
                failedCallback(response);
            })
    ), 0);
};

export const find = ({ dataSet, service, socket, query, successCallback, failedCallback, mockData, mockDataPath }) => {
    devlog(`Find [${socket} -> ${service}] initiating`, { query });
    if (globalScope.previewMode && mockData) {
        const response = setDataByPath(mockData, mockDataPath);
        globalScope[`${socket}_${service}_${dataSet || 'nokey'}`] = response;
        devlog(`MockData [${socket} -> ${service}] mock find success`);
        if (successCallback) {
            successCallback(response);
        }

        return new Promise((res) => {
            setTimeout(() => res(response), 0);
        });
    }

    return globalScope.feather.query(service, socket).find(query)
        .then((response) => {
            devlog(`Find [${socket} -> ${service}] find data success`, { query, response });
            if (successCallback) {
                successCallback(response);
            }
        })
        .catch((response) => {
            devlog(`Find [${socket} -> ${service}] find data failed`, { query, response });
            failedCallback(response);
        });

    // return setTimeout(() => (

    // ), 0);
};

export const action = ({ dataSet, service, modelId, query, socket, successCallback, failedCallback, mockData }) => {
    devlog(`Action ${query.type} [${socket} -> ${service}:${modelId}] initiating`);
    if (globalScope.previewMode && mockData) {
        const response = null;
        if (mockData) {
            const arr = dataChecking(globalScope, `${socket}_${service}_${dataSet || 'nokey'}`, 'data');
            if (mockData.type === 'add') {
                arr.unshift(mockData.item);
                globalScope[`${socket}_${service}_${dataSet || 'nokey'}`].total += 1;
            } else if (mockData.type === 'remove') {
                arr.splice(arr.findIndex((value) => (value.id === mockData.item.id)), 1);
                globalScope[`${socket}_${service}_${dataSet || 'nokey'}`].total -= 1;
            }
        }
        devlog(`MockData ${query.type} [${socket} -> ${service}:${modelId}] mock action success`);
        if (successCallback) {
            successCallback(response);
        }
        return response;
    }

    return globalScope.feather.query(service, socket).action(modelId, query).then((response) => {
        devlog(`Action ${query.type} [${socket} -> ${service}:${modelId}] success`, { response });
        if (successCallback) {
            successCallback(response);
        }
    })
    .catch((response) => {
        devlog(`Action ${query.type} [${socket} -> ${query.id} to ${service}:${modelId}] failed`, { response });
        if (failedCallback) {
            failedCallback(response);
        }
    });
};
