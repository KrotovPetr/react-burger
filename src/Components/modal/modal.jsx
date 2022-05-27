import React, { useEffect } from 'react';
import modalStyles from './modal-styles.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredientDetails/ingredient-details';
import OrderDetails from '../orderDetails/order-details';
import ModalOverlay from '../modalOverlay/modal-overlay';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    setActive,
    clearInfo,
    setData,
} from '../../Services/actions/components';
import { useHistory } from 'react-router-dom';

const Modal = (props) => {
    const history = useHistory();
    const refRoot = document.getElementById('modal');
    const { orderInfo, ingredients } = useSelector(
        (store) => ({
            orderInfo: store.component.orderInfo,
            ingredients: store.component.ingredients,
        }),
        shallowEqual
    );
    const dispatch = useDispatch();
    useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                orderInfo ? dispatch(clearInfo()) : dispatch(setData(null));
                dispatch(setActive(false));
                history.replace({
                    pathname: '/',
                });
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
                            orderInfo
                                ? dispatch(clearInfo(ingredients))
                                : dispatch(setData(null));
                            dispatch(setActive(false));
                            history.replace({
                                pathname: '/',
                            });
                        }}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                {props.children}
            </div>
            <ModalOverlay />
        </div>,
        refRoot
    );
};

// Передаются функция выключения, заголовок, children

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
};

export default Modal;
