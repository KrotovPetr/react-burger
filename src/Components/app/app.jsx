import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import BurgerIngridients from '../burgerIngridients/burger-ingridients';
import appStyles from './app.module.css';
import BurgerConstructor from '../burgerConstructor/burger-constructor';
const App = () => {
    const refURL = 'https://norma.nomoreparties.space/api/ingredients';
    const [state, setState] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    // получаем JSON
    const fetchData = () => {
        fetch(refURL)
            .then((response) => response.json())
            .then((result) => {
                setState(result.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <Header />
            <div className={appStyles.page}>
                <main className={appStyles.main}>
                    {/*бургер левая часть*/}
                    <BurgerIngridients
                        className={appStyles.burgerIngredients}
                        compList={state.length > 0 ? state : []}
                    />

                    {/*бургер правая часть*/}
                    <BurgerConstructor
                        className={appStyles.burgerConstructor}
                        compList={state.length > 0 ? state : []}
                    />
                </main>
            </div>
        </>
    );
};

export default App;
