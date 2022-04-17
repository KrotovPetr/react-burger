import React from 'react';
import constStyles from "./burgerConstructor.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
const BurgerConstructor = () => {
    const state = data();
    return (
        <div className={constStyles.area}>
            <div className={constStyles.order}>
                <ConstructorElement
                    className = {constStyles.edgeContent}
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={state.cards[0].image_mobile}
                />
                <div className={constStyles.middle}>{
                    state.cards.map((cards, index) => (
                        <div className={constStyles.position}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={cards.name}
                                price={cards.price}
                                thumbnail={cards.image_mobile}
                            />
                        </div>

                    ))
                }
                </div>
                    <ConstructorElement
                        className = {constStyles.edgeContent}
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={state.cards[0].image_mobile}
                    />
            </div>
            <div className={constStyles.price}>
                <p className="text text_type_digits-medium"> 210</p>
                <CurrencyIcon type="primary" />
                <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </div>
    );
};

export default BurgerConstructor;