/**
*
* Fieldset
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/InputTypes';
// import styled from 'styled-components';

function Fieldset(props) {
    return (
        <fieldset className="form-group">
            <label htmlFor={props.name} className="small mb-0">{props.label}</label>
            <Input {...props} />
            {props.children}
        </fieldset>
    );
}

Fieldset.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.any,
};

export default Fieldset;
