import React from 'react';
import * as ModalType from './ModalType';
import PropTypes from 'prop-types';

function ModalMessage(props) {
    return (
        <>
            {React.createElement(ModalType[props.type], props)}
        </>
    )
}

ModalMessage.propTypes = {
    modalRef: PropTypes.any.isRequired,
    type: PropTypes.oneOf(['default', 'custom']).isRequired,
    cancel: PropTypes.bool,
    buttonDir: PropTypes.oneOf(['row', 'column']),
    icon: PropTypes.element,
    onAccept: PropTypes.func,
    onReject: PropTypes.func
}

export { ModalMessage }