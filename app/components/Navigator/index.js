/**
*
* Navigator
*
*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavDropdown from './NavDropdown';

const NavContainer = styled.div`
    position: absolute;
    top: 0;
    right: 16px;
`;

const navDropdownContainer = {
    position: 'relative',
};

function Navigator(props) {
    const menu = props.items.map((item) => (
        <li className="nav-item px-2" key={item.code} style={navDropdownContainer}>
            {item.type === 'internal_url' ?
                <NavLink to={item.url} className="nav-link text-capitalize" title={item.text}>
                    <span className={item.iconClass ? item.iconClass : ''}></span>
                </NavLink>
                :
                item.type === 'external_url' ?
                    <a href={item.url} className="nav-link text-capitalize" title={item.text}>
                        <span className={item.iconClass ? item.iconClass : ''}></span>
                    </a>
                    :
                    item.type === 'dropdown' ?
                        <NavDropdown handleLinkClick={props.handleLinkClick} item={item}></NavDropdown>
                        :
                        <span className="nav-link text-capitalize" title={item.text}>
                            <span className={item.iconClass ? item.iconClass : ''}></span>
                        </span>
            }
        </li>
    ));

    return (
        <NavContainer>
            <nav className="navbar navbar-expand-md navbar-dark p-0">
                <div className="navbar-nav d-flex flex-row">
                    {props.items.length && menu}
                </div>
            </nav>
        </NavContainer>
    );
}

Navigator.propTypes = {
    items: PropTypes.array.isRequired,
    handleLinkClick: PropTypes.func,
};

export default Navigator;
