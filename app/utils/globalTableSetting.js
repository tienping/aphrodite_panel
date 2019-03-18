import { dataChecking } from 'globalUtils';

const tableSetting = {
    sysvar: {
        title: 'System Variable',
        hideFromUser: true,
        link: '/sysvar',
        createButtonWidth: '150px',
        iconClass: 'fa fa-cogs p-1',
        tableWidth: '113.5rem',
        api: '',
        pathToDataRoot: '',
        fields: [
            { key: 'key', label: 'Key', width: '6.5rem', align: 'center', type: 'string', doc: { description: 'desc' } },
            { key: 'category', label: 'Category', width: '11rem', align: 'center', type: 'string', doc: { description: 'desc' } },
            { key: 'start', label: 'Start Date', width: '13rem', align: 'center', type: 'datetime', doc: { description: 'desc' } },
            { key: 'end', label: 'End Date', width: '13rem', align: 'center', type: 'datetime', doc: { description: 'desc' } },
            { key: 'value', label: 'Value', width: '30rem', align: 'left', type: 'json', doc: { description: 'desc' } },
            { key: 'va2lue', label: 'Value', width: '40rem', align: 'center', type: 'string', doc: { description: 'desc' } },
        ],
    },
    partner: {
        title: 'Partner Profile',
        link: '/partner',
        description: 'A page to view, add and edit participating vendors in Hermo Loyalty Programme.',
        iconClass: 'fa fa-users p-1',
        tableWidth: '105rem',
        api: 'https://api-staging.hermo.my/services/gami/partners/list',
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'Upload Single Partner (Form)',
                type: 'createNew',
                width: '255px',
            },
            {
                title: 'Upload Multiple Partners (CSV)',
                type: 'upload',
                width: '270px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '5rem', align: 'center', type: 'integer', doc: { description: 'Unique primary key and indicator for the item' } },
            { key: 'name', label: 'Partner Name', width: '25rem', align: 'left', type: 'string', doc: { description: 'Partner name' } },
            { key: 'logo', label: 'Logo', width: '10rem', align: 'center', type: 'image', doc: { description: 'Logo of partner vendor branding symbol' } },
            { key: 'code_type', label: 'Code Type', width: '10rem', align: 'center', type: 'string', doc: { description: 'Method of voucher code displayed under this partner [text only, barcode or QR code]' } },
            { key: 'industry', label: 'industry', width: '15rem', align: 'center', type: 'string', doc: { description: 'Example: [Food & beverage, Lifestyle, Fashion, Travel, Beauty Products]' } },
            { key: 'url', label: 'url', width: '20rem', align: 'left', type: 'link', doc: { description: 'URL link to partner vendor official site (if any)' } },
            { key: 'status', label: 'Status', width: '10rem', align: 'center', type: 'boolean', doc: { description: 'Active or inactive entry' } },
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
                doc: { description: 'The actions' },
            },
        ],
    },
    pevent: {
        title: 'Partner Event Details',
        link: '/partner_event',
        description: 'A page to view, add and edit Partners\' promotion event (a folder to keep partner vouchers)',
        iconClass: 'fab fa-product-hunt p-1',
        tableWidth: '161rem',
        api: 'https://api-staging.hermo.my/services/gami/rewards/partner_event_list',
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'Upload Single Event (Form)',
                type: 'createNew',
                width: '245px',
            },
            {
                title: 'Upload Multiple Events (CSV)',
                type: 'upload',
                width: '255px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '7rem', align: 'center', type: 'integer', doc: { description: 'Unique primary key and indicator for the item' } },
            { key: 'name', label: 'Event Name', width: '20rem', align: 'left', type: 'string', doc: { description: 'Name or label for the promotion' } },
            { key: 'partner_name', label: 'Partner Name', width: '20rem', align: 'left', type: 'string', doc: { description: 'Name or label for the promotion' } },
            { key: 'remarks', label: 'Remarks', width: '20rem', align: 'left', type: 'string', doc: { description: 'Event description' } },
            // { key: 'tnc_text', label: 'TNC', width: '60rem', align: 'left', type: 'html', doc: { description: 'Terms and condition' } },
            { key: 'url', label: 'Url', width: '25rem', align: 'left', type: 'link', doc: { description: 'URL link to more info about this redemption promotion (if any)' } },
            // { key: 'created_by', label: 'Created By', width: '15rem', align: 'center', type: 'string', doc: { description: 'Creator of this Partner Event' } },
            // { key: 'created_at', label: 'Created At', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date this Partner Event is created' } },
            // { key: 'updated_by', label: 'Updated By', width: '15rem', align: 'center', type: 'string', doc: { description: 'The last editor of this Partner Event' } },
            // { key: 'updated_at', label: 'Updated At', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date this Partner Event is last updated' } },
            { key: 'start_date', label: 'Start Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The start of the exchangeble period' } },
            { key: 'end_date', label: 'End Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The end of the exchangeble period' } },
            { key: 'limit_by_user', label: 'Limit', width: '7rem', align: 'center', type: 'integer', doc: { description: 'Maximun number of which each user can redempt' } },
            { key: 'min_user_level', label: 'Min User Level', width: '7rem', align: 'center', type: 'string', doc: { description: 'The minimun user level require to redempt the voucher under this promotion event' } },
            { key: 'max_user_level', label: 'Max User Level', width: '7rem', align: 'center', type: 'string', doc: { description: 'The max user level capable of redempt the voucher under this promotion event' } },
            { key: 'amount', label: 'Credit Amount Value', width: '8rem', align: 'center', type: 'integer', doc: { description: 'The cost of voucher under this promotion event' } },
            // { key: 'partner', label: 'Partner', width: '8rem', align: 'center', type: 'string', doc: { description: 'The ID of corresponding partner vendor' } },
            { key: 'status', label: 'Status', width: '10rem', align: 'center', type: 'boolean', doc: { description: 'Active or inactive entry' } },
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
                doc: { description: 'The actions' },
            },
        ],
    },
    voucher: {
        title: 'Partner Voucher Details',
        link: '/voucher',
        description: 'A page to view, add and edit Partners\' voucher',
        createButtonWidth: '160px',
        iconClass: 'fas fa-ticket-alt p-1',
        tableWidth: '97rem',
        api: 'https://api-staging.hermo.my/services/gami/rewards/voucher_list',
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'Upload Single Voucher (Form)',
                type: 'createNew',
                width: '260px',
            },
            {
                title: 'Upload Multiple Vouchers (CSV)',
                type: 'upload',
                width: '275px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '7rem', align: 'center', type: 'integer', doc: { description: 'Unique primary key and indicator for the item' } },
            // { key: 'event_code', label: 'Event Code', width: '20rem', align: 'left', type: 'string', doc: { description: 'ID/code of the corresponding Partner Event' } },
            { key: 'event_name', label: 'Event Name', width: '20rem', align: 'left', type: 'string', doc: { description: 'ID/code of the corresponding Partner Event' } },
            { key: 'partner_name', label: 'Partner Name', width: '20rem', align: 'left', type: 'string', doc: { description: 'Name or label for the promotion' } },
            { key: 'code', label: 'Voucher Code', width: '20rem', align: 'left', type: 'string', doc: { description: 'Voucher code given by vendor (consult tech team if having trouble getting codes)' } },
            // { key: 'user_id', label: 'TNC', width: '60rem', align: 'left', type: 'string', doc: { description: 'The user/customer which own this voucher' } },
            // { key: 'created_by', label: 'Created By', width: '15rem', align: 'center', type: 'string', doc: { description: 'Creator of this voucher' } },
            // { key: 'created_at', label: 'Created At', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date this voucher is created' } },
            { key: 'start_date', label: 'Start Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date which voucher can start to be use' } },
            { key: 'end_date', label: 'End Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The date voucher get expired' } },
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
                doc: { description: 'The actions' },
            },
        ],
    },
    levent: {
        title: 'Hermo Event Details',
        link: '/local_event',
        description: 'A page to view, add and edit Hermo\'s promotion event (a folder to pcode vouchers)',
        iconClass: 'fas fa-hospital-symbol p-1',
        tableWidth: '72rem',
        api: 'https://api-staging.hermo.my/services/gami/rewards/local_event_list',
        pathToDataRoot: '',
        actionButtons: [
            {
                title: 'Upload Single Event (Form)',
                type: 'createNew',
                width: '245px',
            },
            {
                title: 'Upload Multiple Events (CSV)',
                type: 'upload',
                width: '255px',
            },
        ],
        fields: [
            { key: 'id', label: 'ID', width: '7rem', align: 'center', type: 'integer', doc: { description: 'Unique primary key and indicator for the item' } },
            { key: 'name', label: 'Event Name', width: '7rem', align: 'center', type: 'string', doc: { description: 'Name for the item' } },
            { key: 'model_id', label: 'Model ID', width: '10rem', align: 'center', type: 'string', doc: { description: 'Modal ID for the pcode (can be found in hermint)' } },
            { key: 'amount', label: 'Credit Amount Value', width: '8rem', align: 'center', type: 'string', doc: { description: 'The amount of credit used to redempt this voucher' } },
            { key: 'start_date', label: 'Start Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The start of the redemption period' } },
            { key: 'end_date', label: 'End Date', width: '10rem', align: 'center', type: 'datetime', doc: { description: 'The end of the redemption period' } },
            { key: 'status', label: 'Status', width: '10rem', align: 'center', type: 'boolean', doc: { description: 'Active or inactive entry' } },
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
                doc: { description: 'The actions' },
            },
        ],
    },
};

export default tableSetting;
