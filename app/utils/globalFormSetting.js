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
            { key: 'name', label: 'Name', type: 'textfield', doc: { description: 'desc' } },
            { key: 'logo', label: 'Logo', type: 'image', doc: { description: 'desc' } },
            { key: 'description', label: 'Description', type: 'textbox', doc: { description: 'desc' } },
            { key: 'code_type', label: 'Code Type', type: 'dropdown', doc: { description: 'desc' } },
            { key: 'status', label: 'Status', type: 'boolean', default: false, doc: { description: 'desc' } },
            { key: 'industry', label: 'Industry', type: 'textfield', doc: { description: 'desc' } },
            { key: 'url', label: 'Url to partner site', type: 'textfield', doc: { description: 'desc' } },
        ],
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data,
                apiUrl: 'https://review-staging.hermo.my/services/gami/uploadcsv/partner',
                type: 'post',
            }));
        },
    },
    create_pevent: {
        title: 'Create Partner Event',
        formHeight: '550px',
        fields: [
            { key: 'name', label: 'Name', type: 'textfield', doc: { description: 'desc' } },
            { key: 'partner', label: 'Partner', type: 'dropdown', doc: { description: 'desc' } },
            { key: 'remarks', label: 'Remarks', type: 'textbox', doc: { description: 'desc' } },
            { key: 'tnc_text', label: 'TNC Text', type: 'textbox', doc: { description: 'desc' } },
            { key: 'url', label: 'Url', type: 'textfield', doc: { description: 'desc' } },
            { key: 'limit_by_user', label: 'Limit per user', type: 'textbox', doc: { description: 'desc' } },
            { key: 'start_date', label: 'Start Date', type: 'date', doc: { description: 'desc' } },
            { key: 'end_date', label: 'End Date', type: 'date', doc: { description: 'desc' } },
            { key: 'min_user_level', label: 'Min User Level', type: 'dropdown', doc: { description: 'desc' } },
            { key: 'max_user_level', label: 'Max User Level', type: 'dropdown', doc: { description: 'desc' } },
            { key: 'amount', label: 'Amount', type: 'textbox', doc: { description: 'desc' } },
        ],
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data,
                apiUrl: 'https://review-staging.hermo.my/services/gami/uploadcsv/partner',
                type: 'post',
            }));
        },
    },
    create_voucher: {
        title: 'Create Partner Voucher',
        formHeight: '375px',
        fields: [
            { key: 'code', label: 'Unique Code', type: 'textfield', doc: { description: 'desc' } },
            { key: 'event_code', label: 'Event Code', type: 'dropdown', doc: { description: 'desc' } },
            { key: 'start_date', label: 'Start Date', type: 'date', doc: { description: 'desc' } },
            { key: 'end_date', label: 'End Date', type: 'date', doc: { description: 'desc' } },
        ],
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data,
                apiUrl: 'https://review-staging.hermo.my/services/gami/uploadcsv/partner',
                type: 'post',
            }));
        },
    },
    create_levent: {
        title: 'Create Local Event',
        formHeight: '380px',
        fields: [
            { key: 'amount', label: 'Amount', type: 'textbox', doc: { description: 'desc' } },
            { key: 'start_date', label: 'Start Date', type: 'date', doc: { description: 'desc' } },
            { key: 'end_date', label: 'End Date', type: 'date', doc: { description: 'desc' } },
            { key: 'modal_id', label: 'Modal Id', type: 'textfield', doc: { description: 'desc' } },
        ],
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data,
                apiUrl: 'https://review-staging.hermo.my/services/gami/uploadcsv/partner',
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
                    url: 'https://review-staging.hermo.my/services/gami/downloadfile/partner',
                },
                doc: {
                    description: 'CSV file with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
                },
            },
        ],
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data: data.file.form,
                apiUrl: 'https://review-staging.hermo.my/services/gami/uploadcsv/partner',
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
                    url: 'https://review-staging.hermo.my/services/gami/downloadfile/partner_event',
                },
                doc: {
                    description: 'CSV file with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
                },
            },
        ],
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data: data.file.form,
                apiUrl: 'https://review-staging.hermo.my/services/gami/uploadcsv/partner_event',
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
                    url: 'https://review-staging.hermo.my/services/gami/downloadfile/voucher',
                },
                doc: {
                    description: 'CSV file with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
                },
            },
        ],
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data: data.file.form,
                apiUrl: 'https://review-staging.hermo.my/services/gami/uploadcsv/voucher',
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
                    url: 'https://review-staging.hermo.my/services/gami/downloadfile/local_event',
                },
                doc: {
                    description: 'CSV file with Local Event detail, refer to the sample downloadable from the link in hte form and refer to the table field documentation details about each fields',
                },
            },
        ],
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data: data.file.form,
                apiUrl: 'https://review-staging.hermo.my/services/gami/uploadcsv/local_event',
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
