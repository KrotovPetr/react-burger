import React from 'react';
import constStyles from "./burger-constructor.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
const BurgerConstructor = () => {
    const state = data();
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
                            thumbnail={state.cards[0].image_mobile}
                        />
                    </div>

                    {/*Блок формирования центральной части бургера*/}
                    <div className={constStyles.middle}>{
                        state.cards.map((cards, index) => (
                            <div className={constStyles.position} key={cards._id}>
                                {cards.type !== "bun" &&
                                    <div className={constStyles.test}>
                                        <DragIcon type="primary" />
                                        <div className = {constStyles.middleElement}>
                                            <ConstructorElement
                                                text={cards.name}
                                                price={cards.price}
                                                thumbnail={cards.image_mobile}

                                            />
                                        </div>
                                    </div>
                                }

                            </div>

                        ))
                    }
                    </div>
                    {/*Конец блока части формирования центральной части*/}
                    <div className={constStyles.edgeElement}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={200}
                            thumbnail={state.cards[0].image_mobile}
                        />
                    </div>

                </div>

                {/*Блок цены*/}
                <div className={constStyles.price}>
                    <div className={constStyles.priceArea}>
                        <p className="text text_type_digits-medium">210</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="large">Оформить заказ</Button>
                </div>
                {/*Конец блока цены*/}
            </div>
        </div>
    );
};

export default BurgerConstructor;