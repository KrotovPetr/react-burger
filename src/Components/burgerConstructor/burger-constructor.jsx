import React from 'react';
import constStyles from './burger-constructor.module.css';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {
    const refRoot = document.getElementById('modal-order');
    const myData = props.compList;
    const [isActive, setActive] = React.useState(false);
    const turnOff = () => {
        setActive(false);
    };
    const turnOn = () => {
        setActive(true);
    };
    return (
        <div className={constStyles.area}>
            <div className={constStyles.orderArea}>
                <div className={constStyles.order}>
                    <div className={constStyles.edgeElement}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={myData.length > 0 ? myData[0].image : ''}
                        />
                    </div>

                    {/*Блок формирования центральной части бургера*/}
                    <div className={constStyles.middle}>
                        {createPortal(
                            <Modal
                                active={isActive}
                                turnOff={turnOff}
                                typeOfModal="order"
                            />,
                            refRoot
                        )}

                        {props.compList.map(
                            (cards, index) =>
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
                                                        cards['image_mobile']
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
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={200}
                            thumbnail={myData.length > 0 ? myData[0].image : ''}
                        />
                    </div>
                </div>

                {/*Блок цены*/}
                <div className={constStyles.price}>
                    <div className={constStyles.priceArea}>
                        <p className="text text_type_digits-medium">210</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div
                        onClick={() => {
                            turnOn();
                        }}>
                        <Button type="primary" size="large">
                            Оформить заказ
                        </Button>
                    </div>
                </div>
                {/*Конец блока цены*/}
            </div>
        </div>
    );
};

BurgerConstructor.propTypes = { compList: PropTypes.array.isRequired };

export default BurgerConstructor;
