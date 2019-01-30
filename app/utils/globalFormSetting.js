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
        formHeight: '505px',
        fields: [
            { key: 'id', label: 'ID', type: 'textfield' },
            { key: 'name', label: 'Name', type: 'textfield' },
            { key: 'logo', label: 'Logo', type: 'image' },
            { key: 'status', label: 'Status', type: 'boolean', default: true },
        ],
    },
    create_reward: {
        title: 'Import voucher',
        formHeight: '300px',
        fields: [
            { key: 'id', label: 'ID', type: 'textfield' },
            { key: 'name', label: 'Name', type: 'textfield' },
            { key: 'remarks', label: 'Remarks', type: 'textbox' },
            { key: 'tnc_text', label: 'TNC', type: 'textbox' },
            { key: 'event_code', label: 'Event Code', type: 'textfield' },
            { key: 'url', label: 'Url', type: 'textfield' },
            { key: 'limit_by_user', label: 'Limit', type: 'textbox' },
            { key: 'min_user_level', label: 'Min User Level', type: 'dropdown' },
            { key: 'max_user_level', label: 'Max User Level', type: 'dropdown' },
            { key: 'amount', label: 'Amount', type: 'textbox' },
            { key: 'partner', label: 'Partner', type: 'dropdown' },
        ],
    },
    create_voucher: {
        title: 'Import voucher',
        formHeight: '300px',
        fields: [
            { key: 'id', label: 'ID', type: 'textfield' },
            { key: 'name', label: 'Name', type: 'textfield' },
            { key: 'remarks', label: 'Remarks', type: 'textbox' },
            { key: 'tnc_text', label: 'TNC', type: 'textbox' },
            { key: 'event_code', label: 'Event Code', type: 'textfield' },
            { key: 'url', label: 'Url', type: 'textfield' },
            { key: 'limit_by_user', label: 'Limit', type: 'textbox' },
            { key: 'min_user_level', label: 'Min User Level', type: 'dropdown' },
            { key: 'max_user_level', label: 'Max User Level', type: 'dropdown' },
            { key: 'amount', label: 'Amount', type: 'textbox' },
            { key: 'partner', label: 'Partner', type: 'dropdown' },
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
                    url: 'https://trello-attachments.s3.amazonaws.com/5bd19731034b528ef18903e9/5c482afb65a4647cff6d7b6a/36428da8fdec3f51edcc5b55442fd934/partner.csv',
                },
            },
        ],
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data: data.file.form,
                apiUrl: 'http://review-staging.hermo.my/services/gami/uploadcsv/partner',
                type: 'post',
            }));
        },
    },
    upload_reward: {
        title: 'Upload Reward',
        formHeight: '350px',
        fields: [
            {
                key: 'file',
                label: 'File',
                type: 'file',
                sample: {
                    name: 'Sample for reward',
                    url: 'https://trello-attachments.s3.amazonaws.com/5bd19731034b528ef18903e9/5c482afb65a4647cff6d7b6a/7f807ce57e0c2385555f481a18f42d10/rewardPartner.csv',
                },
            },
        ],
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data: data.file.form,
                apiUrl: 'http://review-staging.hermo.my/services/gami/uploadcsv/reward',
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
                    url: 'https://trello-attachments.s3.amazonaws.com/5bd19731034b528ef18903e9/5c482afb65a4647cff6d7b6a/e60d64871819b37423e201f31b6bb563/voucher.csv',
                },
            },
        ],
        onSubmit: (scope, actions, data) => {
            scope.props.dispatch(actions.fireApi({
                data: data.file.form,
                apiUrl: 'http://review-staging.hermo.my/services/gami/uploadcsv/voucher',
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
