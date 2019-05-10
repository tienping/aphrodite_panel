import { dataChecking } from 'globalUtils';
import globalScope from 'globalScope';
// import tableSetting from 'utils/globalTableSetting';
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
            extractedData[field.key] = null;
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
        ],
        onSubmit: (scope, GDPActions, data) => {
            if (dataChecking(data, 'product', 'value')) {
                globalScope.socket.associate('default').set({
                    model: 'product',
                    id: parseInt(data.product.value, 0),
                    associate: 'merchant',
                    associate_id: parseInt(data.routeParams.id, 0),
                }).then(() => {
                    NotificationManager.success('Product associate successfully', 'Add product to merchant', 3000, () => {
                        // on click action
                    });
                    // scope.props.dispatch(GDPActions.getListByFeather(tableSetting[scope.props.pageType].getSocketParams({ id: parseInt(data.routeParams.id, 0) })));
                    scope.onCompleting();
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
            { key: 'image', label: 'Product Image Url', type: 'textbox', mandatory: true, doc: { description: '' } },
            { key: 'desc', label: 'Description', type: 'textarea', mandatory: true, doc: { description: '' } },
        ],
        onSubmit: (scope, GDPActions, data) => {
            const extractedData = extractData(data, formSetting.create_test_api_1.fields);

            globalScope.socket.query('product', 'socket2').create(extractedData, { headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'en',
                'token': globalScope.token,
            } })
            .then((response) => {
                NotificationManager.success(JSON.stringify(response), 'Success', 3000, () => {
                    // on click action
                });
                console.log(JSON.stringify(response));
                scope.onCompleting();
            })
            .catch((response) => {
                NotificationManager.error(JSON.stringify(response), 'Error!! (click to dismiss)', 5000, () => {
                    // alert(JSON.stringify(formbutton.fireApiError).replace('\"', '"'));
                });
                console.log(JSON.stringify(response));
            });
        },
    },
};

formSetting.edit_test_api_1 = { ...formSetting.create_test_api_1 };
formSetting.edit_test_api_1.title = 'Edit test_api_1';
formSetting.edit_test_api_1.fields.push({ key: 'id', label: '', type: 'hidden', doc: { description: 'Ignore this, will be inject automatically behind the screen' } });
formSetting.edit_test_api_1.onSubmit = (scope, tableListingActions, data, fields) => {
    const extractedData = extractData(data, fields);

    globalScope.socket.query('product', 'socket2').patch(extractedData.id, extractedData, { headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
        'token': globalScope.token,
    } })
    .then((response) => {
        NotificationManager.success(JSON.stringify(response), 'Success', 3000, () => {
            // on click action
        });
        console.log(JSON.stringify(response));
        scope.onCompleting();
    })
    .catch((response) => {
        NotificationManager.error(JSON.stringify(response), 'Error!! (click to dismiss)', 5000, () => {
            // alert(JSON.stringify(formbutton.fireApiError).replace('\"', '"'));
        });
        console.log(JSON.stringify(response));
    });
};

export default formSetting;

export const formAction = () => {
    const data = {};

    return data;
};
