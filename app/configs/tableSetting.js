import { dataChecking } from 'globalUtils';
import { push } from 'react-router-redux';
import globalScope from 'globalScope';
import { NotificationManager } from 'react-notifications';

const tableSetting = {
    merchant_list: {
        title: 'Merchant List',
        link: '/merchant_list',
        description: 'A page to view, add and edit merchants in Hermo.',
        iconClass: 'fa fa-users p-1',
        tableWidth: '62rem',
        // api: 'http://aphrodite.alpha.hermo.my/merchant',
        listenSocket: true,
        getSocketParams: () => ({
            service: 'merchant',
            targetSocket: 'aphrodite',
            options: {
                query: {},
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Accept-Language': 'en',
                //     'token': globalScope.token,
                // },
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
        // api: 'http://aphrodite.alpha.hermo.my/merchant/:id/products',
        listenSocket: true,
        getSocketParams: ({ id }) => ({
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
        }),
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'Associate New Product',
                type: 'createNew',
                width: '250px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '5rem', align: 'center', type: 'integer', doc: { description: '' } },
            { key: 'name', label: 'Product Name', width: '35rem', align: 'left', type: 'string', doc: { description: '' } },
            { key: 'image_320_200', label: 'Product Image', width: '25rem', align: 'center', type: 'image', doc: { description: '' } },
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
                                globalScope.feather.associate('default').set({
                                    model: 'product',
                                    id: parseInt(data.id, 10),
                                    associate: 'merchant',
                                    associate_id: 1,
                                }).then(() => {
                                    NotificationManager.success('Product associate successfully', 'Add product to merchant', 3000, () => {
                                        // on click action
                                    });
                                    // scope.props.dispatch(GDPActions.getListByFeather(tableSetting[scope.props.pageType].getSocketParams({ id: parseInt(data.merchant_id, 10) })));
                                });
                            }
                        },
                    },
                ],
                doc: { description: 'The actions' },
            },
        ],
    },
    order: {
        title: 'Orders',
        link: '/merchant/:id/orders',
        hideFromUser: true,
        description: 'A page to view and manage order onto merchant',
        iconClass: 'fab fa-product-hunt p-1',
        tableWidth: '90rem',
        // api: 'http://aphrodite.alpha.hermo.my/merchant/:id/orders',
        listenSocket: true,
        getSocketParams: ({ id }) => ({
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
            { key: 'total', dataPath: ['order_info', 'hmall_total_sales'], label: 'Total Sales', width: '10rem', align: 'center', type: 'string', doc: { description: '' } },
            { key: 'ordid', dataPath: ['order_info', 'ordid'], label: 'Ordid', width: '20rem', align: 'center', type: 'string', doc: { description: '' } },
            { key: 'status', dataPath: ['order_info', 'status'], label: 'Status', width: '10rem', align: 'center', type: 'string', doc: { description: '' } },
            { key: 'username', dataPath: ['order_info', 'username'], label: 'Username', width: '20rem', align: 'center', type: 'string', doc: { description: '' } },
            { key: 'created_at', dataPath: ['order_info', 'created'], label: 'Created At', width: '15rem', align: 'center', type: 'datetime', doc: { description: '' } },
            {
                label: 'Action',
                width: '10rem',
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
                ],
                doc: { description: 'The actions' },
            },
        ],
    },
    test_api_1: {
        title: 'Items',
        link: '/test_api_1',
        hideFromUser: true,
        description: 'for testing items',
        iconClass: 'fab fa-product-hunt p-1',
        tableWidth: '90rem',
        // api: 'http://aphrodite.alpha.hermo.my/merchant/:id/orders',
        listenSocket: true,
        getSocketParams: () => ({
            service: 'product',
            targetSocket: 'ordo',
            options: {
                query: { $limit: 999 },
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Accept-Language': 'en',
                //     'token': globalScope.token,
                // },
            },
        }),
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'Create New Product',
                type: 'createNew',
                width: '255px',
            },
        ],
        fields: [
            { key: 'id', type: 'integer', label: 'ID', width: '5rem', align: 'center', doc: { description: '' } },
            { key: 'code', type: 'string', label: 'Code', width: '10rem', align: 'center', doc: { description: '' } },
            { key: 'name', type: 'string', label: 'Name', width: '10rem', align: 'center', doc: { description: '' } },
            { key: 'price', type: 'string', label: 'Price', width: '15rem', align: 'center', doc: { description: '' } },
            { key: 'image', type: 'image', label: 'Image', width: '20rem', align: 'center', doc: { description: '' } },
            { key: 'desc', type: 'string', label: 'Desc', width: '20rem', align: 'center', doc: { description: '' } },
            {
                label: 'Action',
                width: '10rem',
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
                        name: 'remove',
                        iconClass: 'fas fa-trash',
                        onPressHandling: (index, scope, data) => {
                            globalScope.feather.query('product', 'ordo').remove(data.id, { headers: {
                                'Content-Type': 'application/json',
                                'Accept-Language': 'en',
                                'token': globalScope.token,
                            } })
                            .then((response) => {
                                NotificationManager.success(JSON.stringify(response), 'Success', 3000);
                            })
                            .catch((response) => {
                                NotificationManager.error(JSON.stringify(response), 'Error!! (click to dismiss)', 5000);
                            });
                        },
                    },
                ],
                doc: { description: 'The actions' },
            },
        ],
    },
    test_api_2: {
        title: 'Topping',
        link: '/test_api_2',
        hideFromUser: true,
        description: 'for testing topping',
        iconClass: 'fab fa-product-hunt p-1',
        tableWidth: '90rem',
        // api: 'http://aphrodite.alpha.hermo.my/merchant/:id/orders',
        listenSocket: true,
        getSocketParams: () => ({
            service: 'topping',
            targetSocket: 'ordo',
            options: {
                query: { $limit: 999 },
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Accept-Language': 'en',
                //     'token': globalScope.token,
                // },
            },
        }),
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'Create New Topping',
                type: 'createNew',
                width: '255px',
            },
        ],
        fields: [
            { key: 'id', type: 'integer', label: 'ID', width: '5rem', align: 'center', doc: { description: '' } },
            { key: 'code', type: 'string', label: 'Code', width: '10rem', align: 'center', doc: { description: '' } },
            { key: 'name', type: 'string', label: 'Name', width: '10rem', align: 'center', doc: { description: '' } },
            { key: 'price', type: 'string', label: 'Price', width: '15rem', align: 'center', doc: { description: '' } },
            { key: 'image', type: 'image', label: 'Image', width: '20rem', align: 'center', doc: { description: '' } },
            { key: 'desc', type: 'string', label: 'Desc', width: '20rem', align: 'center', doc: { description: '' } },
            {
                label: 'Action',
                width: '10rem',
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
                        name: 'remove',
                        iconClass: 'fas fa-trash',
                        onPressHandling: (index, scope, data) => {
                            globalScope.feather.query('product', 'ordo').remove(data.id, { headers: {
                                'Content-Type': 'application/json',
                                'Accept-Language': 'en',
                                'token': globalScope.token,
                            } })
                            .then((response) => {
                                NotificationManager.success(JSON.stringify(response), 'Success', 3000);
                            })
                            .catch((response) => {
                                NotificationManager.error(JSON.stringify(response), 'Error!! (click to dismiss)', 5000);
                            });
                        },
                    },
                ],
                doc: { description: 'The actions' },
            },
        ],
    },
};

export default tableSetting;
