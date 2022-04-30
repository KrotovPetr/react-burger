import React, { useEffect, useState } from 'react';
import ingredientsBurger from './burger-ingridients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientList from './ingredientList/ingredient-list';
import appStyles from '../app/app.module.css';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import IngredientDetails from '../ingredientDetails/ingredient-details';

const BurgerIngridients = (props) => {
    const [current, setCurrent] = useState('one');
    const [data, setData] = useState(null);
    const [isActive, setActive] = useState(false);
    const turnOff = () => {
        setActive(false);
    };
    const turnOn = () => {
        setActive(true);
    };

    return (
        <div className={ingredientsBurger.constructor}>
            <h1 className={appStyles.app_text + 'text text_type_main-large'}>
                Соберите бургер
            </h1>
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
            <section className={ingredientsBurger.menu}>
                {isActive && (
                    <Modal turnOff={turnOff} title={'Детали ингредиента'}>
                        <IngredientDetails data={data} />
                    </Modal>
                )}

                <section>
                    <p className="text text_type_main-medium " id="bun">
                        Булки
                    </p>
                    <div className={ingredientsBurger.cardList}>
                        <IngredientList
                            typeOfMeal="bun"
                            compList={props.compList}
                            turnOn={turnOn}
                            setData={setData}
                        />
                    </div>
                </section>
                <section>
                    <p className="text text_type_main-medium" id="sauce">
                        Соусы
                    </p>
                    <div className={ingredientsBurger.cardList}>
                        <IngredientList
                            typeOfMeal="sauce"
                            compList={props.compList}
                            turnOn={turnOn}
                            setData={setData}
                        />
                    </div>
                </section>
                <section>
                    <p className="text text_type_main-medium" id="main">
                        Начинки
                    </p>
                    <div className={ingredientsBurger.cardList}>
                        <IngredientList
                            typeOfMeal="main"
                            compList={props.compList}
                            turnOn={turnOn}
                            setData={setData}
                        />
                    </div>
                </section>
            </section>
        </div>
    );
};

// Передаётся массив данных
BurgerIngridients.propTypes = {
    compList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerIngridients;
