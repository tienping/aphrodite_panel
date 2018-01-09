/**
*
* Navigator
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavItem from './NavItem/index';

const NavContainer = styled.div`
    position: absolute;
    top: 0;
    right: 16px;
`;

function Navigator(props) {
    const menu = props.items.map((item) => (
        <li className="nav-item px-2" key={item.code}>
            <NavItem data={item} handleLinkClick={props.handleLinkClick}></NavItem>
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
