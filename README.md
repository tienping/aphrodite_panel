# GamiCenter
This project is extended from react-boilerplate [https://www.reactboilerplate.com/]


# Settings
## Table Setting
Example:
    sysvar: {
        id: 'sysvar',
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


## Form Setting