import React, { useEffect } from 'react';
import Header from '../header/header';
import appStyles from './app.module.css';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    clearInfo,
    fetchData,
    setActive,
    setData,
} from '../../Services/actions/components';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Login from '../../pages/login/login';
import Registration from '../../pages/registration/registration';
import ForgotPassword from '../../pages/forgotPassword/forgot-password';
import ResetPassword from '../../pages/resetPassword/reset-password';
import Profile from '../../pages/profile/profile';
import Home from '../../pages/home/home';
import Ingredient from '../../pages/ingredientPage/ingredient';
import ProtectedRoute from '../protectedRoute/protected-route';
import NotFoundPage from '../../pages/404Page/not-found-page';
import { getCookie } from '../../utils/functions/cookieFunctions/getCookie';
import { isAuth } from '../../utils/functions/isAuth';
import { IS_AUTH } from '../../Services/actions/requestsActions';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredientDetails/ingredient-details';
import ModalI from '../ModalI/ModalI';
const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const { isActive, cardData, refURL, isLogin } = useSelector(
        (store) => ({
            orderInfo: store.component.orderInfo,
            ingredients: store.component.ingredients,
            isActive: store.component.isActiv,
            cardData: store.component.cardData,
            refURL: store.component.refURL,
            isLogin: store.requests.isLogin,
        }),
        shallowEqual
    );

    let background = location.state && location.state.background;

    //fetch запрос при отрисовке
    useEffect(() => {
        dispatch(fetchData(refURL));
    }, []);

    useEffect(() => {
        const data = isAuth();
        dispatch({ type: IS_AUTH, data: data });
    }, [isLogin]);
    if (!cardData && background !== undefined) {
        location.state.background = undefined;
    }
    return (
        <>
            <Header />
            <div className={appStyles.page}>
                <Switch location={background || location}>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Registration />
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPassword />
                    </Route>
                    <Route path="/reset-password">
                        <ResetPassword />
                    </Route>
                    <ProtectedRoute path="/profile">
                        <Profile />
                    </ProtectedRoute>
                    <Route path="/ingredients/:id">
                        <Ingredient />
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
                {background && isActive && (
                    <Route path="/ingredients/:id" children={<ModalI />} />
                )}
            </div>
        </>
    );
};

export default App;
