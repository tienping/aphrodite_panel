import { dataChecking } from 'globalUtils';

const fieldOnSubmit = (scope, tableListingActions, data, fields, apiUrl, addNewButton) => {
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

    if (addNewButton) {
        scope.props.dispatch(tableListingActions.addNewButtonToList(`formButton_${addNewButton}`));
    }
    scope.props.dispatch(tableListingActions.fireApi({
        data: extractedData,
        apiUrl: `http://aphrodite.alpha.hermo.my/${apiUrl}`,
        type: 'post',
    }, scope.props.formId));
};

const formSetting = {
    create_merchant_list: {
        title: 'Create Merchant',
        // maxFormHeight: '480px',
        fields: [
            { key: 'name', label: 'Merchant Name', type: 'textbox', mandatory: true, doc: { description: 'Partner name' } },
            { key: 'logo', label: 'Logo', type: 'image', serverUrl: 'https://api-staging.hermo.my/services/fileman/public?folder=gami/partner_logo', doc: { description: 'Logo of partner vendor branding symbol' } },
            { key: 'status', label: 'Status', type: 'boolean', default: false, doc: { description: 'desc' } },
        ],
        onSubmit: (scope, tableListingActions, data, fields) => {
            fieldOnSubmit(scope, tableListingActions, data, fields, 'merchant');
        },
    },
};

formSetting.edit_merchant = { ...formSetting.create_merchant_list };
formSetting.edit_merchant.title = 'Edit Merchant';
formSetting.edit_merchant.fields.push({ key: 'id', label: '', type: 'hidden', doc: { description: 'Ignore this, will be inject automatically behind the screen' } });
formSetting.edit_merchant.onSubmit = (scope, tableListingActions, data, fields) => {
    fieldOnSubmit(scope, tableListingActions, data, fields, `merchant/update/${data.id.value}`, scope.props.formId);
};

export default formSetting;

export const formAction = () => {
    const data = {};

    return data;
};
