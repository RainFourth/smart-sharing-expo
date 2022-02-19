import React from 'react';
import * as InputsType from './InputsType';
import PropTypes from 'prop-types';

function Input(props) {
    return (
        <>
            {React.createElement(InputsType[props.type], props)}
        </>
    )
}

Input.propTypes = {
    type: PropTypes.oneOf(['password', 'name', 'email', 'date', 'phone', 'dropdown', 'default', 'list']).isRequired,
    list: PropTypes.array,
    values: PropTypes.array,
    onUpdate: PropTypes.func,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    keyboardType: PropTypes.string,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    description: PropTypes.any,
    warning: PropTypes.any,
    multiline: PropTypes.bool,
    maxLength: PropTypes.any,
    autoCompleteType: PropTypes.string,
    items: PropTypes.array,
    zIndex: PropTypes.number,
    mainStyle: PropTypes.object,
    confirmation: PropTypes.bool,
    startErrroText: PropTypes.bool,
    check: PropTypes.bool
}

export { Input }