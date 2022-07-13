import React, { FC, useEffect } from 'react';
import profileStyles from './profile-orders.module.css';
import { useDispatch, useSelector } from '../../../utils/types/store';
import { TOrderIngredients } from '../../../utils/types/types';
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../../../utils/functions/getDate';
import { getInfo } from '../../../utils/functions/getInfo';
import { getOrderPrice } from '../../../utils/functions/getPrice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { shallowEqual } from 'react-redux';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
} from '../../../Services/actions/socketActions';
import { getCookie } from '../../../utils/functions/cookieFunctions/getCookie';
import { useRouteMatch } from 'react-router-dom';

type TProfileOrders = {
    onActive: (element: TOrderIngredients) => void;
};

const ProfileOrders: FC<TProfileOrders> = (props) => {
    const dispatch = useDispatch();
    const match = useRouteMatch({
        path: '/profile/orders',
        strict: true,
        sensitive: true,
    });
    useEffect(() => {
        // console.log('hello! orders!');

        dispatch({
            type: WS_CONNECTION_START,
            payload: '?token=' + getCookie('accessToken'),
        });

        return () => {
            // console.log('goodbye! orders!');
            dispatch({ type: WS_CONNECTION_CLOSED });
        };
    }, []);

    const { ingredients, payload } = useSelector(
        (store) => ({
            ingredients: store.component.ingredients,
            payload: store.sockets.payload,
        }),
        shallowEqual
    );

    return (
        // контенер с заказами
        <div className={profileStyles.ordersContainer}>
            <div className={profileStyles.orders}>
                {payload &&
                    payload.orders.map((element: any) => (
                        // карточка заказа
                        <div
                            className={profileStyles.orderPosition}
                            key={uuidv4()}
                            onClick={(): void => {
                                props.onActive(element);
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
