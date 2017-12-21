/**
*
* Header
*
*/

import React from 'react';
import { sessionService } from 'redux-react-session';
// import styled from 'styled-components';

import Navigator from 'components/Navigator';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Header() {
    const navItems = [
        { link: '/', name: 'Home' },
        { link: '/mall', name: 'Malls' },
        { link: '/flagship', name: 'Flagship Stores' },
    ];

    return (
        <div>
            <img className="navbar-brand" src="" alt="logo" />
            <Navigator items={navItems} />
            <button onClick={sessionService.deleteSession}>
                <FormattedMessage {...messages.logout} />
            </button>
        </div>
    );
}

Header.propTypes = {

};

export default Header;
