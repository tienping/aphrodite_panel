/**
*
* NavItem
*
*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import styled from 'styled-components';

import NavDropdown from './NavDropdown';

const StyleNavi = styled.span`
    padding: 1rem;
    cursor: pointer;
`;

function NavItem(props) {
    if (props.data.type === 'internal_url') {
        return (
            <NavLink to={props.data.url} className="nav-link text-capitalize" title={props.data.text}>
                <StyleNavi className={props.data.iconClass ? props.data.iconClass : ''}></StyleNavi>
            </NavLink>
        );
    } else if (props.data.type === 'external_url') {
        return (
            <a href={props.data.url} className="nav-link text-capitalize" title={props.data.text}>
                <StyleNavi className={props.data.iconClass ? props.data.iconClass : ''}></StyleNavi>
            </a>
        );
    } else if (props.data.type === 'dropdown') {
        return (
            <NavDropdown item={props.data}>
                <StyleNavi className={(props.data.iconClass ? props.data.iconClass : 'dropdown__name ')} title={props.data.text}></StyleNavi>
            </NavDropdown>
        );
    } else if (props.data.type === 'exec_function') {
        return (
            <a
                onClick={props.handleLinkClick}
                role="button"
                tabIndex="0"
                className="nav-link text-capitalize"
                title={props.data.text}
            >
                <StyleNavi className={props.data.iconClass ? props.data.iconClass : ''}></StyleNavi>
            </a>
        );
    }

    return (
        <span className="nav-link text-capitalize" title={props.data.text}>
            <StyleNavi className={props.data.iconClass ? props.data.iconClass : ''}></StyleNavi>
        </span>
    );
}

NavItem.propTypes = {
    data: PropTypes.object.isRequired,
    handleLinkClick: PropTypes.func,
};

export default NavItem;
