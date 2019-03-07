import { dataChecking } from 'globalUtils';

const tableSetting = {
    // sysvar: {
    //     title: 'System Variable',
    //     link: '/sysvar',
    //     createButtonWidth: '150px',
    //     iconClass: 'fa fa-cogs p-1',
    //     tableWidth: '113.5rem',
    //     api: '',
    //     pathToDataRoot: '',
    //     fields: [
    //         { key: 'key', label: 'Key', width: '6.5rem', align: 'center', type: 'string', doc: { description: 'desc' } },
    //         { key: 'category', label: 'Category', width: '11rem', align: 'center', type: 'string', doc: { description: 'desc' } },
    //         { key: 'start', label: 'Start Date', width: '13rem', align: 'center', type: 'datetime', doc: { description: 'desc' } },
    //         { key: 'end', label: 'End Date', width: '13rem', align: 'center', type: 'datetime', doc: { description: 'desc' } },
    //         { key: 'value', label: 'Value', width: '30rem', align: 'left', type: 'json', doc: { description: 'desc' } },
    //         { key: 'va2lue', label: 'Value', width: '40rem', align: 'center', type: 'string', doc: { description: 'desc' } },
    //     ],
    // },
    partner: {
        title: 'Partners',
        link: '/partner',
        description: 'A page to view, add and edit participating vendors in Hermo Loyalty Programme.',
        iconClass: 'fa fa-users p-1',
        tableWidth: '110rem',
        api: 'https://api-staging.hermo.my/services/gami/partners/list?per-page=2',
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'New Partners ',
                type: 'formAction',
                width: '165px',
            },
            {
                title: 'Upload Partners',
                type: 'upload',
                width: '185px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '5rem', align: 'center', type: 'integer', doc: { description: 'Unique primary key and indicator for the item' } },
            { key: 'name', label: 'Name', width: '25rem', align: 'left', type: 'string', doc: { description: 'Partner name' } },
            { key: 'logo', label: 'Logo', width: '10rem', align: 'center', type: 'image', doc: { description: 'Logo of partner vendor branding symbol' } },
            { key: 'code_type', label: 'Code Type', width: '10rem', align: 'center', type: 'string', doc: { description: 'The ways unique code of vouchers displayed under this partner [text only, barcode or QR code]' } },
            { key: 'industry', label: 'industry', width: '15rem', align: 'center', type: 'string', doc: { description: 'Example: [Food & beverage, Lifestyle, Fashion, Travel, Beauty Products]' } },
            { key: 'url', label: 'url', width: '20rem', align: 'left', type: 'link', doc: { description: 'URL link to partner vendor official site (if any)' } },
            { key: 'status', label: 'Status', width: '10rem', align: 'center', type: 'boolean', doc: { description: 'Avtive or inactive entry' } },
            {
                label: 'Action',
                width: '15rem',
                key: '',
                align: 'center',
                type: 'action',
                items: [
                    {
                        name: 'edit',
                        special: 'edit-form',
                        formWidth: '15rem',
                        image: 'https://img.icons8.com/material/24/000000/pencil.png',
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
            },
        ],
    },
    pevent: {
        title: 'Partner Event',
        link: '/partner_event',
        description: 'A page to view, add and edit Partners\' promotion event (a folder to keep partner vouchers)',
        iconClass: 'fab fa-product-hunt p-1',
        tableWidth: '214rem',
        api: 'https://api-staging.hermo.my/services/gami/rewards/partner_event_list',
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'New Partner Event',
                type: 'formAction',
                width: '205px',
            },
            {
                title: 'Upload Partner Event',
                type: 'upload',
                width: '225px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '7rem', align: 'center', type: 'integer', doc: { description: 'Unique primary key and indicator for the item' } },
            { key: 'name', label: 'Name', width: '20rem', align: 'left', type: 'string', doc: { description: 'Name or label for the promotion' } },
            { key: 'remarks', label: 'Remarks', width: '20rem', align: 'left', type: 'string', doc: { description: 'Event description' } },
            { key: 'tnc_text', label: 'TNC', width: '20rem', align: 'left', type: 'string', doc: { description: 'Terms and condition' } },
            { key: 'url', label: 'Url', width: '25rem', align: 'left', type: 'link', doc: { description: 'URL link to more info about this redemption promotion (if any)' } },
            { key: 'created_by', label: 'Created By', width: '15rem', align: 'center', type: 'string', doc: { description: 'Creator of this Partner Event' } },
            { key: 'created_at', label: 'Created At', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date this Partner Event is created' } },
            { key: 'updated_by', label: 'Updated By', width: '15rem', align: 'center', type: 'string', doc: { description: 'The last editor of this Partner Event' } },
            { key: 'updated_at', label: 'Updated At', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date this Partner Event is last updated' } },
            { key: 'start_date', label: 'Start Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The start of the exchangeble period' } },
            { key: 'end_date', label: 'End Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The end of the exchangeble period' } },
            { key: 'limit_by_user', label: 'Limit', width: '7rem', align: 'center', type: 'integer', doc: { description: 'Maximun number of which each user can redempt' } },
            { key: 'min_user_level', label: 'Min User Level', width: '7rem', align: 'center', type: 'string', doc: { description: 'The minimun user level require to redempt the voucher under this promotion event' } },
            { key: 'max_user_level', label: 'Max User Level', width: '7rem', align: 'center', type: 'string', doc: { description: 'The max user level capable of redempt the voucher under this promotion event' } },
            { key: 'amount', label: 'Amount', width: '8rem', align: 'center', type: 'integer', doc: { description: 'The cost of voucher under this promotion event' } },
            { key: 'partner', label: 'Partner', width: '8rem', align: 'center', type: 'string', doc: { description: 'The ID of corresponding partner vendor' } },
            {
                label: 'Action',
                width: '15rem',
                key: '',
                align: 'center',
                type: 'action',
                items: [
                    {
                        name: 'edit',
                        special: 'edit-form',
                        formWidth: '15rem',
                        image: 'https://img.icons8.com/material/24/000000/pencil.png',
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
            },
        ],
    },
    voucher: {
        title: 'Partner Voucher',
        link: '/voucher',
        description: 'A page to view, add and edit Partners\' voucher',
        createButtonWidth: '160px',
        iconClass: 'fas fa-ticket-alt p-1',
        tableWidth: '127rem',
        api: 'https://api-staging.hermo.my/services/gami/rewards/voucher_list',
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'New Partner Voucher',
                type: 'formAction',
                width: '225px',
            },
            {
                title: 'Upload Partner Voucher',
                type: 'upload',
                width: '240px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '7rem', align: 'center', type: 'integer', doc: { description: 'Unique primary key and indicator for the item' } },
            { key: 'code', label: 'Name', width: '20rem', align: 'left', type: 'string', doc: { description: 'Unique code given by vendor (consult tech team if having trouble getting codes)' } },
            { key: 'event_code', label: 'Remarks', width: '20rem', align: 'left', type: 'string', doc: { description: 'ID/code of the corresponding Partner Event' } },
            { key: 'user_id', label: 'TNC', width: '20rem', align: 'left', type: 'string', doc: { description: 'The user/customer which own this voucher' } },
            { key: 'created_by', label: 'Created By', width: '15rem', align: 'center', type: 'string', doc: { description: 'Creator of this voucher' } },
            { key: 'created_at', label: 'Created At', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date this voucher is created' } },
            { key: 'start_date', label: 'Start Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date which voucher can start to be use' } },
            { key: 'end_date', label: 'End Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date voucher get expired' } },
            {
                label: 'Action',
                width: '15rem',
                key: '',
                align: 'center',
                type: 'action',
                items: [
                    {
                        name: 'edit',
                        special: 'edit-form',
                        formWidth: '15rem',
                        image: 'https://img.icons8.com/material/24/000000/pencil.png',
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
            },
        ],
    },
    levent: {
        title: 'Local Event',
        link: '/local_event',
        description: 'A page to view, add and edit Hermo\'s promotion event (a folder to pcode vouchers)',
        iconClass: 'fas fa-hospital-symbol p-1',
        tableWidth: '60rem',
        api: 'https://api-staging.hermo.my/services/gami/rewards/local_event_list',
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'New Local Event',
                type: 'formAction',
                width: '188px',
            },
            {
                title: 'Upload Local Event',
                type: 'upload',
                width: '210px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '7rem', align: 'center', type: 'integer', doc: { description: 'Unique primary key and indicator for the item' } },
            { key: 'name', label: 'Name', width: '7rem', align: 'center', type: 'string', doc: { description: 'Name for the item' } },
            { key: 'amount', label: 'Amount', width: '8rem', align: 'center', type: 'string', doc: { description: 'The amount of credit used to redempt this voucher' } },
            { key: 'start_date', label: 'Start Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The start of the redemption period' } },
            { key: 'end_date', label: 'End Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The end of the redemption period' } },
            { key: 'model_id', label: 'Model ID', width: '10rem', align: 'center', type: 'string', doc: { description: 'Modal ID for the pcode (can be found in hermint)' } },
            {
                label: 'Action',
                width: '15rem',
                key: '',
                align: 'center',
                type: 'action',
                items: [
                    {
                        name: 'edit',
                        special: 'edit-form',
                        formWidth: '15rem',
                        image: 'https://img.icons8.com/material/24/000000/pencil.png',
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
            },
        ],
    },
    // partnerEvent: {
    //     title: 'Partners Event',
    //     link: '/partner_event',
    //     createButtonWidth: '200px',
    //     iconClass: 'fas fa-handshake p-1',
    //     tableWidth: '50rem',
    //     api: '',
    //     pathToDataRoot: '',
    //     fields: [
    //         { key: 'id', label: 'ID', width: '5rem', align: 'center', type: 'string',  doc: { description: 'Unique primary key and indicator for the item' } },
    //         { key: 'name', label: 'Name', width: '25rem', align: 'left', type: 'string', doc: { description: 'desc' } },
    //         { key: 'start date', label: 'Start Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'desc' } },
    //         { key: 'status', label: 'Status', width: '10rem', align: 'center', type: 'boolean', doc: { description: 'desc' } },
    //     ],
    // },
};

export default tableSetting;
