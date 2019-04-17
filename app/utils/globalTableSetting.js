import { dataChecking } from 'globalUtils';

const tableSetting = {
    merchant_list: {
        title: 'Merchant List',
        link: '/merchant_list',
        description: 'A page to view, add and edit merchants in Hermo.',
        iconClass: 'fa fa-users p-1',
        tableWidth: '70rem',
        api: 'https://api-staging.hermo.my/services/gami/partners/list',
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'Create New Merchant',
                type: 'createNew',
                width: '255px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '5rem', align: 'center', type: 'integer', doc: { description: 'Unique primary key and indicator for the item' } },
            { key: 'name', label: 'Merchant Name', width: '25rem', align: 'left', type: 'string', doc: { description: 'Partner name' } },
            { key: 'logo', label: 'Logo', width: '10rem', align: 'center', type: 'image', doc: { description: 'Logo of partner vendor branding symbol' } },
            { key: 'status', label: 'Status', width: '10rem', align: 'center', type: 'boolean', doc: { description: 'Active or inactive entry' } },
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
                        name: 'items',
                        special: 'render',
                        iconClass: 'fas fa-list',
                        onPressHandling: (index, scope, data) => {
                            console.log('navigate to child');
                            scope.props.history.push(`/merchant/${data.id}`);
                            // const tempState = {
                            //     showModalType: 'edit',
                            //     formData: {},
                            // };

                            // scope.state.formConfig.map((field) => {
                            //     tempState.formData[field.key] = {
                            //         value: dataChecking(data, field.dataPath || field.key),
                            //     };
                            //     return true;
                            // });
                            // tempState.formData.itemId = data.id;

                            // scope.setState(() => (tempState));
                        },
                    },
                ],
                doc: { description: 'The actions' },
            },
        ],
    },
    product: {
        title: 'Merchant Product',
        link: '/merchant/:id',
        hideFromUser: true,
        description: 'A page to view and register product onto merchant',
        iconClass: 'fab fa-product-hunt p-1',
        tableWidth: '70rem',
        api: 'https://api-staging.hermo.my/services/aphrodite/merchant',
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'Associate New Product',
                type: 'createNew',
                width: '255px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '5rem', align: 'center', type: 'integer', doc: { description: 'Unique primary key and indicator for the item' } },
            { key: 'name', label: 'Merchant Name', width: '25rem', align: 'left', type: 'string', doc: { description: 'Partner name' } },
            { key: 'logo', label: 'Logo', width: '10rem', align: 'center', type: 'image', doc: { description: 'Logo of partner vendor branding symbol' } },
            { key: 'status', label: 'Status', width: '10rem', align: 'center', type: 'boolean', doc: { description: 'Active or inactive entry' } },
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
                ],
                doc: { description: 'The actions' },
            },
        ],
    },
};

export default tableSetting;
