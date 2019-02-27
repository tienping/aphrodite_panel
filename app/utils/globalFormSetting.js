const formSetting = {
    // sysvar: {
    //     title: 'System Variable',
    //     formHeight: '430px',
    //     fields: [
    //         { key: 'key', label: 'Key', type: 'textfield', placeholder: 'Key of variable', mandatory: true },
    //         { key: 'category', label: 'Category', type: 'textfield', placeholder: 'Category' },
    //         { key: 'start', label: 'Start Date', type: 'date', placeholder: 'Start date' },
    //         { key: 'end', label: 'End Date', type: 'date', placeholder: 'End date' },
    //         { key: 'value', label: 'Value', type: 'textbox', placeholder: 'JSON object value' },
    //     ],
    // },
    create_partner: {
        title: 'Partners',
        formHeight: '550px',
        fields: [
            { key: 'name', label: 'Name', type: 'textfield' },
            { key: 'logo', label: 'Logo', type: 'image' },
            { key: 'description', label: 'Description', type: 'textbox' },
            { key: 'code_type', label: 'Code Type', type: 'dropdown' },
            { key: 'status', label: 'Status', type: 'boolean', default: false },
            { key: 'industry', label: 'Industry', type: 'textfield' },
            { key: 'url', label: 'Url to partner site', type: 'textfield' },
        ],
    },
    create_pevent: {
        title: 'Create Partner Event',
        formHeight: '550px',
        fields: [
            { key: 'name', label: 'Name', type: 'textfield' },
            { key: 'partner', label: 'Partner', type: 'dropdown' },
            { key: 'remarks', label: 'Remarks', type: 'textbox' },
            { key: 'tnc_text', label: 'TNC Text', type: 'textbox' },
            { key: 'url', label: 'Url', type: 'textfield' },
            { key: 'limit_by_user', label: 'Limit per user', type: 'textbox' },
            { key: 'start_date', label: 'Start Date', type: 'date' },
            { key: 'end_date', label: 'End Date', type: 'date' },
            { key: 'min_user_level', label: 'Min User Level', type: 'dropdown' },
            { key: 'max_user_level', label: 'Max User Level', type: 'dropdown' },
            { key: 'amount', label: 'Amount', type: 'textbox' },
        ],
    },
    create_levent: {
        title: 'Create Local Event',
        formHeight: '380px',
        fields: [
            { key: 'amount', label: 'Amount', type: 'textbox' },
            { key: 'start_date', label: 'Start Date', type: 'date' },
            { key: 'end_date', label: 'End Date', type: 'date' },
            { key: 'modal_id', label: 'Modal Id', type: 'textfield' },
        ],
    },
    create_voucher: {
        title: 'Create Partner Voucher',
        formHeight: '375px',
        fields: [
            { key: 'code', label: 'Unique Code', type: 'textfield' },
            { key: 'event_code', label: 'Event Code', type: 'dropdown' },
            { key: 'start_date', label: 'Start Date', type: 'date' },
            { key: 'end_date', label: 'End Date', type: 'date' },
        ],
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
    // partnerEvent: {
    //     title: 'Partners Event',
    //     formHeight: '495px',
    //     formWidth: '280px',
    //     fields: [
    //         { key: 'id', label: 'ID', type: 'textfield' },
    //         { key: 'name', label: 'Name', type: 'textfield' },
    //         { key: 'logo', label: 'Logo', type: 'image' },
    //         { key: 'status', label: 'Status', type: 'boolean', default: true },
    //     ],
    // },
};
export default formSetting;

export const formAction = () => {
    const data = {};

    return data;
};
