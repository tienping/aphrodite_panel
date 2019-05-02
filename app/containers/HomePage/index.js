/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import tableSetting from 'utils/globalTableSetting';
import { dataChecking } from 'globalUtils';
import Button from '@material-ui/core/Button';
// import Fancy from '@tienping/my-react-dom';

import messages from './messages';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="container">
                <h1 className="text-center">
                    <FormattedMessage {...messages.header} />
                </h1>
                {/* <div><Fancy /></div> */}
                <section className="main-content text-center">
                    {
                        Object.keys(tableSetting).map((key, index) => {
                            if (!dataChecking(tableSetting, key, 'hideFromUser')) {
                                return (
                                    <NavLink
                                        key={index}
                                        to={dataChecking(tableSetting, key, 'link')}
                                        className="page-select-button"
                                        title={dataChecking(tableSetting, key, 'title')}
                                    >
                                        <Button variant="contained" color="primary">
                                                {dataChecking(tableSetting, key, 'title')}
                                        </Button>
                                    </NavLink>
                                );
                            }
                            return null;
                        })
                    }
                </section>
            </div>
        );
    }
}
