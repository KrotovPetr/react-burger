import React, { useEffect } from 'react';
import modalStyles from './modal-styles.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredientDetails/ingredient-details';
import OrderDetails from '../orderDetails/order-details';
import ModalOverlay from '../modalOverlay/modal-overlay';
import PropTypes from 'prop-types';

const Modal = (props) => {
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Escape':
                    props.turnOff();
                    break;
            }
        });
        return () =>
            document.removeEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'Escape':
                        props.turnOff();
                        break;
                }
            });
    });

    return (
        props.active && (
            <div className={modalStyles.area}>
                <ModalOverlay turnOff={props.turnOff} />
                {props.typeOfModal === 'order' ? (
                    <div
                        className={modalStyles.modalContentOrd}
                        onClick={(e) => e.stopPropagation()}>
                        <div className={modalStyles.topLevel}>
                            <h1 className="text text_type_main-large" />
                            <div
                                className={modalStyles.logoDiv}
                                onClick={props.turnOff}>
                                <CloseIcon type="primary" />
                            </div>
                        </div>
                        <OrderDetails />
                    </div>
                ) : (
                    <div
                        className={modalStyles.modalContentIngr}
                        onClick={(e) => e.stopPropagation()}>
                        <div className={modalStyles.topLevel}>
                            <h1 className="text text_type_main-large">
                                Детали ингридиента
                            </h1>
                            <div
                                className={modalStyles.logoDiv}
                                onClick={props.turnOff}>
                                <CloseIcon type="primary" />
                            </div>
                        </div>
                        <IngredientDetails data={props.data} />
                    </div>
                )}
            </div>
        )
    );
};

Modal.propTypes = {
    active: PropTypes.bool.isRequired,
    turnOff: PropTypes.func.isRequired,
    typeOfModal: PropTypes.string.isRequired,
};

export default Modal;
