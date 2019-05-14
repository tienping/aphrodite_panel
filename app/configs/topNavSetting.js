// import { dataChecking } from 'globalUtils';
import globalScope from 'globalScope';
import { push } from 'react-router-redux';

const topNavSetting = [
    {
        label: 'Merchant',
        children: [{
            label: 'Create Merchant',
            onClick: () => {
                alert('Feature still under developmert....');
                console.log('crete product clicked');
            },
        }, {
            label: 'Merchant List',
            onClick: () => {
                globalScope.dispatch(push({
                    pathname: '/merchant_list',
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
                console.log('crete product clicked');
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
