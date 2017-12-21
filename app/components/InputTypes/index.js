/**
*
* InputTypes
*
*/

import React from 'react';
import PropTypes from 'prop-types';

function InputTypes(props) {
    if (props.type === 'textarea') {
        return (
            <textarea
                name={props.name}
                className="form-control"
                defaultValue={props.defaultValue}
                onChange={props.onChange}
                placeholder={props.placeholder || ''}
            ></textarea>
        );
    }

    return (
        <input
            name={props.name}
            type="text"
            className="form-control"
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            placeholder={props.placeholder || ''}
        />
    );
}

InputTypes.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.any,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};

export default InputTypes;
