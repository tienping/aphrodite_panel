import globalScope from 'globalScope';
import { devlog, setDataByPath } from 'globalUtils';

export const get = ({ service, socket, query, id, successCallback, failedCallback, mockData, mockDataPath }) => {
    devlog(`Finding [${socket} -> ${service}]`, { query });
    if (globalScope.previewMode) {
        devlog(`MockData [${socket} -> ${service}] mock success`);
        successCallback(setDataByPath(mockData, mockDataPath));
        return true;
    }

    return setTimeout(() => (
        globalScope.feather.query(service, socket).get(id, { query })
            .then((response) => {
                devlog(`Find [${socket} -> ${service}] data success`, { query, response });
                successCallback(response);
            })
            .catch((response) => {
                devlog(`Find [${socket} -> ${service}] data failed`, { query, response });
                failedCallback(response);
            })
    ), 0);
};

export const associate = ({ model, modelId, associateModel, associateId, socket, query, successCallback, failedCallback, mockData, mockDataPath }) => {
    devlog(`Associate [${socket} -> ${associate}:${associateId} to ${model}:${modelId}]`, { query });
    if (globalScope.previewMode) {
        devlog(`MockData [${socket} -> ${associate}:${associateId} to ${model}:${modelId}] mock associate success`);
        successCallback(setDataByPath(mockData, mockDataPath));
        return true;
    }

    return globalScope.feather.associate(socket).set({
        model,
        id: modelId,
        associate: associateModel,
        associate_id: associateId,
    })
        .then((response) => {
            devlog(`Associate [${socket} -> ${associate}:${associateId} to ${model}:${modelId}] success`, { query, response });
            successCallback(response);
        })
        .catch((response) => {
            devlog(`Associate [${socket} -> ${associate}:${associateId} to ${model}:${modelId}] failed`, { query, response });
            failedCallback(response);
        });
};
