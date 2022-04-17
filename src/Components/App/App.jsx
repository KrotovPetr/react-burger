import React from 'react';
import Header from "../header/header";
import BurgerConstructor from "../burgerConstructor/burgerConstructor";
import BurgerIngridients from "../burgerIngridients/burgerIngridients";
import appStyles from "./app.module.css"
import "./appStyles.css"
const App = () => {


    return (
        <>
        <Header/>
            <p className="app_text text text_type_main-large">Соберите бургер</p>
        <main className={appStyles.main}>
          <BurgerIngridients className={appStyles.burgerIngredients}/>
          <BurgerConstructor className={appStyles.burgerConstructor}/>
        </main>
        </>
    );
};

export default App;