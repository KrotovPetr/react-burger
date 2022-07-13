import React, { FC, useEffect, useState } from 'react';
import orderStyle from '../../pages/Order/order.module.css';
import { getColourType } from '../../utils/functions/getColour';
import { getText } from '../../utils/functions/getText';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { checkResponse } from '../../utils/functions/checkResponse';
import { useRouteMatch } from 'react-router-dom';
import { getInfo } from '../../utils/functions/getInfo';
import { getOrderPrice } from '../../utils/functions/getPrice';
import { useSelector } from '../../utils/types/store';
import { TCard, TData } from '../../utils/types/types';
import { getDate } from '../../utils/functions/getDate';

const OrderIngredients: FC = () => {
    // console.log('orderIngredients');
    // копия данных
    const [copyData, setCopyData] = useState<TCard[]>([]);
    // данные
    const [data, setData] = useState<undefined | null | TData>(undefined);
    // цена
    const [price, setPrice] = useState<number>(0);
    const { url } = useRouteMatch();
    const { ingredients, ordersActive, personOrdersActive } = useSelector(
        (store) => ({
            ingredients: store.component.ingredients,
            ordersActive: store.requests.ordersActive,
            personOrdersActive: store.requests.personOrdersActive,
        })
    );

    // запрос на сервер по заказу
    useEffect(() => {
        let cleanupFunction = false;
        if (!cleanupFunction) {
            if (ordersActive && url.split('/')[1] === 'feed') {
                fetch(
                    ' https://norma.nomoreparties.space/api/orders/' +
                        ordersActive.number
                )
                    .then(checkResponse)
                    .then((result: any) => {
                        // console.log(result);
                        result && setData(result);
                    })
                    .catch((e) => console.error(e));
            } else {
                personOrdersActive &&
                    fetch(
                        ' https://norma.nomoreparties.space/api/orders/' +
                            personOrdersActive.number
                    )
                        .then(checkResponse)
                        .then((result: any) => {
                            result && setData(result);
                        })
                        .catch((e) => console.error(e));
            }
            if (
                !personOrdersActive &&
                !ordersActive &&
                url.split('/')[1] === 'feed'
            ) {
                fetch(
                    ' https://norma.nomoreparties.space/api/orders/' +
                        url.split('/')[2]
                )
                    .then(checkResponse)
                    .then((result: any) => {
                        result && setData(result);
                    })
                    .catch((e) => console.error(e));
                // setData(null);
            }
            if (
                !personOrdersActive &&
                !ordersActive &&
                url.split('/')[1] === 'profile'
            ) {
                fetch(
                    ' https://norma.nomoreparties.space/api/orders/' +
                        url.split('/')[2]
                )
                    .then(checkResponse)
                    .then((result: any) => {
                        result && setData(result);
                    })
                    .catch((e) => console.error(e));
                // setData(null);
            }
        }

        return () => {
            cleanupFunction = true;
        };
    }, [ingredients]);

    // эффект для составления списка
    useEffect(() => {
        let cleanupFunction = false;
        !cleanupFunction && data && getInformation();
        return () => {
            cleanupFunction = true;
        };
    }, [data]);

    // эффект для установки цены
    useEffect(() => {
        let cleanupFunction = false;
        if (!cleanupFunction) {
            ordersActive &&
                setPrice(getOrderPrice(ordersActive.ingredients, ingredients));
            personOrdersActive &&
                setPrice(
                    getOrderPrice(personOrdersActive.ingredients, ingredients)
                );
            // console.log(data);
            data &&
                setPrice(
                    getOrderPrice(data.orders[0].ingredients, ingredients)
                );
        }
        return () => {
            cleanupFunction = true;
        };
    }, [ordersActive]);

    // функция составления списка заказа и количества ингредиентов
    const getInformation = () => {
        let ingredientCopyObject: any = JSON.stringify(ingredients);
        ingredientCopyObject = JSON.parse(ingredientCopyObject);
        if (data) {
            for (
                let i: number = 0;
                i < data.orders[0].ingredients.length;
                i++
            ) {
                for (let j: number = 0; j < ingredientCopyObject.length; j++) {
                    if (
                        data.orders[0].ingredients[i] ===
                        ingredientCopyObject[j]['_id']
                    ) {
                        ingredientCopyObject[j]['__v']++;
                    }
                }
            }
        }
        setCopyData(ingredientCopyObject);
    };

    return (
        <div>
            {/*оформления детального вывода заказа*/}
            {data && (
                <div className={orderStyle.dataContainer}>
                    {/*номер заказа*/}
                    <p
                        className={
                            orderStyle.orderNumber +
                            ' text text_type_digits-default'
                        }>
                        #{data.orders[0].number}
                    </p>
                    {/*название заказа*/}
                    <p
                        className={
                            orderStyle.orderName + ' text text_type_main-medium'
                        }>
                        {data.orders[0].name}
                    </p>
                    {/*статус*/}
                    <p
                        className={
                            orderStyle.orderStatus +
                            ' text text_type_main-default ' +
                            getColourType(data.orders[0].status)
                        }>
                        {getText(data.orders[0].status)}
                    </p>
                    <p
                        className={
                            orderStyle.orderIngredients +
                            ' text text_type_main-medium'
                        }>
                        Состав:
                    </p>
                    {/*иконочки с ингредиентами*/}
                    <div className={orderStyle.ingredientsContainer}>
                        {copyData.length > 0 &&
                            copyData.map((elem: TCard): any =>
                                elem['__v'] > 0 ? (
                                    <div
                                        className={orderStyle.ingredientCard}
                                        key={uuidv4()}>
                                        <div
                                            className={
                                                orderStyle.photoContainer
                                            }>
                                            <img
                                                className={orderStyle.photo}
                                                src={
                                                    copyData[
                                                        getInfo(
                                                            elem['_id'],
                                                            ingredients
                                                        )
                                                    ].image_mobile
                                                }
                                                alt="Ingredients"
                                                height="56px"
                                                width="56px"
                                            />
                                        </div>
                                        <p className="text text_type_main-default">
                                            {
                                                copyData[
                                                    getInfo(
                                                        elem['_id'],
                                                        ingredients
                                                    )
                                                ].name
                                            }
                                        </p>
                                        <div
                                            className={
                                                orderStyle.ingredientPriceContainer
                                            }>
                                            <p className="text text_type_digits-default">
                                                {
                                                    copyData[
                                                        getInfo(
                                                            elem['_id'],
                                                            ingredients
                                                        )
                                                    ]['__v']
                                                }
                                                &#215;{' '}
                                                {
                                                    copyData[
                                                        getInfo(
                                                            elem['_id'],
                                                            ingredients
                                                        )
                                                    ].price
                                                }
                                                {'  '}
                                                <CurrencyIcon type="primary" />
                                            </p>
                                        </div>
                                    </div>
                                ) : null
                            )}
                    </div>
                    <div className={orderStyle.otherInfo}>
                        <p className="text text_type_main-default text_color_inactive">
                            {getDate(data.orders[0].createdAt)}
                        </p>
                        <div className={orderStyle.price}>
                            <p className="text text_type_main-medium">
                                {getOrderPrice(
                                    data.orders[0].ingredients,
                                    ingredients
                                )}
                            </p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderIngredients;
