import { dataChecking } from 'globalUtils';

const tableSetting = {
    merchant_list: {
        title: 'Merchant List',
        link: '/merchant_list',
        description: 'A page to view, add and edit merchants in Hermo.',
        iconClass: 'fa fa-users p-1',
        tableWidth: '70rem',
        api: 'http://aphrodite.alpha.hermo.my/merchant',
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
                width: '20rem',
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
                            scope.props.history.push({
                                pathname: `/merchant/${data.id}/products`,
                                state: { pageSubTitle: data.name },
                            });
                        },
                    },
                    {
                        name: 'orders',
                        special: 'render',
                        iconClass: 'fas fa-file-invoice',
                        onPressHandling: (index, scope, data) => {
                            scope.props.history.push({
                                pathname: `/merchant/${data.id}/orders`,
                                state: { pageSubTitle: data.name },
                            });
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
        api: 'http://aphrodite.alpha.hermo.my/merchant/:id/products',
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'Associate New Product',
                type: 'createNew',
                width: '220px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '5rem', align: 'center', type: 'integer', doc: { description: '' } },
            { key: 'name', label: 'Product Name', width: '35rem', align: 'left', type: 'string', doc: { description: '' } },
            { key: 'image_320_200', label: 'Product Image', width: '20rem', align: 'center', type: 'image', doc: { description: '' } },
            { key: 'merchant_id', label: 'Merchant ID', width: '15rem', align: 'center', type: 'integer', doc: { description: '' } },
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
                            const tempState = {
                                showModalType: 'remove',
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
    order: {
        title: 'Orders',
        link: '/merchant/:id/orders',
        hideFromUser: true,
        description: 'A page to view and manage order onto merchant',
        iconClass: 'fab fa-product-hunt p-1',
        tableWidth: '60rem',
        api: 'http://aphrodite.alpha.hermo.my/merchant/:id/orders',
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
            { key: 'price', label: 'Order Total Price', width: '10rem', align: 'center', type: 'string', doc: { description: '' } },
            { key: 'username', label: 'Username', width: '15rem', align: 'center', type: 'string', doc: { description: '' } },
            { key: 'buy_date', label: 'Buy Date', width: '15rem', align: 'center', type: 'datetime', doc: { description: '' } },
            { key: 'merchant_id', label: 'Merchant ID', width: '5rem', align: 'center', type: 'integer', doc: { description: '' } },
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
};

export default tableSetting;
