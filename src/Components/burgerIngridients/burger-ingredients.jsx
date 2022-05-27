import React, { useEffect, useState } from 'react';
import ingredientsBurger from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientList from './ingredientList/ingredient-list';
import appStyles from '../app/app.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredientDetails/ingredient-details';
import { shallowEqual, useSelector } from 'react-redux';

const BurgerIngredients = () => {
    const { isActive, cardData } = useSelector(
        (store) => ({
            isActive: store.component.isActiv,
            cardData: store.component.cardData,
        }),
        shallowEqual
    );

    const [current, setCurrent] = useState('one');

    return (
        <div className={ingredientsBurger.constructor}>
            {/*Заголовок*/}
            <h1 className={appStyles.app_text + 'text text_type_main-large'}>
                Соберите бургер
            </h1>

            {/*Панель*/}
            <div className={ingredientsBurger.tabArea}>
                <Tab
                    value="one"
                    active={current === 'one'}
                    onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab
                    value="two"
                    active={current === 'two'}
                    onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab
                    value="three"
                    active={current === 'three'}
                    onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            {/*Меню со всеми ингредиентами*/}
            <section
                className={ingredientsBurger.menu}
                id="menu"
                onScroll={(e) => {
                    const block = document.getElementById('menu');
                    const sauceBlock = document.getElementById('sauceSection');
                    const bunsBlock = document.getElementById('bunsSection');
                    const mainBlock = document.getElementById('mainSection');
                    if (
                        Math.abs(bunsBlock.offsetTop - block.scrollTop) <
                            Math.abs(sauceBlock.offsetTop - block.scrollTop) &&
                        Math.abs(bunsBlock.offsetTop - block.scrollTop) <
                            Math.abs(mainBlock.offsetTop - block.scrollTop)
                    ) {
                        setCurrent('one');
                    }
                    if (
                        Math.abs(sauceBlock.offsetTop - block.scrollTop) <
                            Math.abs(mainBlock.offsetTop - block.scrollTop) &&
                        Math.abs(sauceBlock.offsetTop - block.scrollTop) <
                            Math.abs(bunsBlock.offsetTop - block.scrollTop)
                    ) {
                        setCurrent('two');
                    }

                    if (
                        Math.abs(mainBlock.offsetTop - block.scrollTop) <
                            Math.abs(sauceBlock.offsetTop - block.scrollTop) &&
                        Math.abs(mainBlock.offsetTop - block.scrollTop) <
                            Math.abs(bunsBlock.offsetTop - block.scrollTop)
                    ) {
                        setCurrent('three');
                    }
                }}>
                {isActive && cardData && (
                    <Modal title={'Детали ингредиента'}>
                        <IngredientDetails />
                    </Modal>
                )}

                {/*Секция булок*/}
                <section id="bunsSection">
                    <p className="text text_type_main-medium " id="bun">
                        Булки
                    </p>
                    <div className={ingredientsBurger.cardList}>
                        <IngredientList typeOfMeal="bun" />
                    </div>
                </section>

                {/*Секция соусов*/}
                <section id="sauceSection">
                    <p className="text text_type_main-medium" id="sauce">
                        Соусы
                    </p>
                    <div className={ingredientsBurger.cardList}>
                        <IngredientList typeOfMeal="sauce" />
                    </div>
                </section>

                {/*Секция начинок*/}
                <section id="mainSection">
                    <p className="text text_type_main-medium" id="main">
                        Начинки
                    </p>
                    <div className={ingredientsBurger.cardList}>
                        <IngredientList typeOfMeal="main" />
                    </div>
                </section>
            </section>
        </div>
    );
};

export default BurgerIngredients;
