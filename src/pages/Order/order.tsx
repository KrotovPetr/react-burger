import React, { FC, useEffect, useState } from 'react';
import orderStyle from './order.module.css';
import OrderIngredients from '../../Components/orderIngredients/order-ingredients.';
import { useDispatch } from '../../utils/types/store';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
} from '../../Services/actions/socketActions';
const Order: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: '/all' });

        return () => {
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, []);

    return <div className={orderStyle.page}>{<OrderIngredients />}</div>;
};

export default Order;
