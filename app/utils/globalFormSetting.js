import { dataChecking } from 'globalUtils';

const formSetting = {
    // sysvar: {
    //     title: 'System Variable',
    //     formHeight: '430px',
    //     fields: [
    //         { key: 'key', label: 'Key', type: 'textbox', placeholder: 'Key of variable', mandatory: true, doc: { description: 'desc' } },
    //         { key: 'category', label: 'Category', type: 'textbox', placeholder: 'Category', doc: { description: 'desc' } },
    //         { key: 'start', label: 'Start Date', type: 'date', placeholder: 'Start date', doc: { description: 'desc' } },
    //         { key: 'end', label: 'End Date', type: 'date', placeholder: 'End date', doc: { description: 'desc' } },
    //         { key: 'value', label: 'Value', type: 'textbox', placeholder: 'JSON object value', doc: { description: 'desc' } },
    //     ],
    // },
    create_partner: {
        title: 'Create Partner',
        formHeight: '460px',
        fields: [
            { key: 'name', label: 'Name', type: 'textbox', mandatory: true, doc: { description: 'Partner name' } },
            // { key: 'logo', label: 'Logo', type: 'image', doc: { description: 'Logo of partner vendor branding symbol' } },
            { key: 'description', label: 'Description', type: 'textarea', mandatory: true, doc: { description: 'Example: [Food & beverage, Lifestyle, Fashion, Travel, Beauty Products]' } },
            { key: 'code_type', label: 'Code Type', type: 'dropdown', mandatory: true, doc: { description: 'The ways unique code of vouchers displayed under this partner [text only, barcode or QR code]' } },
            { key: 'status', label: 'Status', type: 'boolean', default: false, doc: { description: 'desc' } },
            { key: 'industry', label: 'Industry', type: 'textbox', doc: { description: 'Example: [Food & beverage, Lifestyle, Fashion, Travel, Beauty Products]' } },
            { key: 'url', label: 'Url to partner site', type: 'textbox', doc: { description: 'URL link to partner vendor official site (if any)' } },
        ],
        onSubmit: (scope, tableListingActions, data, fields) => {
            const extractedData = {};
            fields.forEach((field) => {
                extractedData[field.key] = dataChecking(data, field.key, 'value') || null;
            });

            scope.props.dispatch(tableListingActions.fireApi({
                data: extractedData,
                apiUrl: 'https://api-staging.hermo.my/services/gami/partners',
                type: 'post',
            }, scope.props.formId));
        },
    },
    create_pevent: {
        title: 'Create Partner Event',
        formHeight: '555px',
        fields: [
            { key: 'name', label: 'Name', type: 'textbox', mandatory: true, doc: { description: 'Name or label for the promotion' } },
            { key: 'partner', label: 'Partner\'s ID', type: 'dropdown', mandatory: true, doc: { description: 'The ID of corresponding partner vendor' } },
            { key: 'remark', label: 'Remark', type: 'textarea', mandatory: true, doc: { description: 'Event description' } },
            { key: 'tnc_text', label: 'TNC Text', type: 'textarea', mandatory: true, doc: { description: 'Terms and condition in html format' } },
            { key: 'url', label: 'Url', type: 'textbox', doc: { description: 'URL link to more info about this redemption promotion (if any)' } },
            { key: 'limit_by_user', label: 'Limit per user', type: 'textbox', mandatory: true, doc: { description: 'Maximun number of which each user can redempt' } },
            { key: 'start_date', label: 'Start Date', type: 'date', doc: { description: 'The start of the exchangeble period' } },
            { key: 'end_date', label: 'End Date', type: 'date', doc: { description: 'The end of the exchangeble period' } },
            { key: 'min_user_level', label: 'Min User Level', type: 'dropdown', doc: { description: 'Minimun requirement for user to redempt target voucher' } },
            { key: 'max_user_level', label: 'Max User Level', type: 'dropdown', doc: { description: 'Minimun user level allowed for user to redempt target voucher' } },
            { key: 'amount', label: 'Amount', type: 'textbox', mandatory: true, doc: { description: 'The cost of each voucher undert this one' } },
        ],
        onSubmit: (scope, tableListingActions, data, fields) => {
            const extractedData = {};
            fields.forEach((field) => {
                extractedData[field.key] = dataChecking(data, field.key, 'value') || null;
            });

            scope.props.dispatch(tableListingActions.fireApi({
                data: extractedData,
                apiUrl: 'https://api-staging.hermo.my/services/gami/rewards/partners',
                type: 'post',
            }, scope.props.formId));
        },
    },
    create_voucher: {
        title: 'Create Partner Voucher',
        formHeight: '363px',
        fields: [
            { key: 'code', label: 'Unique Code', type: 'textbox', mandatory: true, doc: { description: 'Method the unique displayed [text only, barcode or QR code]' } },
            { key: 'event_id', label: 'Event\'s ID', type: 'textbox', mandatory: true, doc: { description: 'ID of the parent Partner Event' } },
            { key: 'start_date', label: 'Start Date', type: 'date', mandatory: true, doc: { description: 'The date which voucher can start to be use' } },
            { key: 'end_date', label: 'End Date', type: 'date', mandatory: true, doc: { description: 'The date voucher get expired' } },
        ],
        onSubmit: (scope, tableListingActions, data, fields) => {
            const extractedData = {};
            fields.forEach((field) => {
                extractedData[field.key] = dataChecking(data, field.key, 'value') || null;
            });

            scope.props.dispatch(tableListingActions.fireApi({
                data: extractedData,
                apiUrl: 'https://api-staging.hermo.my/services/gami/vouchers/partners',
                type: 'post',
            }, scope.props.formId));
        },
    },
    create_levent: {
        title: 'Create Local Event, fields',
        formHeight: '363px',
        fields: [
            { key: 'amount', label: 'Amount', type: 'textbox', doc: { description: 'Amount used to redempt this voucher' } },
            { key: 'name', label: 'Name', type: 'textbox', doc: { description: 'Name of this voucher' } },
            { key: 'start_date', label: 'Start Date', type: 'date', doc: { description: 'The start of the exchangeble period' } },
            { key: 'end_date', label: 'End Date', type: 'date', doc: { description: 'The end of the exchangeble period' } },
            { key: 'model_id', label: 'Model Id', type: 'textbox', doc: { description: 'Unique ID of the modal created in hermint' } },
        ],
        onSubmit: (scope, tableListingActions, data, fields) => {
            const extractedData = {};
            fields.forEach((field) => {
                extractedData[field.key] = dataChecking(data, field.key, 'value') || null;
            });

            scope.props.dispatch(tableListingActions.fireApi({
                data: extractedData,
                apiUrl: 'https://api-staging.hermo.my/services/gami/rewards/locals',
                type: 'post',
            }, scope.props.formId));
        },
    },
    upload_partner: {
        title: 'Upload Partners',
        formHeight: '355px',
        fields: [
            {
                key: 'file',
                label: 'File',
                type: 'file',
                sample: {
                    name: 'Sample for partner',
                    url: 'https://api-staging.hermo.my/services/gami/downloadfile/partner',
                },
                doc: {
                    description: 'CSV file with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
                },
            },
        ],
        onSubmit: (scope, tableListingActions, data) => {
            scope.props.dispatch(tableListingActions.fireApi({
                data: data.file.form,
                apiUrl: 'https://api-staging.hermo.my/services/gami/uploadcsv/partner',
                type: 'post',
            }, scope.props.formId));
        },
    },
    upload_pevent: {
        title: 'Upload Partner Event',
        formHeight: '355px',
        fields: [
            {
                key: 'file',
                label: 'File',
                type: 'file',
                sample: {
                    name: 'Sample for reward',
                    url: 'https://api-staging.hermo.my/services/gami/downloadfile/partner_event',
                },
                doc: {
                    description: 'CSV file with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
                },
            },
        ],
        onSubmit: (scope, tableListingActions, data) => {
            scope.props.dispatch(tableListingActions.fireApi({
                data: data.file.form,
                apiUrl: 'https://api-staging.hermo.my/services/gami/uploadcsv/partner_event',
                type: 'post',
            }, scope.props.formId));
        },
    },
    upload_voucher: {
        title: 'Upload Voucher',
        formHeight: '355px',
        fields: [
            {
                key: 'file',
                label: 'File',
                type: 'file',
                sample: {
                    name: 'Sample for voucher',
                    url: 'https://api-staging.hermo.my/services/gami/downloadfile/voucher',
                },
                doc: {
                    description: 'CSV file with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
                },
            },
        ],
        onSubmit: (scope, tableListingActions, data) => {
            scope.props.dispatch(tableListingActions.fireApi({
                data: data.file.form,
                apiUrl: 'https://api-staging.hermo.my/services/gami/uploadcsv/voucher',
                type: 'post',
            }, scope.props.formId));
        },
    },
    upload_levent: {
        title: 'Upload Local Event',
        formHeight: '355px',
        fields: [
            {
                key: 'file',
                label: 'File',
                type: 'file',
                sample: {
                    name: 'Sample for reward',
                    url: 'https://api-staging.hermo.my/services/gami/downloadfile/local_event',
                },
                doc: {
                    description: 'CSV file with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
                },
            },
        ],
        onSubmit: (scope, tableListingActions, data) => {
            scope.props.dispatch(tableListingActions.fireApi({
                data: data.file.form,
                apiUrl: 'https://api-staging.hermo.my/services/gami/uploadcsv/local_event',
                type: 'post',
            }, scope.props.formId));
        },
    },
};

formSetting.edit_partner = { ...formSetting.create_partner };
formSetting.edit_partner.fields.push({ key: 'id', label: '', type: 'hidden' });
formSetting.edit_partner.onSubmit = (scope, tableListingActions, data, fields) => {
    const extractedData = {};
    fields.forEach((field) => {
        extractedData[field.key] = dataChecking(data, field.key, 'value') || null;
    });

    scope.props.dispatch(tableListingActions.addNewButtonToList(`formButton_${scope.props.formId}`));
    scope.props.dispatch(tableListingActions.fireApi({
        data: extractedData,
        apiUrl: `https://api-staging.hermo.my/services/gami/partners/update/${extractedData.id}`,
        type: 'post',
    }, scope.props.formId));
};

formSetting.edit_pevent = { ...formSetting.create_pevent };
formSetting.edit_pevent.fields.push({ key: 'id', label: '', type: 'hidden' });
formSetting.edit_pevent.onSubmit = (scope, tableListingActions, data, fields) => {
    const extractedData = {};
    fields.forEach((field) => {
        const value = dataChecking(data, field.key, 'value') || null;
        extractedData[field.key] = field.type === 'textbox' ? `${value}` : value;
    });

    scope.props.dispatch(tableListingActions.addNewButtonToList(`formButton_${scope.props.formId}`));
    scope.props.dispatch(tableListingActions.fireApi({
        data: extractedData,
        apiUrl: `https://api-staging.hermo.my/services/gami/rewards/partners/update/${extractedData.id}`,
        type: 'post',
    }, scope.props.formId));
};

formSetting.edit_voucher = { ...formSetting.create_voucher };
formSetting.edit_voucher.fields.push({ key: 'id', label: '', type: 'hidden' });
formSetting.edit_voucher.onSubmit = (scope, tableListingActions, data, fields) => {
    const extractedData = {};
    fields.forEach((field) => {
        const value = dataChecking(data, field.key, 'value') || null;
        extractedData[field.key] = field.type === 'textbox' ? `${value}` : value;
    });

    scope.props.dispatch(tableListingActions.addNewButtonToList(`formButton_${scope.props.formId}`));
    scope.props.dispatch(tableListingActions.fireApi({
        data: extractedData,
        apiUrl: `https://api-staging.hermo.my/services/gami/vouchers/partners/update/${extractedData.id}`,
        type: 'post',
    }, scope.props.formId));
};

formSetting.edit_levent = { ...formSetting.create_levent };
formSetting.edit_levent.fields.push({ key: 'id', label: '', type: 'hidden' });
formSetting.edit_levent.onSubmit = (scope, tableListingActions, data, fields) => {
    const extractedData = {};
    fields.forEach((field) => {
        const value = dataChecking(data, field.key, 'value') || null;
        extractedData[field.key] = (field.type === 'textbox' || field.type === 'textbox') ? `${value}` : value;
    });

    scope.props.dispatch(tableListingActions.addNewButtonToList(`formButton_${scope.props.formId}`));
    scope.props.dispatch(tableListingActions.fireApi({
        data: extractedData,
        apiUrl: `https://api-staging.hermo.my/services/gami/rewards/locals/update/${extractedData.id}`,
        type: 'post',
    }, scope.props.formId));
};

export default formSetting;

export const formAction = () => {
    const data = {};

    return data;
};
