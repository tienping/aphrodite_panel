// import { dataChecking } from 'globalUtils';
import globalScope from 'globalScope';
import { push } from 'react-router-redux';

const topNavSetting = [
    {
        requireLogin: true,
        label: 'Products',
        children: [{
            label: 'Associate Products',
            onClick: () => {
                alert('Feature still under developmert....');
            },
        }, {
            label: 'merchant',
            onClick: () => {
                globalScope.dispatch(push({
                    pathname: '/merchant_list',
                }));
            },
        }, {
            label: 'Products List',
            onClick: () => {
                globalScope.dispatch(push({
                    pathname: `/merchant/${globalScope.userData.merchants[0].id}/products`,
                }));
            },
        }],
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
    {
        requireLogin: true,
        label: 'Reporting',
        children: [{
            label: 'Report 1',
            onClick: () => {
                alert('Feature still under developmert....');
            },
        }, {
            label: 'Report 2',
            onClick: () => {
                globalScope.dispatch(push({
                    pathname: '/report/1',
                }));
            },
        }],
    },
];

export default topNavSetting;
