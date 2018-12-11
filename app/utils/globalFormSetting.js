const formSetting = {
    sysvar: {
        title: 'System Variable',
        fields: [
            { key: 'key', label: 'Key', type: 'textfield', placeholder: 'Key of variable', mandatory: true },
            { key: 'category', label: 'Category', type: 'textfield', placeholder: 'Category' },
            { key: 'start', label: 'Start Date', type: 'date', placeholder: 'Start date' },
            { key: 'end', label: 'End Date', type: 'date', placeholder: 'End date' },
            { key: 'value', label: 'Value', type: 'textbox', placeholder: 'JSON object value' },
        ],
        action: () => { alert('create System Variable'); return null; },
    },
    vendor: {
        title: 'Vendors',
        fields: [
            { key: 'id', label: 'ID', type: 'textfield' },
            { key: 'name', label: 'Name', type: 'textfield' },
            { key: 'logo', label: 'Logo', type: 'image' },
            { key: 'status', label: 'Status', type: 'boolean' },
        ],
        action: () => { alert('create vendor'); return null; },
    },
    import: {
        title: 'Import voucher',
        fields: [
            { key: 'event_code', label: 'Event Code', type: 'textfield' },
            { key: 'partner', label: 'Partner', type: 'dropdown' },
            { key: 'remarks', label: 'Remarks', type: 'textbox' },
        ],
        action: () => { alert('create vendor'); return null; },
    },
};
export default formSetting;

export const formAction = () => {
    const data = {};

    return data;
};
