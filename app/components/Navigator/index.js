/**
*
* Navigator
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import globalScope from 'globalScope';
import NavItem from './NavItem/index';

import './style.scss';

function Navigator(props) {
    const menu = props.items.map((item) => {
        if (item.requireLogin && !globalScope.token) {
            return null;
        }

        return (
            <li className="nav-item px-2 unstyled" key={item.code}>
                <NavItem clickHandler={props.clickHandler} vertical={props.vertical} itemClassName={props.itemClassName} data={item}></NavItem>
            </li>
        );
    });

    if (props.vertical) {
        return (
            <div className={`vertical-navigator ${props.className}`}>
                <nav className="">
                    <div className="">
                        {
                            props.items.length ?
                                menu : null
                        }
                    </div>
                </nav>
            </div>
        );
    }

    return (
        <div className={`${props.className} nav-container`}>
            <nav className="gami-navbar">
                <div className="gami-navbar-nav">
                    {
                        props.items.length ?
                            menu : null
                    }
                </div>
            </nav>
        </div>
    );
}

Navigator.propTypes = {
    items: PropTypes.array.isRequired,
    vertical: PropTypes.bool,
};

export default Navigator;
