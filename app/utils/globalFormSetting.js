const formSetting = {
    sysvar: {
        title: 'System Variable',
        formHeight: '430px',
        fields: [
            { key: 'key', label: 'Key', type: 'textfield', placeholder: 'Key of variable', mandatory: true },
            { key: 'category', label: 'Category', type: 'textfield', placeholder: 'Category' },
            { key: 'start', label: 'Start Date', type: 'date', placeholder: 'Start date' },
            { key: 'end', label: 'End Date', type: 'date', placeholder: 'End date' },
            { key: 'value', label: 'Value', type: 'textbox', placeholder: 'JSON object value' },
        ],
    },
    partner: {
        title: 'Partners',
        formHeight: '505px',
        fields: [
            { key: 'id', label: 'ID', type: 'textfield' },
            { key: 'name', label: 'Name', type: 'textfield' },
            { key: 'logo', label: 'Logo', type: 'image' },
            { key: 'status', label: 'Status', type: 'boolean', default: true },
        ],
    },
    import: {
        title: 'Import voucher',
        formHeight: '300px',
        fields: [
            { key: 'event_code', label: 'Event Code', type: 'textfield' },
            { key: 'partner', label: 'Partner', type: 'dropdown' },
            { key: 'remarks', label: 'Remarks', type: 'textbox' },
        ],
    },
    partnerEvent: {
        title: 'Partners Event',
        formHeight: '495px',
        formWidth: '280px',
        fields: [
            { key: 'id', label: 'ID', type: 'textfield' },
            { key: 'name', label: 'Name', type: 'textfield' },
            { key: 'logo', label: 'Logo', type: 'image' },
            { key: 'status', label: 'Status', type: 'boolean', default: true },
        ],
    },
};
export default formSetting;

export const formAction = () => {
    const data = {};

    return data;
};
