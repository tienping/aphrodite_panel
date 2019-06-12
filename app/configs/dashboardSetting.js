// import { dataChecking } from 'globalUtils';
// import globalScope from 'globalScope';
// import { push } from 'react-router-redux';

const dashboardSetting = [
    {
        key: 'total_sales',
        action: 'TOTAL_SALES',
        title: 'Total Sales over days',
        type: 'linegraph',
        size: 'full',
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
        mockData: [
            { total: '7412.85', date: '2019-05-14T01:40:07.000Z' },
            { total: '7136.54', date: '2019-05-14T17:25:57.000Z' },
            { total: '6650.96', date: '2019-05-15T16:37:15.000Z' },
            { total: '4904.02', date: '2019-05-16T16:05:53.000Z' },
            { total: '8633.68', date: '2019-05-17T17:04:41.000Z' },
            { total: '8978.13', date: '2019-05-18T16:59:52.000Z' },
            { total: '11689.36', date: '2019-05-19T17:17:36.000Z' },
        ],
    },
    {
        key: 'best_seller',
        action: 'BEST_SELLER',
        title: 'Best Seller',
        type: 'table',
        size: 'half',
        hideHeader: true,
        fields: [{
            key: 'product',
            align: 'left',
        }, {
            key: 'quantity',
            align: 'center',
        }],
        mockData: [
            { quantity: '8908', product: 'Nature Republic Soothing & Moisture Aloe Vera 92% Soothing Gel 300ml*4pcs' },
            { quantity: '3870', product: '3CE Velvet Lip Tint 4g [8 Types To Choose]' },
            { quantity: '3269', product: 'Innisfree No Sebum Mineral Powder 5g' },
            { quantity: '3269', product: 'Innisfree No Sebum Mineral Powder 5g' },
            { quantity: '2868', product: 'Nature Republic Soothing & Moisture Aloe Vera 92% Soothing Gel Mist 150ml' },
            { quantity: '2348', product: 'April Skin Magic Snow Cushion Black 2.0 [3 Types To Choose]' },
        ],
    },
    {
        key: 'rating',
        action: 'GET_RATING',
        title: 'Shop Rating',
        type: 'listing',
        size: 'half',
        mockData: {
            count: '8.25%',
        },
    },
    {
        key: 'pending',
        action: 'PENDING_ORDER',
        title: 'Total Pending Orders',
        type: 'listing',
        size: 'half',
        hideHeader: true,
        mockData: {
            older: 482,
            today: 4,
            total: 570,
            yesterday: 84,
        },
    },
    {
        key: 'cancellation',
        action: 'CANCELLATION',
        title: 'Cancellation Rate',
        type: 'listing',
        size: 'half',
        mockData: {
            count: '17%',
        },
    },
    // {
    //     key: 'Rejected',
    //     action: 'REJECTED',
    //     title: 'Rejected Product',
    //     type: 'string',
    //     size: 'half',
    //     value: '1.5%',
    // },
    {
        key: 'oos',
        action: 'OOS',
        title: 'Total Out of Stock',
        type: 'listing',
        size: 'half',
        mockData: {
            count: 533,
        },
    },
    // {
    //     title: 'Actions',
    //     type: 'buttonlist',
    //     size: 'half',
    //     config: [],
    // },
    // {
    //     key: 'announcements',
    //     title: 'Announcements',
    //     type: 'announcement',
    //     size: 'full',
    //     value: 'need research what is the structure for graph data',
    // },
];

export default dashboardSetting;
