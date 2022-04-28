import React, { useEffect, useReducer, useState } from 'react';
import Header from '../header/header';
import BurgerIngridients from '../burgerIngridients/burger-ingridients';
import appStyles from './app.module.css';
import BurgerConstructor from '../burgerConstructor/burger-constructor';
import { AppContext } from '../../Services/appContext';

const App = () => {
    // ccылка
    const refURL = 'https://norma.nomoreparties.space/api/ingredients';

    //массив всех компонентов
    const [state, setState] = useState([]);

    // функция записи в состояния
    const reducer = (order, action) => {
        switch (action.type) {
            case 'addBun':
                return order.buns.length > 0
                    ? { ...order }
                    : {
                          ...order,
                          buns: [...order.buns, action.data],
                          totalPrice: order.totalPrice + 2 * action.data.price,
                      };
            case 'addIngr':
                return {
                    ...order,
                    components: [...order.components, action.data],
                    totalPrice: order.totalPrice + action.data.price,
                };
            default:
                throw new Error(`Wrong type of action: ${action.type}`);
        }
    };

    const [order, dispatch] = useReducer(reducer, {
        buns: [],
        components: [],
        totalPrice: 0,
    });

    const changeOrder = (card) => {
        card && card.type === 'bun'
            ? dispatch({ type: 'addBun', data: card })
            : dispatch({ type: 'addIngr', data: card });
    };

    //взаимодействие с контекстом
    const user = {
        bunsArr: order.buns,
        compArr: order.components,
        totalPrice: order.totalPrice,
        setOrder: changeOrder,
        answer: {},
    };

    //fetch запрос при отрисовке
    useEffect(() => {
        fetchData();
    }, []);

    // функция получения json
    const fetchData = () => {
        fetch(refURL)
            .then((result) => {
                if (result.ok) {
                    return result.json();
                }
                return Promise.reject(`Ошибка ${result.status}`);
            })
            .then((result) => {
                setState(result.data);
            })
            .catch((e) => console.error(e));
    };

    return (
        <>
            <Header />
            <div className={appStyles.page}>
                <main className={appStyles.main}>
                    <AppContext.Provider value={user}>
                        <BurgerIngridients
                            className={appStyles.burgerIngredients}
                            compList={state.length > 0 ? state : []}
                        />
                        <BurgerConstructor
                            className={appStyles.burgerConstructor}
                        />
                    </AppContext.Provider>
                </main>
            </div>
        </>
    );
};

export default App;
