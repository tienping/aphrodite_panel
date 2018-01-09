/**
*
* NavDropdown
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import './NavDropdown.scss';

const DropdownContainer = styled(DropdownContent)`
    position: absolute;
    background: ${(props) => props.theme.secondary_bg};
    width: 500px;
    height: 300px;
    right: 16px;
`;

function NavLi(param) {
    return (
        <li className="dropdown__link">
            <a className="dropdown__link__anchor" role="button" tabIndex="0" href={param.data.url}>
                {param.data.text}
            </a>
        </li>
    );
}

function Section(param) {
    if (param.data.type === 'list') {
        const list = param.data.items.map((item) => (
            <NavLi data={item} key={item.code}></NavLi>
        ));
        return (
            <ul className="account-dropdown__quick-links account-dropdown__segment text-left unstyled">
                {list}
            </ul>
        );
    } else if (param.data.type === 'title') {
        return (
            <h5>{param.data.text}</h5>
        );
    } else if (param.data.type === 'search') {
        return (
            <span>TODO: search_component</span>
        );
    } else if (param.data.type === 'cart') {
        return (
            <span>TODO: cart_component</span>
        );
    }
}

function NavDropdown(props) {
    const sections = props.item.items.map((item) => (
        <Section data={item} key={item.code}></Section>
    ));

    return (
        <Dropdown className="NavDropdown-component nav-link text-capitalize account-dropdown">
            <DropdownTrigger>
                <span className={(props.item.iconClass ? props.item.iconClass : 'account-dropdown__name ')} title={props.item.text}></span>
            </DropdownTrigger>
            <DropdownContainer>
                {sections}
            </DropdownContainer>
        </Dropdown>
    );
}

NavDropdown.propTypes = {
    item: PropTypes.object,
};

export default NavDropdown;
