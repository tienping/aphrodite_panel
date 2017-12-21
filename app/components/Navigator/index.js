/**
*
* Navigator
*
*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Navigator(props) {
    const menu = props.items.map((item) => (
        <li className="nav-item" key={item.name}>
            <NavLink to={item.link} className="nav-link text-capitalize">{item.name}</NavLink>
        </li>
    ));

    return (
        <div>
            <nav className="navbar navbar-toggleable-md navbar-expand-md navbar-light bg-faded">
                <button className="navbar-toggler navbar-toggler-right" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {menu}
                    </div>
                </div>
            </nav>
        </div>
    );
}

Navigator.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Navigator;
