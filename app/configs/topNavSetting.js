// import { dataChecking } from 'globalUtils';
import globalScope from 'globalScope';
import { push } from 'react-router-redux';

const topNavSetting = [
    {
        label: 'Products',
        children: [{
            label: 'Associate Products',
            onClick: () => {
                alert('Feature still under developmert....');
            },
        }, {
            label: 'Products List',
            onClick: () => {
                globalScope.dispatch(push({
                    pathname: '/merchant/:id/products',
                }));
            },
        }],
    },
    {
        label: 'Orders',
        children: [{
            label: 'Order List',
            onClick: () => {
                globalScope.dispatch(push({
                    pathname: '/merchant/:id/orders',
                }));
            },
        }],
    },
    {
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
