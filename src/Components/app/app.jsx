import React from 'react';
import Header from "../header/header";
import BurgerConstructor from "../burgerConstructor/burger-constructor";
import BurgerIngridients from "../burgerIngridients/burger-ingridients";
import appStyles from "./app.module.css"
const App = () => {


    return (
        <>
            <Header/>
            <div className = {appStyles.page}>
                <main className={appStyles.main}>
                    <BurgerIngridients className={appStyles.burgerIngredients}/>
                    <BurgerConstructor className={appStyles.burgerConstructor}/>
                </main>
            </div>
        </>
    );
};

export default App;