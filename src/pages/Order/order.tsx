import React, { FC, useEffect, useState } from 'react';
import orderStyle from './order.module.css';
import OrderIngredients from '../../Components/orderIngredients/order-ingredients.';
import { useRouteMatch } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../utils/types/store';
import { TOrderIngredients } from '../../utils/types/types';
import { WS_CONNECTION_START } from '../../Services/actions/socketActions';
const Order: FC = () => {
    const [info, setInfo] = useState<TOrderIngredients | []>([]);
    // console.log(info);
    const dispatch = useDispatch();
    const { url } = useRouteMatch();

    const { ordersActive, WSUrl } = useSelector((store: RootState) => ({
        ordersActive: store.requests.ordersActive,
        WSUrl: store.sockets.WSUrl,
    }));

    useEffect((): void => {
        dispatch({ type: WS_CONNECTION_START, payload: '/all' });
    }, []);

    // console.log(ordersActive);
    return (
        <div className={orderStyle.page}>
            {ordersActive && <OrderIngredients />}
        </div>
    );
};

export default Order;
