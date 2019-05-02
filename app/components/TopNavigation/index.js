/**
*
* TopNavigation
*
*/

import React from 'react';
import topNavSetting from 'utils/globalTopNavSetting';

import './style.scss';

class TopNavigation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div
                className="TopNavigation-bar"
            >
                <div>
                    {
                        Object.keys(topNavSetting).map((key, index) => <div key={index}>{key}</div>)
                    }
                </div>
            </div>
        );
    }
}

TopNavigation.propTypes = {

};

export default TopNavigation;
