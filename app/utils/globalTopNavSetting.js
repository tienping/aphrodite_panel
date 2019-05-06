// import { dataChecking } from 'globalUtils';
import globalScope from 'globalScope';
import { push } from 'react-router-redux';

const topNavSetting = [{
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
}];

export default topNavSetting;
