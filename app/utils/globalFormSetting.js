import { dataChecking } from 'globalUtils';

const formSetting = {
    // sysvar: {
    //     title: 'System Variable',
    //     formHeight: '430px',
    //     fields: [
    //         { key: 'key', label: 'Key', type: 'textfield', placeholder: 'Key of variable', mandatory: true, doc: { description: 'desc' } },
    //         { key: 'category', label: 'Category', type: 'textfield', placeholder: 'Category', doc: { description: 'desc' } },
    //         { key: 'start', label: 'Start Date', type: 'date', placeholder: 'Start date', doc: { description: 'desc' } },
    //         { key: 'end', label: 'End Date', type: 'date', placeholder: 'End date', doc: { description: 'desc' } },
    //         { key: 'value', label: 'Value', type: 'textbox', placeholder: 'JSON object value', doc: { description: 'desc' } },
    //     ],
    // },
    create_partner: {
        title: 'Create Partner',
        formHeight: '550px',
        fields: [
            { key: 'name', label: 'Name', type: 'textfield', mandatory: true, doc: { description: 'Partner name' } },
            // { key: 'logo', label: 'Logo', type: 'image', doc: { description: 'Logo of partner vendor branding symbol' } },
            { key: 'description', label: 'Description', type: 'textbox', mandatory: true, doc: { description: 'Example: [Food & beverage, Lifestyle, Fashion, Travel, Beauty Products]' } },
            { key: 'code_type', label: 'Code Type', type: 'dropdown', mandatory: true, doc: { description: 'The ways unique code of vouchers displayed under this partner [text only, barcode or QR code]' } },
            { key: 'status', label: 'Status', type: 'boolean', default: false, doc: { description: 'desc' } },
            { key: 'industry', label: 'Industry', type: 'textfield', doc: { description: 'Example: [Food & beverage, Lifestyle, Fashion, Travel, Beauty Products]' } },
            { key: 'url', label: 'Url to partner site', type: 'textfield', doc: { description: 'URL link to partner vendor official site (if any)' } },
        ],
        onSubmit: (scope, actions, data, fields) => {
            const params = {};
            fields.forEach((field) => {
                params[field.key] = dataChecking(data, field.key, 'value');
            });

            scope.props.dispatch(actions.fireApi({
                params,
                apiUrl: 'https://api-staging.hermo.my/services/gami/partners',
                type: 'post',
            }));
        },
    },
    create_pevent: {
        title: 'Create Partner Event',
        formHeight: '550px',
        fields: [
            { key: 'name', label: 'Name', type: 'textfield', doc: { description: 'Name or label for the promotion' } },
            { key: 'partner', label: 'Partner', type: 'dropdown', doc: { description: 'The ID of corresponding partner vendor' } },
            { key: 'remarks', label: 'Remarks', type: 'textbox', doc: { description: 'Event description' } },
            { key: 'tnc_text', label: 'TNC Text', type: 'textbox', doc: { description: 'Terms and condition in html format' } },
            { key: 'url', label: 'Url', type: 'textfield', doc: { description: 'URL link to more info about this redemption promotion (if any)' } },
            { key: 'limit_by_user', label: 'Limit per user', type: 'textbox', doc: { description: 'Maximun number of which each user can redempt' } },
            { key: 'start_date', label: 'Start Date', type: 'date', doc: { description: 'The start of the exchangeble period' } },
            { key: 'end_date', label: 'End Date', type: 'date', doc: { description: 'The end of the exchangeble period' } },
            { key: 'min_user_level', label: 'Min User Level', type: 'dropdown', doc: { description: 'Minimun requirement for user to redempt target voucher' } },
            { key: 'max_user_level', label: 'Max User Level', type: 'dropdown', doc: { description: 'Minimun user level allowed for user to redempt target voucher' } },
            { key: 'amount', label: 'Amount', type: 'textbox', doc: { description: 'The cost of each voucher undert this one' } },
        ],
        onSubmit: (scope, actions, data, fields) => {
            const params = {};
            fields.forEach((field) => {
                params[field.key] = dataChecking(data, field.key, 'value');
            });

            scope.props.dispatch(actions.fireApi({
                params,
                apiUrl: 'https://api-staging.hermo.my/services/gami/rewards/partners',
                type: 'post',
            }));
        },
    },
    create_voucher: {
        title: 'Create Partner Voucher',
        formHeight: '385px',
        fields: [
            { key: 'code', label: 'Unique Code', type: 'textfield', doc: { description: 'Method the unique displayed [text only, barcode or QR code]' } },
            { key: 'event_code', label: 'Event Code', type: 'dropdown', doc: { description: 'ID of the parent Partner Event' } },
            { key: 'start_date', label: 'Start Date', type: 'date', doc: { description: 'The date which voucher can start to be use' } },
            { key: 'end_date', label: 'End Date', type: 'date', doc: { description: 'The date voucher get expired' } },
        ],
        onSubmit: (scope, actions, data, fields) => {
            const params = {};
            fields.forEach((field) => {
                params[field.key] = dataChecking(data, field.key, 'value');
            });

            scope.props.dispatch(actions.fireApi({
                params,
                apiUrl: 'https://api-staging.hermo.my/services/gami/vouchers/partners',
                type: 'post',
            }));
        },
    },
    create_levent: {
        title: 'Create Local Event, fields',
        formHeight: '380px',
        fields: [
            { key: 'amount', label: 'Amount', type: 'textbox', doc: { description: 'Amount used to redempt this voucher' } },
            { key: 'start_date', label: 'Start Date', type: 'date', doc: { description: 'The start of the exchangeble period' } },
            { key: 'end_date', label: 'End Date', type: 'date', doc: { description: 'The end of the exchangeble period' } },
            { key: 'modal_id', label: 'Modal Id', type: 'textfield', doc: { description: 'Unique ID of the modal created in hermint' } },
        ],
        onSubmit: (scope, actions, data, fields) => {
            const params = {};
            fields.forEach((field) => {
                params[field.key] = dataChecking(data, field.key, 'value');
            });

            scope.props.dispatch(actions.fireApi({
                params,
                apiUrl: 'https://api-staging.hermo.my/services/gami/rewards/locals',
                type: 'post',
            }));
        },
    },
    upload_partner: {
        title: 'Upload Partners',
        formHeight: '350px',
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
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data: data.file.form,
                apiUrl: 'https://api-staging.hermo.my/services/gami/uploadcsv/partner',
                type: 'post',
            }));
        },
    },
    upload_pevent: {
        title: 'Upload Partner Event',
        formHeight: '350px',
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
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data: data.file.form,
                apiUrl: 'https://api-staging.hermo.my/services/gami/uploadcsv/partner_event',
                type: 'post',
            }));
        },
    },
    upload_voucher: {
        title: 'Upload Voucher',
        formHeight: '350px',
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
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data: data.file.form,
                apiUrl: 'https://api-staging.hermo.my/services/gami/uploadcsv/voucher',
                type: 'post',
            }));
        },
    },
    upload_levent: {
        title: 'Upload Local Event',
        formHeight: '350px',
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
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data: data.file.form,
                apiUrl: 'https://api-staging.hermo.my/services/gami/uploadcsv/local_event',
                type: 'post',
            }));
        },
    },
};
export default formSetting;

export const formAction = () => {
    const data = {};

    return data;
};
