import React from 'react';
import IngredientDetails from '../ingredientDetails/ingredient-details';
import Modal from '../modal/modal';
import {
    clearInfo,
    setActive,
    setData,
} from '../../Services/actions/components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ModalI = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { orderInfo, ingredients } = useSelector(
        (store) => ({
            orderInfo: store.component.orderInfo,
            ingredients: store.component.ingredients,
            isActive: store.component.isActiv,
            cardData: store.component.cardData,
        }),
        shallowEqual
    );
    const closeWindow = () => {
        orderInfo ? dispatch(clearInfo(ingredients)) : dispatch(setData(null));
        dispatch(setActive(false));
        history.replace({ pathname: '/' });
    };
    return (
        <div>
            <Modal title={'Детали ингредиента'} onClose={() => closeWindow()}>
                <IngredientDetails />
            </Modal>
        </div>
    );
};

export default ModalI;
