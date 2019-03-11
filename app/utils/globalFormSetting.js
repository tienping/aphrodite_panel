import { dataChecking } from 'globalUtils';

const fieldOnSubmit = (scope, tableListingActions, data, fields, apiUrl, addNewButton) => {
    const extractedData = {};
    fields.forEach((field) => {
        if (dataChecking(data, field.key, 'value')) {
            extractedData[field.key] = data[field.key].value;

            if (field.type === 'date') {
                const dateValue = new Date(data[field.key].value);
                extractedData[field.key] = dateValue.toISOString();
            } else if (field.type === 'textbox' || field.type === 'textbox') {
                extractedData[field.key] = `${data[field.key].value}`;
            } else {
                extractedData[field.key] = data[field.key].value;
            }
        }
    });

    if (addNewButton) {
        scope.props.dispatch(tableListingActions.addNewButtonToList(`formButton_${addNewButton}`));
    }
    scope.props.dispatch(tableListingActions.fireApi({
        data: extractedData,
        apiUrl: `https://api-staging.hermo.my/services/gami/${apiUrl}`,
        type: 'post',
    }, scope.props.formId));
};

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
        formHeight: '480px',
        fields: [
            { key: 'name', label: 'Name', type: 'textbox', mandatory: true, doc: { description: 'Partner name' } },
            // { key: 'logo', label: 'Logo', type: 'image', doc: { description: 'Logo of partner vendor branding symbol' } },
            { key: 'description', label: 'Description', type: 'textarea', mandatory: true, doc: { description: 'Example: [Food & beverage, Lifestyle, Fashion, Travel, Beauty Products]' } },
            {
                key: 'industry',
                label: 'Industry',
                type: 'selection',
                items: [
                    { value: 'Food & Beverage', label: 'Food & Beverage' },
                    { value: 'Lifestyle', label: 'Lifestyle' },
                    { value: 'Fashion', label: 'Fashion' },
                    { value: 'Travel', label: 'Travel' },
                    { value: 'Beauty Products', label: 'Beauty Products' },
                ],
                doc: { description: 'Example: [Food & beverage, Lifestyle, Fashion, Travel, Beauty Products]' },
            },
            {
                key: 'code_type',
                label: 'Code Type',
                type: 'selection',
                isMulti: false,
                mandatory: true,
                items: [
                    { value: 'text', label: 'Text Only' },
                    { value: 'barcode', label: 'With Barcode' },
                    { value: 'qrcode', label: 'With QR Code' },
                ],
                closeMenuOnSelect: false,
                // itemApi: '/postgres/menu',
                // itemDataPath: ['result'],
                // itemKey: 'menuList',
                // itemDataValuePath: ['menu_name'],
                doc: {
                    description: 'The ways unique code of vouchers displayed under this partner [text only, barcode or QR code]',
                },
            },
            { key: 'url', label: 'Url to partner site', type: 'textbox', doc: { description: 'URL link to partner vendor official site (if any)' } },
            { key: 'status', label: 'Status', type: 'boolean', default: false, doc: { description: 'desc' } },
        ],
        onSubmit: (scope, tableListingActions, data, fields) => {
            fieldOnSubmit(scope, tableListingActions, data, fields, 'partners');
        },
    },
    create_pevent: {
        title: 'Create Partner\'s Event',
        formHeight: '555px',
        fields: [
            { key: 'name', label: 'Name', type: 'textbox', mandatory: true, doc: { description: 'Name or label for the promotion' } },
            { key: 'partner', label: 'Partner\'s ID', type: 'textbox', mandatory: true, doc: { description: 'The ID of corresponding partner vendor' } },
            // {
            //     key: 'partner',
            //     label: 'Partner\'s ID',
            //     type: 'selection',
            //     items: [
            //         { value: 'text', label: 'Text Only' },
            //         { value: 'barcode', label: 'With Barcode' },
            //         { value: 'qrcode', label: 'With QR Code' },
            //     ],
            //     mandatory: true,
            //     doc: {
            //         description: 'The ID of corresponding partner vendor'
            //     },
            // },
            { key: 'remark', label: 'Remark', type: 'textarea', mandatory: true, doc: { description: 'Event description' } },
            { key: 'tnc_text', label: 'TNC Text', type: 'textarea', mandatory: true, doc: { description: 'Terms and condition in html format' } },
            { key: 'url', label: 'Url', type: 'textbox', doc: { description: 'URL link to more info about this redemption promotion (if any)' } },
            { key: 'limit_by_user', label: 'Limit per user', type: 'textbox', mandatory: true, doc: { description: 'Maximun number of which each user can redempt' } },
            { key: 'start_date', label: 'Start Date', type: 'date', doc: { description: 'The start of the exchangeble period' } },
            { key: 'end_date', label: 'End Date', type: 'date', doc: { description: 'The end of the exchangeble period' } },
            {
                key: 'min_user_level',
                label: 'Min User Level',
                type: 'selection',
                items: [
                    { value: '1', label: 'Normal Member' },
                    { value: '2', label: 'Gold Member' },
                    { value: '3', label: 'Platinum Member' },
                ],
                doc: {
                    description: 'Minimun requirement for user to redempt target voucher',
                },
            },
            {
                key: 'max_user_level',
                label: 'Max User Level',
                type: 'selection',
                items: [
                    { value: '3', label: 'Platinum Member' },
                    { value: '2', label: 'Gold Member' },
                    { value: '999', label: 'Normal Member' },
                ],
                doc: {
                    description: 'Minimun user level allowed for user to redempt target voucher',
                },
            },
            { key: 'amount', label: 'Amount', type: 'textbox', mandatory: true, doc: { description: 'The cost of each voucher undert this one' } },
        ],
        onSubmit: (scope, tableListingActions, data, fields) => {
            fieldOnSubmit(scope, tableListingActions, data, fields, 'rewards/partners');
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
            fieldOnSubmit(scope, tableListingActions, data, fields, 'vouchers/partners');
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
            fieldOnSubmit(scope, tableListingActions, data, fields, 'rewards/locals');
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
                    description: 'CSV file (with .csv extension) with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
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
                    description: 'CSV file (with .csv extension) with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
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
                    description: 'CSV file (with .csv extension) with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
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
                    description: 'CSV file (with .csv extension) with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
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
formSetting.edit_partner.title = 'Edit Partner';
formSetting.edit_partner.fields.push({ key: 'id', label: '', type: 'hidden', doc: { description: 'Ignore this, will be inject automatically behind the screen' } });
formSetting.edit_partner.onSubmit = (scope, tableListingActions, data, fields) => {
    fieldOnSubmit(scope, tableListingActions, data, fields, `partners/update/${data.id.value}`, scope.props.formId);
};

formSetting.edit_pevent = { ...formSetting.create_pevent };
formSetting.edit_pevent.title = 'Edit Partner\'s Event';
formSetting.edit_pevent.fields.push({ key: 'id', label: '', type: 'hidden', doc: { description: 'Ignore this, will be inject automatically behind the screen' } });
formSetting.edit_pevent.onSubmit = (scope, tableListingActions, data, fields) => {
    fieldOnSubmit(scope, tableListingActions, data, fields, `rewards/partners/update/${data.id.value}`, scope.props.formId);
};

formSetting.edit_voucher = { ...formSetting.create_voucher };
formSetting.edit_voucher.title = 'Edit Partner Voucher';
formSetting.edit_voucher.fields.push({ key: 'id', label: '', type: 'hidden', doc: { description: 'Ignore this, will be inject automatically behind the screen' } });
formSetting.edit_voucher.onSubmit = (scope, tableListingActions, data, fields) => {
    fieldOnSubmit(scope, tableListingActions, data, fields, `vouchers/partners/update/${data.id.value}`, scope.props.formId);
};

formSetting.edit_levent = { ...formSetting.create_levent };
formSetting.edit_levent.title = 'Edit Local Event';
formSetting.edit_levent.fields.push({ key: 'id', label: '', type: 'hidden', doc: { description: 'Ignore this, will be inject automatically behind the screen' } });
formSetting.edit_levent.onSubmit = (scope, tableListingActions, data, fields) => {
    fieldOnSubmit(scope, tableListingActions, data, fields, `rewards/locals/update/${data.id.value}`, scope.props.formId);
};

export default formSetting;

export const formAction = () => {
    const data = {};

    return data;
};
