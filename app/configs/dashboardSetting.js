// import { dataChecking } from 'globalUtils';
// import globalScope from 'globalScope';
// import { push } from 'react-router-redux';

const dashboardSetting = [
    {
        id: 1,
        title: 'Total Pending Orders',
        type: 'string',
        size: 'half',
        value: 'Today: 3, Yesterday: 1, Older: 0',
    },
    {
        id: 2,
        title: 'Shop Rating',
        type: 'string',
        size: 'half',
        value: 'Your current rating: 4.5 out of 5.0',
    },
    {
        id: 3,
        title: 'Cancellation Rate',
        type: 'string',
        size: 'half',
        value: '2%',
    },
    {
        id: 4,
        title: 'Rejected Product',
        type: 'string',
        size: 'half',
        value: '1.5%',
    },
    {
        id: 5,
        title: 'Total Sales over days',
        type: 'linegraph',
        size: 'half',
        value: 'need test what is the structure for graph data',
        data: [
            { name: 'Mon', Visits: 2200, Orders: 3400 },
            { name: 'Tue', Visits: 1280, Orders: 2398 },
            { name: 'Wed', Visits: 5000, Orders: 4300 },
            { name: 'Thu', Visits: 4780, Orders: 2908 },
            { name: 'Fri', Visits: 5890, Orders: 4800 },
            { name: 'Sat', Visits: 4390, Orders: 3800 },
            { name: 'Sun', Visits: 4490, Orders: 4300 },
        ],
    },
    {
        id: 6,
        title: 'Total Sales over days',
        type: 'table',
        size: 'half',
        value: 'need test what is the structure for graph data',
        config: [{
            key: 'name',
        }, {
            key: 'visits',
        }, {
            key: 'orders',
        }],
        data: [
            { name: 'Mon', visits: 2200, orders: 3400 },
            { name: 'Tue', visits: 1280, orders: 2398 },
            { name: 'Wed', visits: 5000, orders: 4300 },
            { name: 'Thu', visits: 4780, orders: 2908 },
            { name: 'Fri', visits: 5890, orders: 4800 },
            { name: 'Sat', visits: 4390, orders: 3800 },
            { name: 'Sun', visits: 4490, orders: 4300 },
        ],
    },
    {
        id: 5,
        title: 'Total Out of Stock',
        type: 'string',
        size: 'half',
        value: '3 product out of 98 product',
    },
    {
        id: 8,
        title: 'Announcements',
        type: 'announcement',
        size: 'full',
        value: 'need research what is the structure for graph data',
    },
];

export default dashboardSetting;
