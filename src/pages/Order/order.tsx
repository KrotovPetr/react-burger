import React, { FC, useEffect, useState } from 'react';
import orderStyle from './order.module.css';
import OrderIngredients from '../../Components/orderIngredients/order-ingredients.';
import { useRouteMatch } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setOrderInfo } from '../../Services/actions/requestsActions';
import { getIndex } from '../../utils/functions/getIndex';
import { RootState } from '../../utils/types/store';
import { TOrderIngredients } from '../../utils/types/types';
const Order: FC = () => {
    const [info, setInfo] = useState<TOrderIngredients | any[]>([]);
    // console.log(info);
    const dispatch = useDispatch();
    const { url } = useRouteMatch();

    const { ordersActive, WSUrl } = useSelector(
        (store: RootState) => ({
            ordersActive: store.requests.ordersActive,
            WSUrl: store.sockets.WSUrl,
        }),
        shallowEqual
    );

    const ws = new WebSocket(WSUrl + '/all');
    useEffect((): void => {
        ws.onmessage = (event: MessageEvent) => {
            if (event.data) {
                setInfo(JSON.parse(event.data).orders);
                dispatch(
                    setOrderInfo(
                        JSON.parse(event.data).orders[
                            getIndex(JSON.parse(event.data).orders, url)
                        ]
                    )
                );
            }
        };
        ws.onclose = (event: CloseEvent) => {
            if (event.wasClean) {
                console.log('Соединение закрыто корректно');
                console.log(`Код закрытия - ${event.code}`);
                console.log(`Причина закрытия - ${event.reason}`);
            } else {
                console.log(`Соединение закрыто с кодом -  ${event.code}`);
            }
        };
    }, []);

    // console.log(ordersActive);
    return (
        <div className={orderStyle.page}>
            {ordersActive && <OrderIngredients />}
        </div>
    );
};

export default Order;
