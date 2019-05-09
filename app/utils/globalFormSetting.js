import { dataChecking } from 'globalUtils';
import globalScope from 'globalScope';
import tableSetting from 'utils/globalTableSetting';
import { NotificationManager } from 'react-notifications';

// const fieldOnSubmit = (scope, tableListingActions, data, fields, apiUrl, addNewButton) => {
//     const extractedData = {};
//     fields.forEach((field) => {
//         extractedData[field.key] = data[field.key].value;
//         if ((field.type === 'date' || field.type === 'datetime') && dataChecking(data, field.key, 'value')) {
//             const dateValue = new Date(data[field.key].value);
//             extractedData[field.key] = dateValue.toISOString();
//         } else if (field.type === 'textbox' || field.type === 'textbox') {
//             extractedData[field.key] = `${data[field.key].value}`;
//         } else if (field.type === 'json' || field.type === 'textbox' || field.type === 'image') {
//             extractedData[field.key] = null;
//         } else {
//             extractedData[field.key] = data[field.key].value;
//         }
//     });

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
                    scope.props.dispatch(GDPActions.getListByFeather(tableSetting[scope.props.pageType].getSocketParams({ id: parseInt(data.routeParams.id, 0) })));
                    scope.onCompleting();
                });
            }
        },
    },
};

// formSetting.edit_merchant = { ...formSetting.create_merchant_list };
// formSetting.edit_merchant.title = 'Edit Merchant';
// formSetting.edit_merchant.fields.push({ key: 'id', label: '', type: 'hidden', doc: { description: 'Ignore this, will be inject automatically behind the screen' } });
// formSetting.edit_merchant.onSubmit = (scope, tableListingActions, data, fields) => {
//     fieldOnSubmit(scope, tableListingActions, data, fields, `merchant/update/${data.id.value}`, scope.props.formId);
// };

export default formSetting;

export const formAction = () => {
    const data = {};

    return data;
};
