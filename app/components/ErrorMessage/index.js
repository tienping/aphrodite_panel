/**
*
* ErrorMessage
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

function ErrorMessage({ component: Component, error, ...props }) {
    return (
        <span>
            {error && error.messages && error.messages.map((msg) => (
                <section key={msg} className={`alert alert-${props.type || 'warning'} error-container`}>
                    <div>{ msg.text }</div>
                </section>
            ))}
        </span>
    );
}

ErrorMessage.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object,
    ]),
    type: PropTypes.string,
    component: PropTypes.object,
};

export default ErrorMessage;
