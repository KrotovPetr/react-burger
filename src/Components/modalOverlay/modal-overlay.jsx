import React from 'react';
import overlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

//компонент-подложка по модальное окно
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

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
};

export default ModalOverlay;
