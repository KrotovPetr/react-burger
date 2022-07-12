import React, { FC, useEffect } from 'react';
import feedStyles from './feed.module.css';
import { v4 as uuidv4 } from 'uuid';
import { setOrderInfo } from '../../Services/actions/requestsActions';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { setActive } from '../../Services/actions/components';
import { getInfo } from '../../utils/functions/getInfo';
import { getOrderPrice } from '../../utils/functions/getPrice';
import { useDispatch, useSelector } from '../../utils/types/store';
import { getDate } from '../../utils/functions/getDate';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
} from '../../Services/actions/socketActions';
import { TOrderIngredients } from '../../utils/types/types';

const Feed: FC = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { ingredients, ordersActive, isActive, payload } = useSelector(
        (store) => ({
            isActive: store.component.isActiv,
            ingredients: store.component.ingredients,
            ordersActive: store.requests.ordersActive,
            payload: store.sockets.payload,
        })
    );

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: '/all' });
        dispatch({ type: WS_CONNECTION_CLOSED });
    }, []);
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
                    {payload &&
                        payload.orders.map((element: TOrderIngredients) => (
                            // карточки/позиции заказа
                            <div
                                key={uuidv4()}
                                className={feedStyles.orderPosition}
                                onClick={(): void => {
                                    // console.log(element);
                                    dispatch(setOrderInfo(element));
                                    dispatch(setActive(true));
                                    history.push({
                                        pathname: `/feed/${element._id}`,
                                        state: { orderBackground: location },
                                    });

                                    // history.push(`/feed/${element['_id']}`);
                                }}>
                                {/*верхний уровень описания заказа*/}
                                <div className={feedStyles.positionInfo}>
                                    <p className="text text_type_digits-default">
                                        #{element.number}
                                    </p>
                                    <p className="text text_type_main-default text_color_inactive">
                                        {getDate(element.createdAt)}
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
                                            (elem: string, index: number) =>
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
                            // </Link>
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
                                {payload &&
                                    payload.orders.map(
                                        (element: TOrderIngredients) =>
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
                                {payload &&
                                    payload.orders.map(
                                        (element: TOrderIngredients) =>
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
                            {payload && payload.total}
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
                            {payload && payload.totalToday}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feed;
