import { getXdp } from './globalUtils';

const tableSetting = {
    sysvar: {
        id: 'sysvar',
        title: 'System Variable',
        link: '/sysvar',
        createButtonWidth: '147px',
        createFormHeight: '430',
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
    vendor: {
        id: 'vendor',
        title: 'Vendors',
        link: '/vendor',
        createButtonWidth: '151px',
        createFormHeight: '365',
        iconClass: 'fa fa-users text-white text-hover-hermo-pink',
        tableWidth: getXdp(45),
        api: '',
        pathToDataRoot: '',
        fields: [
            { key: 'id', label: 'ID', width: getXdp(5), align: 'center', type: 'string' },
            { key: 'name', label: 'Name', width: getXdp(10), align: 'center', type: 'string' },
            { key: 'logo', label: 'Logo', width: getXdp(15), align: 'center', type: 'image' },
            { key: 'status', label: 'Status', width: getXdp(15), align: 'center', type: 'boolean' },
        ],
    },
    import: {
        id: 'import',
        title: 'Import voucher',
        link: '/import',
        createButtonWidth: '148px',
        createFormHeight: '300',
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
