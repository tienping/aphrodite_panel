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
        <li className="nav-item" key={item.code}>
            {item.url ?
                <NavLink to={item.url} className="nav-link text-capitalize">{item.text}</NavLink>
                :
                <span className="nav-link text-capitalize">{item.text}</span>
            }
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
                        {props.items.length && menu}
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
