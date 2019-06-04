import { dataChecking } from 'globalUtils';
// import globalScope from 'globalScope';
import * as Feather from 'featherUtils';
// import tableSetting from 'configs/tableSetting';
import { NotificationManager } from 'react-notifications';

// const extractData = (data, fields) => {
//     const extractedData = {};
//     fields.forEach((field) => {
//         extractedData[field.key] = data[field.key].value;
//         if ((field.type === 'date' || field.type === 'datetime') && dataChecking(data, field.key, 'value')) {
//             const dateValue = new Date(data[field.key].value);
//             extractedData[field.key] = dateValue.toISOString();
//         } else if (field.type === 'textbox' || field.type === 'textbox') {
//             extractedData[field.key] = `${data[field.key].value}`;
//         } else if (field.type === 'json' || field.type === 'textbox' || field.type === 'image') {
//             extractedData[field.key] = data[field.key].value || null;
//         } else {
//             extractedData[field.key] = data[field.key].value;
//         }
//     });

//     return extractedData;
// };

// const fieldOnSubmit = (scope, tableListingActions, data, fields, apiUrl, addNewButton) => {
//     const extractedData = extractData(data, fields);

//     if (addNewButton) {
//         scope.props.dispatch(tableListingActions.addNewButtonToList(`formButton_${addNewButton}`));
//     }
//     scope.props.dispatch(tableListingActions.fireApi({
//         data: extractedData,
//         apiUrl: `http://aphrodite.alpha.hermo.my/${apiUrl}`,
//         type: 'post',
//     }, scope.props.formId));
// };

const formSetting = {
    create_product: {
        title: 'Associate New Product',
        // maxFormHeight: '480px',
        fields: [
            {
                key: 'product',
                label: 'Select Product',
                type: 'selection',
                listenSocket: true,
                getSocketParams: () => ({
                    dataSet: 'product_selection',
                    service: 'merchant',
                    targetSocket: 'aphrodite',
                    options: {
                        query: {},
                    },
                }),
                itemDataPath: ['data'],
                itemDataValuePath: ['id'],
                itemDataLabelPath: ['name'],
                mockData: {
                    data: [
                        { id: 8881, name: 'zaxCC SPF 30 PA++ 45g', image_320_200: '', merchant_id: 'mock' },
                        { id: 8882, name: 'zaxCC Watery Cream 80ml', image_320_200: '', merchant_id: 'mock' },
                        { id: 8883, name: 'zaxCC 80% Emulsion 160ml', image_320_200: '', merchant_id: 'mock' },
                        { id: 8884, name: 'zaxCC Moisture Sleeping Pack 100ml', image_320_200: '', merchant_id: 'mock' },
                        { id: 8885, name: 'zaxCC% Toner 160ml', image_320_200: '', merchant_id: 'mock' },
                        { id: 8886, name: 'zaxCC Watery Cream 80ml', image_320_200: '', merchant_id: 'mock' },
                        { id: 8887, name: 'zaxCCCleansing Oil 200ml', image_320_200: '', merchant_id: 'mock' },
                        { id: 88811, name: 'tax SPF 30 PA++ 45g', image_320_200: '', merchant_id: 'mock' },
                        { id: 88812, name: 'tax Watery Cream 80ml', image_320_200: '', merchant_id: 'mock' },
                        { id: 88813, name: 'tax 80% Emulsion 160ml', image_320_200: '', merchant_id: 'mock' },
                        { id: 88814, name: 'tax Moisture Sleeping Pack 100ml', image_320_200: '', merchant_id: 'mock' },
                        { id: 88815, name: 'tax% Toner 160ml', image_320_200: '', merchant_id: 'mock' },
                    ],
                    limit: 12,
                    skip: 0,
                    total: 7,
                },
                // isMulti: true,
                // items: [
                //     { value: '1', label: 'Normal Member' },
                //     { value: '2', label: 'Gold Member' },
                //     { value: '3', label: 'Platinum Member' },
                // ],
                doc: {
                    description: '',
                },
            },
        ],
        onSubmit: (scope, GDPActions, data, formFields, tableScope) => {
            if (dataChecking(data, 'product', 'value')) {
                Feather.action({
                    dataSet: 'product',
                    service: 'product',
                    modelId: parseInt(data.product.value, 10),
                    query: {
                        type: 'SET_MERCHANT',
                        id: parseInt(data.routeParams.id, 10),
                    },
                    socket: 'aphrodite',
                    successCallback: () => {
                        tableScope.getFeatherQuery();
                        NotificationManager.success('Product associate successfully', 'Add product to merchant', 3000, () => {
                            // on click action
                        });
                        // scope.props.dispatch(GDPActions.getListByFeather(tableSetting[scope.props.pageType].getSocketParams({ id: parseInt(data.routeParams.id, 10) })));
                        scope.onCompleting();
                    },
                    mockData: {
                        type: 'add',
                        item: {
                            id: parseInt(data.product.value, 10),
                            name: 'Mock up product',
                            image_320_200: 'mock_up_image.png',
                            merchant_id: parseInt(data.routeParams.id, 10) || data.routeParams.id,
                        },
                    },
                });
            }
        },
    },
};

export default formSetting;

export const formAction = () => {
    const data = {};

    return data;
};
