import React, { FC } from 'react';
import appStyles from '../../Components/app/app.module.css';
import BurgerIngredients from '../../Components/burgerIngridients/burger-ingredients';
import BurgerConstructor from '../../Components/burgerConstructor/burger-constructor';

const Home: FC = () => {
    return (
        <div>
            <main className={appStyles.main}>
                <div className={appStyles.burgerIngredients}>
                    <BurgerIngredients />
                </div>

                <BurgerConstructor />
            </main>
        </div>
    );
};

//propTypes - нету
export default Home;
