/**
*
* TopNavigation
*
*/

import React from 'react';
import topNavSetting from 'configs/topNavSetting';
import Button from '@material-ui/core/Button';
import DropdownMenu from 'components/DropdownMenu';
import globalScope from 'globalScope';
import { Events } from 'globalUtils';

import './style.scss';

class TopNavigation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        Events.listen('forceUpdateTopNavigation', 'topNavigation-forceUpdate', () => {
            this.forceUpdate();
        });
    }

    render() {
        return (
            <div
                className="top-navigation-bar"
            >
                <div className="container">
                    {
                        Object.keys(topNavSetting).map((key, index) => {
                            if (topNavSetting[index].requireLogin && !globalScope.token) {
                                return null;
                            }

                            return (
                                <div key={index} className="top-nav-item">
                                    {
                                        topNavSetting[index].children ?
                                            <DropdownMenu
                                                className="top-nav-dropdown"
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
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}

TopNavigation.propTypes = {

};

export default TopNavigation;
