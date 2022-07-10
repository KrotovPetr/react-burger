import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import feedStyles from './feed.module.css';
import { v4 as uuidv4 } from 'uuid';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setOrderInfo } from '../../Services/actions/requestsActions';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect, useLocation } from 'react-router-dom';
import { setActive } from '../../Services/actions/components';
import { getInfo } from '../../utils/functions/getInfo';
import { getOrderPrice } from '../../utils/functions/getPrice';
import { RootState } from '../../utils/types/store';

const Feed: FC = () => {
    const location = useLocation();
    const [info, setInfo] = useState<any>([]);
    const dispatch = useDispatch();
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('');
    const ws = useRef<any>(null);
    // console.log(info);
    const { ingredients, ordersActive, isActive, WSUrl } = useSelector(
        (store: RootState) => ({
            isActive: store.component.isActiv,
            ingredients: store.component.ingredients,
            ordersActive: store.requests.ordersActive,
            WSUrl: store.sockets.WSUrl,
        }),
        shallowEqual
    );

    // const ws = new WebSocket(WSUrl + '/all');

    useEffect(() => {
        if (!isPaused) {
            ws.current = new WebSocket(WSUrl + '/all'); // создаем ws соединение
            ws.current.onopen = () => setStatus('Соединение открыто'); // callback на ивент открытия соединения
            ws.current.onclose = () => setStatus('Соединение закрыто'); // callback на ивент закрытия соединения
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

    if (ordersActive && isActive) {
        return (
            <Redirect
                to={{
                    pathname: '/feed/' + ordersActive['_id'],
                    state: { orderBackground: location },
                }}
            />
        );
    }

    return (
        // общий контейнер по странице
        <div className={feedStyles.page}>
            {/*заголовок */}
            <h1
                className={
                    feedStyles.headerText + ' text text_type_main-large'
                }>
                Лента заказов
            </h1>
            <div className={feedStyles.section}>
                {/*блок с лентой заказов*/}
                <div className={feedStyles.orders}>
                    {info.orders &&
                        info.orders.map((element: any) => (
                            // карточки/позиции заказа
                            <div
                                className={feedStyles.orderPosition}
                                key={uuidv4()}
                                onClick={(): void => {
                                    // console.log(element);
                                    dispatch(setOrderInfo(element));
                                    dispatch(setActive(true));
                                }}>
                                {/*верхний уровень описания заказа*/}
                                <div className={feedStyles.positionInfo}>
                                    <p className="text text_type_digits-default">
                                        #{element.number}
                                    </p>
                                    <p className="text text_type_main-default text_color_inactive">
                                        {element.createdAt}
                                    </p>
                                </div>
                                {/*название блюда*/}
                                <h2
                                    className={
                                        feedStyles.h2Header +
                                        ' text text_type_main-default'
                                    }>
                                    {element.name}
                                </h2>
                                {/*уровень иконок ингредиентов и цены заказа*/}
                                <div className={feedStyles.priceLevel}>
                                    <div
                                        className={feedStyles.orderIngredients}>
                                        {element.ingredients.map(
                                            (elem: any, index: number) =>
                                                index < 5 ? (
                                                    <div
                                                        className={
                                                            feedStyles.pageContainer
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
                                                            feedStyles.pageContainer
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
                                                                feedStyles.img
                                                            }
                                                            alt="Ingredient icon"
                                                        />
                                                    </div>
                                                ) : null
                                        )}
                                    </div>
                                    {/*блок цены*/}
                                    <div className={feedStyles.priceBlock}>
                                        <p className="text text_type_digits-default">
                                            {getOrderPrice(
                                                element.ingredients,
                                                ingredients
                                            )}
                                        </p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {/*блок готовности заказов и ко*/}
                <div className={feedStyles.orderInfo}>
                    {/*блоки с номерами заказов*/}
                    <div className={feedStyles.orderNumbers}>
                        <div className={feedStyles.readyOrders}>
                            <h2
                                className={
                                    feedStyles.h2Header +
                                    ' text text_type_main-medium'
                                }>
                                Готовы:
                            </h2>
                            {/*колонка с номерами*/}
                            <div className={feedStyles.numbers}>
                                {info.orders &&
                                    info.orders.map((element: any) =>
                                        element.status === 'done' ? (
                                            <p
                                                className="text text_type_digits-default text_color_success"
                                                key={uuidv4()}>
                                                {element.number}
                                            </p>
                                        ) : null
                                    )}
                            </div>
                        </div>
                        {/*блоки с номерами заказов*/}
                        <div className={feedStyles.ordersInWork}>
                            <h2
                                className={
                                    feedStyles.h2Header +
                                    ' text text_type_main-medium'
                                }>
                                В работе:
                            </h2>
                            {/*колонки с заказами*/}
                            <div className={feedStyles.numbers}>
                                {info.orders &&
                                    info.orders.map((element: any) =>
                                        element.status !== 'done' ? (
                                            <p
                                                className={
                                                    'text text_type_digits-default'
                                                }
                                                key={uuidv4()}>
                                                {element.number}
                                            </p>
                                        ) : null
                                    )}
                            </div>
                        </div>
                    </div>
                    {/*счетчики выполненных заказов*/}
                    <div className={feedStyles.ordersCounter}>
                        <h2
                            className={
                                feedStyles.h2Header +
                                ' text text_type_main-medium'
                            }>
                            Выполнено за всё время:
                        </h2>
                        <p className="text text_type_digits-large">
                            {info.total}
                        </p>
                    </div>
                    {/*счетчики выполненных заказов*/}
                    <div className={feedStyles.ordersPerDayCounter}>
                        <h2
                            className={
                                feedStyles.h2Header +
                                ' text text_type_main-medium'
                            }>
                            Выполнено за сегодня:
                        </h2>
                        <p className="text text_type_digits-large">
                            {info.totalToday}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feed;
