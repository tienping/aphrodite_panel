import { dataChecking, Events } from 'globalUtils';
import globalScope from 'globalScope';
import * as Feather from 'featherUtils';
// import tableSetting from 'configs/tableSetting';
import { NotificationManager } from 'react-notifications';

const extractData = (data, fields) => {
    const extractedData = {};
    fields.forEach((field) => {
        extractedData[field.key] = data[field.key].value;
        if ((field.type === 'date' || field.type === 'datetime') && dataChecking(data, field.key, 'value')) {
            const dateValue = new Date(data[field.key].value);
            extractedData[field.key] = dateValue.toISOString();
        } else if (field.type === 'textbox' || field.type === 'textbox') {
            extractedData[field.key] = `${data[field.key].value}`;
        } else if (field.type === 'json' || field.type === 'textbox' || field.type === 'image') {
            extractedData[field.key] = data[field.key].value || null;
        } else {
            extractedData[field.key] = data[field.key].value;
        }
    });

    return extractedData;
};

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
            { key: 'product', label: 'Select Product', type: 'textbox', mandatory: true, doc: { description: 'Product to be associate to current merchant' } },
            {
                key: 'product2',
                label: 'Select Product',
                type: 'selection',
                isMulti: true,
                items: [
                    { value: '1', label: 'Normal Member' },
                    { value: '2', label: 'Gold Member' },
                    { value: '3', label: 'Platinum Member' },
                ],
                doc: {
                    description: '',
                },
            },
        ],
        onSubmit: (scope, GDPActions, data, formFields, tableScope) => {
            if (dataChecking(data, 'product', 'value')) {
                Feather.associate({
                    model: 'product',
                    modelId: parseInt(data.product.value, 10),
                    associateModel: 'merchant',
                    associateId: parseInt(data.routeParams.id, 10),
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
    create_test_api_1: {
        title: 'Create New Product',
        // maxFormHeight: '480px',
        fields: [
            { key: 'id', label: 'Product Id', type: 'hidden', mandatory: true, doc: { description: '' } },
            { key: 'code', label: 'Product Code', type: 'textbox', mandatory: true, doc: { description: '' } },
            { key: 'name', label: 'Product Name', type: 'textbox', mandatory: true, doc: { description: '' } },
            { key: 'price', label: 'Product Price', type: 'textbox', mandatory: true, doc: { description: '' } },
            // { key: 'image', label: 'Product Image Url', type: 'textbox', mandatory: true, doc: { description: '' } },
            {
                key: 'image',
                label: 'Product Image',
                type: 'image',
                allowMultiple: false,
                requireBase64: true,
                uploadByFeatherSocket: true,
                doc: { description: 'Product image upload' },
            },
            { key: 'desc', label: 'Description', type: 'textarea', mandatory: true, doc: { description: '' } },
        ],
        onSubmit: (scope, GDPActions, data) => {
            const extractedData = extractData(data, formSetting.create_test_api_1.fields);

            Events.trigger('updateTableState', { stateName: 'globalLoading', value: true });
            globalScope.feather.query('product', 'ordo').create(extractedData, { headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'en',
                'token': globalScope.token,
            } })
            .then((response) => {
                NotificationManager.success(JSON.stringify(response), 'Success', 3000);
                scope.onCompleting();
                Events.trigger('updateTableState', { stateName: 'globalLoading', value: false });
            })
            .catch((response) => {
                NotificationManager.error(JSON.stringify(response), 'Error!! (click to dismiss)', 5000);
                Events.trigger('updateTableState', { stateName: 'globalLoading', value: false });
            });
        },
    },
};

formSetting.edit_test_api_1 = { ...formSetting.create_test_api_1 };
formSetting.edit_test_api_1.title = 'Edit Product';
formSetting.edit_test_api_1.fields.push({ key: 'id', label: '', type: 'hidden', doc: { description: 'Ignore this, will be inject automatically behind the screen' } });
formSetting.edit_test_api_1.onSubmit = (scope, tableListingActions, data, fields) => {
    const extractedData = extractData(data, fields);

    globalScope.feather.query('product', 'ordo').patch(extractedData.id, extractedData, { headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
        'token': globalScope.token,
    } })
    .then((response) => {
        NotificationManager.success(JSON.stringify(response), 'Success', 3000);
        scope.onCompleting();
    })
    .catch((response) => {
        NotificationManager.error(JSON.stringify(response), 'Error!! (click to dismiss)', 5000);
    });
};

export default formSetting;

export const formAction = () => {
    const data = {};

    return data;
};
