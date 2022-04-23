import React from 'react';
import overlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    return (
        <div>
            <div
                className={overlayStyles.modalActive}
                onClick={props.turnOff}
            />
        </div>
    );
};

ModalOverlay.propTypes = {
    turnOff: PropTypes.func.isRequired,
};

export default ModalOverlay;
