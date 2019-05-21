// import { dataChecking } from 'globalUtils';
// import globalScope from 'globalScope';
// import { push } from 'react-router-redux';

const dashboardSetting = [
    // {
    //     virtual: [],
    //     title: 'Shop Rating',
    //     type: 'string',
    //     size: 'half',
    //     value: 'Your current rating: 4.5 out of 5.0',
    // },
    {
        virtual: ['total_sales'],
        title: 'Total Sales over days',
        type: 'linegraph',
        size: 'half',
        params: {
            xAxisKey: 'date',
            vertical: false,
            lines: [{
                type: 'monotone',
                dataKey: 'total',
                stroke: '#82ca9d',
                // activeDot: { r: 8 },
            }],
        },
    },
    {
        virtual: ['pending'],
        title: 'Total Pending Orders',
        type: 'listing',
        size: 'half',
        hideHeader: true,
        // data: [
        //     { name: 'Total', value: 6 },
        //     { name: 'Today', value: 2 },
        //     { name: 'Yesterday', value: 5 },
        //     { name: 'Older', value: 1 },
        // ],
    },
    {
        virtual: ['cancellation'],
        title: 'Cancellation Rate',
        type: 'listing',
        size: 'half',
    },
    // {
    //     virtual: [],
    //     title: 'Rejected Product',
    //     type: 'string',
    //     size: 'half',
    //     value: '1.5%',
    // },
    {
        virtual: ['oos'],
        title: 'Total Out of Stock',
        type: 'listing',
        size: 'half',
    },
    // {
    //     virtual: [],
    //     title: 'Actions',
    //     type: 'buttonlist',
    //     size: 'half',
    //     config: [],
    // },
    // {
    //     virtual: [],
    //     title: 'Announcements',
    //     type: 'announcement',
    //     size: 'full',
    //     value: 'need research what is the structure for graph data',
    // },
];

export default dashboardSetting;
