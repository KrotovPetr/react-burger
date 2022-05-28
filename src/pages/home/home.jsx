import React from 'react';
import appStyles from '../../Components/app/app.module.css';
import BurgerIngredients from '../../Components/burgerIngridients/burger-ingredients';
import BurgerConstructor from '../../Components/burgerConstructor/burger-constructor';

const Home = () => {
    return (
        <div>
            <main className={appStyles.main}>
                <BurgerIngredients className={appStyles.burgerIngredients} />
                <BurgerConstructor />
            </main>
        </div>
    );
};

export default Home;
