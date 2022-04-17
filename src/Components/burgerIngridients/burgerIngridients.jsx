import React from 'react';
import ingridientsBurger from "./burgerIngridients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import Card from "./Card/card";
const BurgerIngridients = () => {
    const [current, setCurrent] = React.useState('one')


    return (

        <div className={ingridientsBurger.constructor}>
            <div className={ingridientsBurger.tabArea}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent} className={ingridientsBurger.tab_tab__tYY6Z} >
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent} href="#sauce">
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent} href="#main">
                    Начинки
                </Tab>
            </div>
            <section className={ingridientsBurger.menu}>
                <section >
                    <p className="text text_type_main-medium "  id="bun">Булки</p>
                    <Card typeOfMeal="bun"/>
                </section>
                <section>
                    <p className="text text_type_main-medium" id="sauce">Соусы</p>
                    <Card typeOfMeal="sauce"/>
                </section>
                <section>
                    <p className="text text_type_main-medium" id="main">Начинки</p>
                    <Card typeOfMeal="main"/>
                </section>
            </section>
        </div>
    );
};

export default BurgerIngridients;