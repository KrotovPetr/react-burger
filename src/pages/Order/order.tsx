import React, { FC, useEffect, useState } from 'react';
import orderStyle from './order.module.css';
import OrderIngredients from '../../Components/orderIngredients/order-ingredients.';
import { useDispatch, useSelector } from '../../utils/types/store';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
} from '../../Services/actions/socketActions';
const Order: FC = () => {
    const dispatch = useDispatch();
    const { ordersActive, personOrdersActive } = useSelector((store) => ({
        ordersActive: store.requests.ordersActive,
        personOrdersActive: store.requests.personOrdersActive,
    }));
    // console.log('order')
    useEffect(() => {
        // console.log('order-open');
        !ordersActive &&
            !personOrdersActive &&
            dispatch({ type: WS_CONNECTION_START, payload: '/all' });
        return () => {
            // console.log('order closed');
            // console.log('закрываем');
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, []);

    return <div className={orderStyle.page}>{<OrderIngredients />}</div>;
};

export default Order;
