import React, { FC, ReactChildren, ReactNode, useEffect } from 'react';
import modalStyles from './modal-styles.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modalOverlay/modal-overlay';
import { createPortal } from 'react-dom';
import { TOrder } from '../../utils/types/types';

type TProps = {
    info?: undefined | null | { name: string; success: boolean; order: TOrder };
    onClose: () => void;
    children?: ReactNode | ReactChildren;
    title: string;
};

const Modal: FC<TProps> = (props) => {
    const refRoot: HTMLElement | null = document.getElementById('modal');
    useEffect(() => {
        const closeByEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                props.onClose();
            }
        };

        document.addEventListener('keydown', closeByEscape);

        return (): void =>
            document.removeEventListener('keydown', closeByEscape);
    }, [props.info]);
    // console.log(props.info);

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
                        }}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                {props.children}
            </div>
            <ModalOverlay onClose={props.onClose} />
        </div>,
        refRoot!
    );
};

// Передаются функция выключения, заголовок, children

export default Modal;
