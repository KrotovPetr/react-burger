import React, { FC } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { setActive } from '../../../Services/actions/componentAction/components';
import Modal from '../modal/modal';
import {
    clearOrderInfo,
    setOrderInfo,
    setPersonOrderInfo,
} from '../../../Services/actions/requestAction/requestsActions';
import OrderIngredients from '../../orderIngredients/order-ingredients.';
import { useDispatch } from '../../../utils/types/store';
// модалка для заказов
const OrderModal: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { url } = useRouteMatch();

    const closeWindow = (): void => {
        // стираем все данные о заказе
        dispatch(clearOrderInfo());
        dispatch(setOrderInfo(undefined));
        dispatch(setPersonOrderInfo(undefined));
        dispatch(setActive(false));
        url.split('/')[1] === 'feed'
            ? history.replace({ pathname: '/feed' })
            : history.replace({ pathname: '/profile/orders' });
    };
    // console.log('orderNodal');
    return (
        <div>
            <Modal title={''} onClose={(): void => closeWindow()}>
                <OrderIngredients />
            </Modal>
        </div>
    );
};

export default OrderModal;
