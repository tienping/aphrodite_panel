import { getXdp } from 'globalUtils';

const tableSetting = {
    sysvar: {
        title: 'System Variable',
        link: '/sysvar',
        createButtonWidth: '150px',
        iconClass: 'fa fa-cogs text-white text-hover-hermo-pink',
        tableWidth: getXdp(105),
        api: '',
        pathToDataRoot: '',
        fields: [
            { key: 'key', label: 'Key', width: getXdp(5), align: 'center', type: 'string' },
            { key: 'category', label: 'Category', width: getXdp(10), align: 'center', type: 'string' },
            { key: 'start', label: 'Start Date', width: getXdp(15), align: 'center', type: 'date' },
            { key: 'end', label: 'End Date', width: getXdp(15), align: 'center', type: 'date' },
            { key: 'value', label: 'Value', width: getXdp(25), align: 'center', type: 'json' },
            { key: 'va2lue', label: 'Value', width: getXdp(35), align: 'center', type: 'string' },
        ],
    },
    partner: {
        title: 'Partners',
        link: '/partner',
        createButtonWidth: '155px',
        iconClass: 'fa fa-users text-white text-hover-hermo-pink',
        tableWidth: getXdp(50),
        api: '',
        pathToDataRoot: '',
        fields: [
            { key: 'id', label: 'ID', width: getXdp(5), align: 'center', type: 'string' },
            { key: 'name', label: 'Name', width: getXdp(30), align: 'center', type: 'string' },
            { key: 'logo', label: 'Logo', width: getXdp(8), align: 'center', type: 'image' },
            { key: 'status', label: 'Status', width: getXdp(7), align: 'center', type: 'boolean' },
        ],
    },
    import: {
        title: 'Import voucher',
        link: '/import',
        createButtonWidth: '148px',
        iconClass: 'fa fa-upload text-white text-hover-hermo-pink',
        tableWidth: getXdp(55),
        api: '',
        pathToDataRoot: '',
        fields: [
            { key: 'event_code', label: 'Event Code', width: getXdp(10), align: 'center', type: 'string' },
            { key: 'partner', label: 'Partner', width: getXdp(10), align: 'center', type: 'dropdown' },
            { key: 'remarks', label: 'Remarks', width: getXdp(35), align: 'center', type: 'string' },
        ],
    },
};

export default tableSetting;
