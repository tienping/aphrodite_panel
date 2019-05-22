import globalScope from 'globalScope';
import { devlog, setDataByPath, dataChecking } from 'globalUtils';

export const get = ({ service, socket, query, id, successCallback, failedCallback, mockData, mockDataPath }) => {
    devlog(`Get [${socket} -> ${service}] initiating`, { query });
    if (globalScope.previewMode) {
        const response = setDataByPath(mockData, mockDataPath);
        globalScope[`${socket}_${service}`] = response;
        devlog(`MockData [${socket} -> ${service}] mock get success`);
        successCallback(response);
        return response;
    }

    return setTimeout(() => (
        globalScope.feather.query(service, socket).get(id, { query })
            .then((response) => {
                devlog(`Get [${socket} -> ${service}] get data success`, { query, response });
                successCallback(response);
            })
            .catch((response) => {
                devlog(`Get [${socket} -> ${service}] get data failed`, { query, response });
                failedCallback(response);
            })
    ), 0);
};

export const find = ({ service, socket, query, successCallback, failedCallback, mockData, mockDataPath }) => {
    devlog(`Find [${socket} -> ${service}] initiating`, { query });
    if (globalScope.previewMode) {
        const response = setDataByPath(mockData, mockDataPath);
        globalScope[`${socket}_${service}`] = response;
        devlog(`MockData [${socket} -> ${service}] mock find success`);
        successCallback(response);
        return response;
    }

    return setTimeout(() => (
        globalScope.feather.query(service, socket).find(query)
            .then((response) => {
                devlog(`Find [${socket} -> ${service}] find data success`, { query, response });
                successCallback(response);
            })
            .catch((response) => {
                devlog(`Find [${socket} -> ${service}] find data failed`, { query, response });
                failedCallback(response);
            })
    ), 0);
};

export const associate = ({ model, modelId, associateModel, associateId, socket, successCallback, failedCallback, mockData }) => {
    devlog(`Associate [${socket} -> ${associateModel}:${associateId} to ${model}:${modelId}] initiating`);
    if (globalScope.previewMode) {
        const response = null;
        if (mockData) {
            const arr = dataChecking(globalScope, `${socket}_${model}`, 'data');
            if (mockData.type === 'add') {
                arr.unshift(mockData.item);
                globalScope[`${socket}_${model}`].total += 1;
            } else if (mockData.type === 'remove') {
                arr.splice(arr.findIndex((value) => (value.id === mockData.item.id)), 1);
                globalScope[`${socket}_${model}`].total -= 1;
            }
        }
        devlog(`MockData [${socket} -> ${associateModel}:${associateId} to ${model}:${modelId}] mock associate success`);
        successCallback(response);
        return response;
    }

    return globalScope.feather.associate(socket).set({
        model,
        id: modelId,
        associate: associateModel,
        associate_id: associateId,
    })
        .then((response) => {
            devlog(`Associate [${socket} -> ${associateModel}:${associateId} to ${model}:${modelId}] success`, { response });
            if (successCallback) {
                successCallback(response);
            }
        })
        .catch((response) => {
            devlog(`Associate [${socket} -> ${associateModel}:${associateId} to ${model}:${modelId}] failed`, { response });
            if (failedCallback) {
                failedCallback(response);
            }
        });
};
