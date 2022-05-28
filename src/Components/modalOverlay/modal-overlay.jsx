import React from 'react';
import overlayStyles from './modal-overlay.module.css';

const ModalOverlay = (props) => {
    return (
        <div
            className={overlayStyles.modalActive}
            onClick={() => {
                props.onClose();
            }}
        />
    );
};

export default ModalOverlay;
