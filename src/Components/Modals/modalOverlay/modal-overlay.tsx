import React, { FC } from 'react';
import overlayStyles from './modal-overlay.module.css';

interface IProps {
    onClose: () => void;
}
//компонент-подложка по модальное окно
const ModalOverlay: FC<IProps> = (props) => {
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
