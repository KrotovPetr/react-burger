import React, { useEffect } from 'react';
import Header from '../header/header';
import BurgerIngredients from '../burgerIngridients/burger-ingredients';
import appStyles from './app.module.css';
import BurgerConstructor from '../burgerConstructor/burger-constructor';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../Services/actions/components';
const App = () => {
    const dispatch = useDispatch();

    //вытаскивание из хранилища данных
    const { refURL } = useSelector(
        (store) => ({
            refURL: store.component.refURL,
        }),
        shallowEqual
    );

    //fetch запрос при отрисовке
    useEffect(() => {
        dispatch(fetchData(refURL));
    }, []);

    return (
        <>
            <Header />
            <div className={appStyles.page}>
                <main className={appStyles.main}>
                    <BurgerIngredients
                        className={appStyles.burgerIngredients}
                    />
                    <BurgerConstructor />
                </main>
            </div>
        </>
    );
};

export default App;
