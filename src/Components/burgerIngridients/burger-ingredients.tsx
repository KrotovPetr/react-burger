import React, { FC, useState } from 'react';
import ingredientsBurger from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientList from './ingredientList/ingredient-list';
import appStyles from '../app/app.module.css';
import { scrollFunction } from '../../utils/functions/scrollFunction';

const BurgerIngredients: FC = () => {
    const [current, setCurrent] = useState<string>('one');
    // console.log(cardData);

    return (
        <div className={ingredientsBurger.constructorR}>
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
                onScroll={(): void => {
                    let scrollFunctionResp: string | undefined =
                        scrollFunction();
                    if (scrollFunctionResp) {
                        setCurrent(scrollFunctionResp);
                    }
                }}>
                {/*{isActive && cardData && <IngredientModal onClose={() => {}} />}*/}
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

//propTypes - нету
export default BurgerIngredients;
