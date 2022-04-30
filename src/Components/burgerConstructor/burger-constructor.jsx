import React, { useContext, useState } from 'react';
import constStyles from './burger-constructor.module.css';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import { AppContext } from '../../Services/appContext';
import OrderDetails from '../orderDetails/order-details';

const BurgerConstructor = () => {
    //подвязка к контексту
    const appData = useContext(AppContext);
    const fetchURL = 'https://norma.nomoreparties.space/api/orders';
    //состояние под ответ
    const [orderInfo, setOrderInfo] = useState(null);
    //функция составления массива
    const getOrder = () => {
        const ingredients = [appData.buns, ...appData.compArr, appData.buns];
        const ingredientIds = ingredients.map((ingredient) => ingredient._id);

        //запрос
        fetch(fetchURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ ingredients: ingredientIds }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            })
            .then((data) => setOrderInfo(data))
            .catch((e) => console.error(e));

        //включение модалки
        turnOn();
    };

    //состояние модального окна
    const [isActive, setActive] = useState(false);

    //выключение модального окна
    const turnOff = () => {
        setActive(false);
    };

    //включение модального окна
    const turnOn = () => {
        setActive(true);
    };

    return (
        <div className={constStyles.area}>
            <div className={constStyles.orderArea}>
                <div className={constStyles.order}>
                    <div className={constStyles.edgeElement}>
                        {appData.buns && (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={appData.buns.name}
                                price={appData.buns.price}
                                thumbnail={appData.buns.image}
                            />
                        )}
                    </div>
                    {/*Блок формирования центральной части бургера*/}
                    <div className={constStyles.middle}>
                        {isActive && orderInfo && (
                            <Modal turnOff={turnOff}>
                                <OrderDetails
                                    data={
                                        orderInfo ? orderInfo.order.number : 0
                                    }
                                />
                            </Modal>
                        )}
                        {appData.compArr.length > 0 &&
                            appData.compArr.map(
                                (cards) =>
                                    cards.type !== 'bun' && (
                                        <div
                                            className={constStyles.position}
                                            key={cards['_id']}>
                                            <div className={constStyles.test}>
                                                <DragIcon type="primary" />
                                                <div
                                                    className={
                                                        constStyles.middleElement
                                                    }>
                                                    <ConstructorElement
                                                        text={cards.name}
                                                        price={cards.price}
                                                        thumbnail={
                                                            cards[
                                                                'image_mobile'
                                                            ]
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                            )}
                    </div>
                    {/*Конец блока части формирования центральной части*/}
                    <div className={constStyles.edgeElement}>
                        {appData.buns && (
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={appData.buns.name}
                                price={appData.buns.price}
                                thumbnail={appData.buns.image}
                            />
                        )}
                    </div>
                </div>
                {/*Блок цены*/}
                <div className={constStyles.price}>
                    <div className={constStyles.priceArea}>
                        <p className="text text_type_digits-medium">
                            {appData.totalPrice}
                        </p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div>
                        <Button
                            type="primary"
                            size="large"
                            onClick={getOrder}
                            disabled={appData.buns === null}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
                {/*Конец блока цены*/}
            </div>
        </div>
    );
};

//propTypes - нету

export default BurgerConstructor;
