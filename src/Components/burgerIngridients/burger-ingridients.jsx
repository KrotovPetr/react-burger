import React from 'react';
import ingredientsBurger from "./burger-ingridients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientList from "./ingredientList/ingredient-list";
import appStyles from "../app/app.module.css";


const BurgerIngridients = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={ingredientsBurger.constructor}>
            <h1 className={appStyles.app_text+ "text text_type_main-large"}>Соберите бургер</h1>
            <div className={ingredientsBurger.tabArea}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <section className={ingredientsBurger.menu}>
                <section >
                    <p className="text text_type_main-medium "  id="bun">Булки</p>
                    <div className={ingredientsBurger.cardList}>
                        <IngredientList typeOfMeal="bun" />
                    </div>
                </section>
                <section>
                    <p className="text text_type_main-medium" id="sauce" >Соусы</p>
                    <div className={ingredientsBurger.cardList}>
                        <IngredientList typeOfMeal="sauce" />
                    </div>

                </section>
                <section >
                    <p className="text text_type_main-medium" id="main">Начинки</p>
                    <div className={ingredientsBurger.cardList}>
                        <IngredientList typeOfMeal="main" />
                    </div>
                </section>
            </section>
        </div>
    );

};




export default BurgerIngridients;