// import { dataChecking } from 'globalUtils';
// import globalScope from 'globalScope';
// import { push } from 'react-router-redux';

const dashboardSetting = [
    {
        virtual: ['pending'],
        title: 'Total Pending Orders',
        type: 'string',
        size: 'half',
        value: 'Today: 3, Yesterday: 1, Older: 0',
    },
    // {
    //     virtual: [],
    //     title: 'Shop Rating',
    //     type: 'string',
    //     size: 'half',
    //     value: 'Your current rating: 4.5 out of 5.0',
    // },
    {
        virtual: ['cancellation'],
        title: 'Cancellation Rate',
        type: 'string',
        size: 'half',
        value: '2%',
    },
    // {
    //     virtual: [],
    //     title: 'Rejected Product',
    //     type: 'string',
    //     size: 'half',
    //     value: '1.5%',
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
        // data: [{
        //     total: '14288.05', date: '2019-05-11T00:35:47.000Z',
        // }, {
        //     total: '13134.60', date: '2019-05-14T01:05:36.000Z',
        // }, {
        //     total: '12103.78', date: '2019-05-13T00:08:25.000Z',
        // }, {
        //     total: '8176.40', date: '2019-05-09T09:12:23.000Z',
        // }, {
        //     total: '8893.63', date: '2019-05-10T00:04:22.000Z',
        // }, {
        //     total: '10774.93', date: '2019-05-12T00:00:08.000Z',
        // }, {
        //     total: '7057.64', date: '2019-05-15T01:25:57.000Z',
        // }],
    },
    // {
    //     virtual: [],
    //     title: 'Total Sales over days',
    //     type: 'table',
    //     size: 'half',
    //     value: 'need test what is the structure for graph data',
    //     config: [{
    //         key: 'name',
    //     }, {
    //         key: 'visits',
    //     }, {
    //         key: 'orders',
    //     }],
    //     data: [
    //         { name: 'Mon', visits: 2200, orders: 3400 },
    //         { name: 'Tue', visits: 1280, orders: 2398 },
    //         { name: 'Wed', visits: 5000, orders: 4300 },
    //         { name: 'Thu', visits: 4780, orders: 2908 },
    //         { name: 'Fri', visits: 5890, orders: 4800 },
    //         { name: 'Sat', visits: 4390, orders: 3800 },
    //         { name: 'Sun', visits: 4490, orders: 4300 },
    //     ],
    // },
    // {
    //     virtual: [],
    //     title: 'Actions',
    //     type: 'listitem',
    //     size: 'half',
    //     config: [],
    // },
    {
        virtual: ['oos'],
        title: 'Total Out of Stock',
        type: 'string',
        size: 'half',
        value: '3 product out of 98 product',
    },
    // {
    //     virtual: [],
    //     title: 'Announcements',
    //     type: 'announcement',
    //     size: 'full',
    //     value: 'need research what is the structure for graph data',
    // },
];

export default dashboardSetting;
