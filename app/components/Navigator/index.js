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
        <li className="nav-item px-2" key={item.code} style={{ width: '48px' }}>
            <NavItem data={item} handleLinkClick={props.handleLinkClick}></NavItem>
        </li>
    ));

    if (props.vertical) {
        return (
            <div className="vertical-navigator">
                <nav className="navbar navbar-expand-md navbar-light p-0">
                    <div className="navbar-nav d-flex flex-column">
                        {props.items.length && menu}
                    </div>
                </nav>
            </div>
        );
    }

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
    vertical: PropTypes.bool,
};

export default Navigator;
