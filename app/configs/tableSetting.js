import { dataChecking } from 'globalUtils';
import { push } from 'react-router-redux';
// import globalScope from 'globalScope';
import { NotificationManager } from 'react-notifications';
import * as Feather from 'featherUtils';

const tableSetting = {
    merchant_list: {
        title: 'Merchant List',
        link: '/merchant_list',
        hideFromUser: true,
        description: 'A page to view, add and edit merchants in Hermo.',
        iconClass: 'fa fa-users p-1',
        tableWidth: '62rem',
        listenSocket: true,
        getSocketParams: () => ({
            dataSet: 'merchant',
            service: 'merchant',
            targetSocket: 'aphrodite',
            options: {
                query: {},
            },
        }),
        pathToDataRoot: '',
        actionButtons: [
            // {
            //     title: 'Create New Merchant',
            //     type: 'createNew',
            //     width: '255px',
            // },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '5rem', align: 'center', type: 'integer', doc: { description: 'Unique primary key and indicator for the item' } },
            { key: 'name', label: 'Merchant Name', width: '25rem', align: 'left', type: 'string', doc: { description: 'Partner name' } },
            { key: 'createdAt', label: 'Created At', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date created' } },
            { key: 'updatedAt', label: 'Updated At', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date last updated' } },
            {
                label: 'Action',
                width: '12rem',
                key: 'Action',
                align: 'center',
                type: 'action',
                items: [
                    {
                        name: 'edit',
                        special: 'edit-form',
                        iconClass: 'fas fa-edit',
                        onPressHandling: (index, scope, data) => {
                            const tempState = {
                                showModalType: 'edit',
                                formData: {},
                            };

                            scope.state.formConfig.map((field) => {
                                tempState.formData[field.key] = {
                                    value: dataChecking(data, field.dataPath || field.key),
                                };
                                return true;
                            });
                            tempState.formData.itemId = data.id;

                            scope.setState(() => (tempState));
                        },
                    },
                    {
                        name: 'products',
                        special: 'render',
                        iconClass: 'fas fa-list',
                        onPressHandling: (index, scope, data) => {
                            scope.props.dispatch(push(`/merchant/${data.id}/products`));
                        },
                    },
                    {
                        name: 'orders',
                        special: 'render',
                        iconClass: 'fas fa-file-invoice',
                        onPressHandling: (index, scope, data) => {
                            scope.props.dispatch(push(`/merchant/${data.id}/orders`));
                        },
                    },
                ],
                doc: { description: 'The actions' },
            },
        ],
    },
    product: {
        title: 'Products',
        link: '/merchant/:id/products',
        hideFromUser: true,
        description: 'A page to view and register product onto merchant',
        iconClass: 'fab fa-product-hunt p-1',
        tableWidth: '90rem',
        listenSocket: true,
        getSocketParams: ({ id }) => ({
            dataSet: 'product',
            service: 'product',
            targetSocket: 'aphrodite',
            options: {
                query: { merchant_id: id },
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Accept-Language': 'en',
                //     'token': globalScope.token,
                // },
            },
            mockData: tableSetting.product.mockData,
        }),
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'Create New',
                type: 'iframe',
                sourceUrl: 'https://portal.hermo.my/hermint/mall/add.html',
                width: '250px',
            },
            {
                title: 'Associate Product',
                type: 'edit',
                width: '250px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '5rem', align: 'center', type: 'integer', doc: { description: '' } },
            { key: 'name', label: 'Product Name', width: '35rem', align: 'left', type: 'string', doc: { description: '' } },
            { key: 'image_320_200', label: 'Product Image', width: '100px', align: 'center', type: 'image', prefix: 'https://cdn5.hermo.my/product_images/malls/', doc: { description: '' } },
            { key: 'merchant_id', label: 'Merchant ID', width: '10rem', align: 'center', type: 'integer', doc: { description: '' } },
            {
                label: 'Action',
                width: '15rem',
                key: 'Action',
                align: 'center',
                type: 'action',
                items: [
                    {
                        name: 'remove',
                        iconClass: 'fas fa-trash',
                        onPressHandling: (index, scope, data) => {
                        // onPressHandling: (index, scope, data, GDPActions) => {
                            if (data && data.id && data.merchant_id) {
                                Feather.action({
                                    dataSet: 'product',
                                    service: 'product',
                                    modelId: parseInt(data.id, 10),
                                    query: {
                                        type: 'SET_MERCHANT',
                                        id: 1,
                                    },
                                    socket: 'aphrodite',
                                    successCallback: () => {
                                        scope.getFeatherQuery();
                                        NotificationManager.success('Product disassociate successfully', 'Remove product from merchant', 3000);
                                    },
                                    mockData: {
                                        type: 'remove',
                                        item: {
                                            id: parseInt(data.id, 10),
                                        },
                                    },
                                });
                            }
                        },
                    },
                ],
                doc: { description: 'The actions' },
            },
        ],
        mockData: {
            data: [
                { id: 42, name: 'Nature Republic Natural Origin Blur CC SPF 30 PA++ 45g', image_320_200: '42_nature-republic-natural-origin-blur-cc-spf-30-pa-45g_200_125_1459149925.png', merchant_id: 'mock' },
                { id: 51, name: 'Nature Republic Super Aqua Max Fresh Watery Cream 80ml', image_320_200: '51_nature-republic-super-aqua-max-fresh-watery-cream-80ml_200_125_1522154030.png', merchant_id: 'mock' },
                { id: 60, name: 'Nature Republic Soothing & Moisture ALOE VERA 80% Emulsion 160ml', image_320_200: '60_nature-republic-soothing-moisture-aloe-vera-80-emulsion-160ml_200_125_1544516556.png', merchant_id: 'mock' },
                { id: 63, name: 'Nature Republic Aqua Super Aqua Max Deep Moisture Sleeping Pack 100ml', image_320_200: 'sp_1acd6560f8e3e587404d2ab5abb4c669.jpg', merchant_id: 'mock' },
                { id: 65, name: 'Nature Republic Soothing & Moisture ALOE VERA 90% Toner 160ml', image_320_200: 'sp_c4c1ff83f4a358e33c33eea2a86ededf.jpg', merchant_id: 'mock' },
                { id: 66, name: 'Nature Republic Super Aqua Max Combination Watery Cream 80ml', image_320_200: '66_nature-republic-super-aqua-max-combination-watery-cream-80ml_200_125_1522154037.png', merchant_id: 'mock' },
                { id: 69, name: 'Nature Republic Forest Garden Chamomile Cleansing Oil 200ml', image_320_200: '69_nature-republic-forest-garden-chamomile-cleansing-oil-200ml_200_125_1454250049.jpg', merchant_id: 'mock' },
            ],
            limit: 12,
            skip: 0,
            total: 7,
        },
    },
    order: {
        title: 'Orders',
        link: '/merchant/:id/orders',
        hideFromUser: true,
        description: 'A page to view and manage order onto merchant',
        iconClass: 'fab fa-product-hunt p-1',
        tableWidth: '90rem',
        listenSocket: true,
        getSocketParams: ({ id }) => ({
            dataSet: 'order',
            service: 'order',
            targetSocket: 'aphrodite',
            options: {
                query: { merchant_id: id },
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Accept-Language': 'en',
                //     'token': globalScope.token,
                // },
            },
            mockData: tableSetting.order.mockData,
        }),
        pathToDataRoot: '',
        actionButtons: [
            // {
            //     title: 'Associate New Product',
            //     type: 'createNew',
            //     width: '255px',
            // },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '5rem', align: 'center', type: 'integer', doc: { description: '' } },
            { key: 'total', dataPath: ['sale_total'], label: 'Total Sales', width: '10rem', align: 'center', type: 'string', doc: { description: '' } },
            { key: 'ordid', dataPath: ['ordid'], label: 'Ordid', width: '20rem', align: 'center', type: 'string', doc: { description: '' } },
            { key: 'status', dataPath: ['status'], label: 'Status', width: '10rem', align: 'center', type: 'string', doc: { description: '' } },
            // { key: 'username', dataPath: ['username'], label: 'Username', width: '20rem', align: 'center', type: 'string', doc: { description: '' } },
            { key: 'created_at', dataPath: ['createdAt'], label: 'Created At', width: '15rem', align: 'center', type: 'datetime', doc: { description: '' } },
            {
                label: 'Action',
                width: '10rem',
                key: 'Action',
                align: 'center',
                type: 'action',
                items: [
                    {
                        name: 'View More',
                        // special: 'edit-form',
                        iconClass: 'fas fa-eye',
                        onPressHandling: (index, scope, data) => {
                            alert('Under development');
                            console.log('On view order details', { index, scope, data });
                        },
                    },
                ],
                doc: { description: 'The actions' },
            },
        ],
        mockData: {
            data: [{
                createdAt: '2018-11-01T09:17:12.000Z',
                id: 1,
                merchant_id: 3,
                order_id: 1798579,
                ordid: '20181796716-1065-SKR',
                sale_total: '122.00',
                status: 'IN PROCESS',
                updatedAt: null,
            }, {
                createdAt: '2018-11-01T09:20:44.000Z',
                id: 2,
                merchant_id: 3,
                order_id: 1798580,
                ordid: '20181796717-1483-SKR',
                sale_total: '89.00',
                status: 'IN PROCESS',
                updatedAt: null,
            }, {
                createdAt: '2018-11-01T09:25:43.000Z',
                id: 4,
                merchant_id: 3,
                order_id: 1798581,
                ordid: '20181796718-9769-SKR',
                sale_total: '73.00',
                status: 'IN PROCESS',
                updatedAt: null,
            }, {
                createdAt: '2018-11-01T09:39:28.000Z',
                id: 6,
                merchant_id: 3,
                order_id: 1798582,
                ordid: '20181796719-3418-SKR',
                sale_total: '59.00',
                status: 'IN PROCESS',
                updatedAt: null,
            }, {
                createdAt: '2018-11-01T09:40:37.000Z',
                id: 7,
                merchant_id: 3,
                order_id: 1798583,
                ordid: '20181796720-7440-SKR',
                sale_total: '78.00',
                status: 'IN PROCESS',
                updatedAt: null,
            }, {
                createdAt: '2018-11-01T09:47:17.000Z',
                id: 9,
                merchant_id: 3,
                order_id: 1798584,
                ordid: '20181796721-4016-SKR',
                sale_total: '192.60',
                status: 'IN PROCESS',
                updatedAt: null,
            }, {
                createdAt: '2018-11-01T10:52:45.000Z',
                id: 11,
                merchant_id: 3,
                order_id: 1798586,
                ordid: '20181796723-1815-SKR',
                sale_total: '143.00',
                status: 'IN PROCESS',
                updatedAt: null,
            }, {
                createdAt: '2018-11-01T11:04:39.000Z',
                id: 14,
                merchant_id: 3,
                order_id: 1798588,
                ordid: '20181796725-5902-SKR',
                sale_total: '88.00',
                status: 'IN PROCESS',
                updatedAt: null,
            }],
            limit: 12,
            skip: 0,
            total: 8,
        },
    },
};

export default tableSetting;
