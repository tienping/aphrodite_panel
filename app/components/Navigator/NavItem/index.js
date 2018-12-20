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
    color: white;

    &:hover {
        color: ${(props) => props.theme.tertiary_color};
    }
`;

function NavItem(props) {
    if (props.data.type === 'internal_url') {
        return (
            <NavLink to={props.data.url} className="nav-link text-capitalize" title={props.data.title}>
                <StyleNavi className={props.data.iconClass ? props.data.iconClass : ''}>
                    {props.data.text}
                </StyleNavi>
            </NavLink>
        );
    } else if (props.data.type === 'external_url') {
        return (
            <a href={props.data.url} className="nav-link text-capitalize" title={props.data.title}>
                <StyleNavi className={props.data.iconClass ? props.data.iconClass : ''}>{props.data.text}</StyleNavi>
            </a>
        );
    } else if (props.data.type === 'dropdown') {
        return (
            <NavDropdown item={props.data}>
                <StyleNavi className={(props.data.iconClass ? props.data.iconClass : 'dropdown__name ')} title={props.data.title}></StyleNavi>
            </NavDropdown>
        );
    } else if (props.data.type === 'exec_function') {
        return (
            <a
                onClick={props.data.handleLinkClick}
                role="button"
                tabIndex="0"
                className="nav-link text-capitalize"
                title={props.data.title}
            >
                <StyleNavi className={props.data.iconClass ? props.data.iconClass : ''}>{props.data.text}</StyleNavi>
            </a>
        );
    } else if (props.data.type === 'render') {
        return props.data.render(props);
    }

    return (
        <span className="nav-link text-capitalize" title={props.data.title}>
            <StyleNavi className={props.data.iconClass ? props.data.iconClass : ''}>{props.data.text}</StyleNavi>
        </span>
    );
}

NavItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default NavItem;
