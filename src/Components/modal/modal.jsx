import React, { useEffect } from 'react';
import modalStyles from './modal-styles.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modalOverlay/modal-overlay';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const Modal = (props) => {
    const refRoot = document.getElementById('modal');

    useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                props.onClose();
            }
        };

        document.addEventListener('keydown', closeByEscape);

        return () => document.removeEventListener('keydown', closeByEscape);
    }, []);

    return createPortal(
        <div className={modalStyles.modalContainer}>
            <div
                className={modalStyles.modalContent}
                onClick={(e) => e.stopPropagation()}>
                <div className={modalStyles.topLevel}>
                    <h1 className="text text_type_main-large">{props.title}</h1>

                    <div
                        className={modalStyles.logoDiv}
                        onClick={() => {
                            props.onClose();
                            // history.replace({
                            //     pathname: '/',
                            // });
                        }}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                {props.children}
            </div>
            <ModalOverlay onClose={props.onClose} />
        </div>,
        refRoot
    );
};

// Передаются функция выключения, заголовок, children

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element,
};

export default Modal;
