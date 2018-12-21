// import { getXdp } from 'globalUtils';

const tableSetting = {
    sysvar: {
        title: 'System Variable',
        link: '/sysvar',
        createButtonWidth: '150px',
        iconClass: 'fa fa-cogs',
        tableWidth: '113.5rem',
        api: '',
        pathToDataRoot: '',
        fields: [
            { key: 'key', label: 'Key', width: '6.5rem', align: 'center', type: 'string' },
            { key: 'category', label: 'Category', width: '11rem', align: 'center', type: 'string' },
            { key: 'start', label: 'Start Date', width: '13rem', align: 'center', type: 'date' },
            { key: 'end', label: 'End Date', width: '13rem', align: 'center', type: 'date' },
            { key: 'value', label: 'Value', width: '30rem', align: 'left', type: 'json' },
            { key: 'va2lue', label: 'Value', width: '40rem', align: 'center', type: 'string' },
        ],
    },
    partner: {
        title: 'Partners',
        link: '/partner',
        createButtonWidth: '155px',
        iconClass: 'fa fa-users',
        tableWidth: '50rem',
        api: '',
        pathToDataRoot: '',
        fields: [
            { key: 'id', label: 'ID', width: '5rem', align: 'center', type: 'string' },
            { key: 'name', label: 'Name', width: '25rem', align: 'left', type: 'string' },
            { key: 'logo', label: 'Logo', width: '10rem', align: 'center', type: 'image' },
            { key: 'status', label: 'Status', width: '10rem', align: 'center', type: 'boolean' },
        ],
    },
    import: {
        title: 'Import voucher',
        link: '/import',
        createButtonWidth: '148px',
        iconClass: 'fa fa-upload',
        tableWidth: '54rem',
        api: '',
        pathToDataRoot: '',
        fields: [
            { key: 'event_code', label: 'Event Code', width: '12rem', align: 'center', type: 'string' },
            { key: 'partner', label: 'Partner', width: '12rem', align: 'center', type: 'dropdown' },
            { key: 'remarks', label: 'Remarks', width: '30rem', align: 'center', type: 'string' },
        ],
    },
};

export default tableSetting;
