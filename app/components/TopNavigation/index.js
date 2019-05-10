/**
*
* TopNavigation
*
*/

import React from 'react';
import topNavSetting from 'utils/globalTopNavSetting';
import Button from '@material-ui/core/Button';
import DropdownMenu from 'components/DropdownMenu';

import './style.scss';

class TopNavigation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        if (!topNavSetting || !topNavSetting.length) {
            return null;
        }
        return (
            <div
                className="top-navigation-bar"
            >
                <div className="container">
                    {
                        Object.keys(topNavSetting).map((key, index) => (
                            <div key={index}>
                                {
                                    topNavSetting[index].children ?
                                        <DropdownMenu
                                            data={topNavSetting[index]}
                                        />
                                        :
                                        <Button
                                            key={index}
                                            className="top-nav-button"
                                            variant="outlined"
                                        >
                                            {topNavSetting[index].label}
                                        </Button>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

TopNavigation.propTypes = {

};

export default TopNavigation;
