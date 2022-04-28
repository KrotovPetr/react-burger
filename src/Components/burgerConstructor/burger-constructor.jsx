import React, { useContext, useState } from 'react';
import constStyles from './burger-constructor.module.css';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import { AppContext } from '../../Services/appContext';
import OrderDetails from '../orderDetails/order-details';

const BurgerConstructor = () => {
    //подвязка к контексту
    const appData = useContext(AppContext);

    //состояние под ответ
    const [answer, setAnswer] = useState({});

    //функция составления массива
    const getOrder = () => {
        let commonArr = { ingredients: [] };
        appData.compArr.length > 0 &&
            appData.compArr.map((card) => {
                commonArr.ingredients.push(card['_id']);
            });
        appData.bunsArr.map(() => {
            commonArr.ingredients.push(appData.bunsArr[0]['_id']);
            commonArr.ingredients.unshift(appData.bunsArr[0]['_id']);
        });

        //запрос
        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(commonArr),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            })
            .then((data) => setAnswer(data))
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
                        {appData.bunsArr.length > 0 && (
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={appData.bunsArr[0].name}
                                price={appData.bunsArr[0].price}
                                thumbnail={appData.bunsArr[0].image}
                            />
                        )}
                    </div>
                    {/*Блок формирования центральной части бургера*/}
                    <div className={constStyles.middle}>
                        {isActive && answer && (
                            <Modal turnOff={turnOff}>
                                <OrderDetails
                                    name={answer.name}
                                    data={answer.order}
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
                        {appData.bunsArr.length > 0 && (
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={appData.bunsArr[0].name}
                                price={appData.bunsArr[0].price}
                                thumbnail={appData.bunsArr[0].image}
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
                            onClick={
                                appData.bunsArr.length > 0
                                    ? getOrder
                                    : console.log('Булки не выбраны')
                            }>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
                {/*Конец блока цены*/}
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = {
    totalPrice: PropTypes.number,
    bunsArr: PropTypes.array,
    compArr: PropTypes.array,
};

export default BurgerConstructor;
