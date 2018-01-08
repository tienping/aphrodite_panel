/**
*
* NavDropdown
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import './simple-dropdown.scss';

const DropdownContainer = styled(DropdownContent)`
    position: absolute;
    background: ${(props) => props.theme.secondary_bg};
    width: 500px;
    height: 300px;
    right: 16px;
`;

const refString = 'dropdown';

function NavDropdown(props) {
    return (
        <Dropdown className="NavDropdown-component nav-link text-capitalize account-dropdown" ref={refString}>
            <DropdownTrigger>
                <span className={(props.item.iconClass ? props.item.iconClass : 'account-dropdown__name ')} title={props.item.text}></span>
            </DropdownTrigger>
            <DropdownContainer>
                <div className="account-dropdown__identity account-dropdown__segment">
                    Signed in as <strong>username here</strong>
                </div>
                <ul className="account-dropdown__quick-links account-dropdown__segment text-left">
                    <li className="account-dropdown__link">
                        <a className="account-dropdown__link__anchor" role="button" tabIndex="0" onClick={props.handleLinkClick}>
                            Help
                        </a>
                    </li>
                </ul>
                <ul className="account-dropdown__management-links account-dropdown__segment">
                    <li className="account-dropdown__link">
                        <a className="account-dropdown__link__anchor" role="button" tabIndex="0" onClick={props.handleLinkClick}>
                            Sign out
                        </a>
                    </li>
                </ul>
            </DropdownContainer>
        </Dropdown>
    );
}

NavDropdown.propTypes = {
    handleLinkClick: PropTypes.func,
    item: PropTypes.object,
};

export default NavDropdown;
