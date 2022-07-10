import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import profileStyles from './profile-orders.module.css';
import { v4 as uuidv4 } from 'uuid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie } from '../../../utils/functions/cookieFunctions/getCookie';
import { getOrderPrice } from '../../../utils/functions/getPrice';
import { getInfo } from '../../../utils/functions/getInfo';
import { setActive } from '../../../Services/actions/components';
import { setPersonOrderInfo } from '../../../Services/actions/requestsActions';
import { getDate } from '../../../utils/functions/getDate';
const ProfileOrders: FC = () => {
    const [info, setInfo] = useState<any>([]);
    const [isPaused, setPause] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');
    const dispatch = useDispatch();
    const ws = useRef<any>(null);

    const { ingredients, WSUrl } = useSelector(
        (store: any) => ({
            ingredients: store.component.ingredients,
            WSUrl: store.sockets.WSUrl,
        }),
        shallowEqual
    );

    useEffect(() => {
        if (!isPaused) {
            ws.current = new WebSocket(
                WSUrl + '?token=' + getCookie('accessToken')
            );
            ws.current.onopen = () => setStatus('Соединение открыто');
            ws.current.onclose = () => setStatus('Соединение закрыто');
        }

        gettingData();
        return () => ws.current.close();
    }, [ws, isPaused]);

    const gettingData = useCallback(() => {
        if (!ws.current) return;
        ws.current.onmessage = (e: any) => {
            //подписка на получение данных по вебсокету
            if (isPaused) return;
            const message = JSON.parse(e.data);
            // console.log(message);
            if (e.data) {
                setInfo(message);
            }
        };
    }, [isPaused]);

    return (
        // контенер с заказами
        <div className={profileStyles.ordersContainer}>
            <div className={profileStyles.orders}>
                {info.orders &&
                    info.orders.map((element: any) => (
                        // карточка заказа
                        <div
                            className={profileStyles.orderPosition}
                            key={uuidv4()}
                            onClick={(): void => {
                                // console.log(element['_id']);
                                // history.replace({
                                //     pathname: '/profile/orders/' + element['_id'],
                                // });
                                //
                                dispatch(setPersonOrderInfo(element));
                                dispatch(setActive(true));
                                // console.log(isActive);
                            }}>
                            <div className={profileStyles.positionInfo}>
                                <p className="text text_type_digits-default">
                                    #{element.number}
                                </p>
                                <p className="text text_type_main-default text_color_inactive">
                                    {getDate(element.createdAt)}
                                </p>
                            </div>
                            <div className={profileStyles.desContainer}>
                                <h2
                                    className={
                                        profileStyles.h2Header +
                                        ' text text_type_main-medium'
                                    }>
                                    {element.name}
                                </h2>
                                {element.status === 'done' ? (
                                    <p className="text text_type_main-default text_color_success">
                                        Выполнен
                                    </p>
                                ) : element.status === 'created' ? (
                                    <p className="text text_type_main-default">
                                        Создан
                                    </p>
                                ) : (
                                    <p className="text text_type_main-default text_color_error">
                                        Отменён
                                    </p>
                                )}
                            </div>
                            <div className={profileStyles.priceLevel}>
                                <div className={profileStyles.orderIngredients}>
                                    {element.ingredients.map(
                                        (elem: any, index: number) =>
                                            index < 5 ? (
                                                <div
                                                    className={
                                                        profileStyles.pageContainer
                                                    }
                                                    key={uuidv4()}>
                                                    <img
                                                        src={
                                                            ingredients[
                                                                getInfo(
                                                                    elem,
                                                                    ingredients
                                                                )
                                                            ].image_mobile
                                                        }
                                                        width="56px"
                                                        height="56px"
                                                        alt="Ingredient icon"
                                                    />
                                                </div>
                                            ) : index === 5 ? (
                                                <div
                                                    className={
                                                        profileStyles.pageContainer
                                                    }
                                                    key={uuidv4()}>
                                                    <p className="text text_type_digits-default">
                                                        +
                                                        {element.ingredients
                                                            .length - index}
                                                    </p>
                                                    <img
                                                        src={
                                                            ingredients[
                                                                getInfo(
                                                                    elem,
                                                                    ingredients
                                                                )
                                                            ].image_mobile
                                                        }
                                                        width="56px"
                                                        height="56px"
                                                        className={
                                                            profileStyles.img
                                                        }
                                                        alt="Ingredient icon"
                                                    />
                                                </div>
                                            ) : null
                                    )}
                                </div>
                                <div className={profileStyles.priceContainer}>
                                    <p className="text text_type_main-medium">
                                        {getOrderPrice(
                                            element.ingredients,
                                            ingredients
                                        )}
                                    </p>
                                    <div
                                        className={profileStyles.iconContainer}>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

//propTypes - нету

export default ProfileOrders;
