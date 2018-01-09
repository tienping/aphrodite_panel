/**
*
* NavItem
*
*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import NavDropdown from './NavDropdown';

function NavItem(props) {
    if (props.data.type === 'internal_url') {
        return (
            <NavLink to={props.data.url} className="nav-link text-capitalize" title={props.data.text}>
                <span className={props.data.iconClass ? props.data.iconClass : ''}></span>
            </NavLink>
        );
    } else if (props.data.type === 'external_url') {
        return (
            <a href={props.data.url} className="nav-link text-capitalize" title={props.data.text}>
                <span className={props.data.iconClass ? props.data.iconClass : ''}></span>
            </a>
        );
    } else if (props.data.type === 'dropdown') {
        return (
            <NavDropdown handleLinkClick={props.handleLinkClick} item={props.data}></NavDropdown>
        );
    }

    return (
        <span className="nav-link text-capitalize" title={props.data.text}>
            <span className={props.data.iconClass ? props.data.iconClass : ''}></span>
        </span>
    );
}

NavItem.propTypes = {
    data: PropTypes.object.isRequired,
    handleLinkClick: PropTypes.func,
};

export default NavItem;
