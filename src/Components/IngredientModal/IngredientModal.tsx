import React, { FC } from 'react';
import IngredientDetails from '../ingredientDetails/ingredient-details';
import Modal from '../modal/modal';
import {
    clearInfo,
    setActive,
    setData,
} from '../../Services/actions/components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const IngredientModal: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { orderInfo, ingredients } = useSelector(
        (store: any) => ({
            orderInfo: store.component.orderInfo,
            ingredients: store.component.ingredients,
        }),
        shallowEqual
    );
    const closeWindow = (): void => {
        orderInfo ? dispatch(clearInfo(ingredients)) : dispatch(setData(null));
        dispatch(setActive(false));
        history.replace({ pathname: '/' });
    };
    return (
        <div>
            <Modal
                title={'Детали ингредиента'}
                onClose={(): void => closeWindow()}>
                <IngredientDetails />
            </Modal>
        </div>
    );
};

//propTypes - нету

export default IngredientModal;
