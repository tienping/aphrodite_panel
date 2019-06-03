// import { dataChecking } from 'globalUtils';
import globalScope from 'globalScope';
import { push } from 'react-router-redux';

const topNavSetting = [
    {
        requireLogin: true,
        label: 'Dashboard',
        onClick: () => {
            globalScope.dispatch(push({
                pathname: '/',
            }));
        },
    },
    {
        requireLogin: true,
        label: 'Products',
        children: [
            // {
            //     label: 'Associate Products',
            //     onClick: () => {
            //         alert('Feature still under developmert....');
            //     },
            // },
            // {
            //     label: 'merchant',
            //     onClick: () => {
            //         globalScope.dispatch(push({
            //             pathname: '/merchant_list',
            //         }));
            //     },
            // },
            {
                label: 'Products List',
                onClick: () => {
                    globalScope.dispatch(push({
                        pathname: `/merchant/${globalScope.userData.merchants[0].id}/products`,
                    }));
                },
            },
        ],
    },
    {
        requireLogin: true,
        label: 'Orders',
        children: [{
            label: 'Order List',
            onClick: () => {
                globalScope.dispatch(push({
                    pathname: `/merchant/${globalScope.userData.merchants[0].id}/orders`,
                }));
            },
        }],
    },
];

export default topNavSetting;
