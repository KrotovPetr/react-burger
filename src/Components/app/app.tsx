import React, { FC, useEffect } from 'react';
import Header from '../header/header';
import appStyles from './app.module.css';
import { shallowEqual } from 'react-redux';
import { fetchData } from '../../Services/actions/componentAction/components';
import { Route, Switch, useLocation } from 'react-router-dom';
import Login from '../../pages/login/login';
import Registration from '../../pages/registration/registration';
import ForgotPassword from '../../pages/forgotPassword/forgot-password';
import ResetPassword from '../../pages/resetPassword/reset-password';
import Profile from '../../pages/profile/profile';
import Home from '../../pages/home/home';
import Ingredient from '../../pages/ingredientPage/ingredient';
import ProtectedRoute from '../protectedRoute/protected-route';
import NotFoundPage from '../../pages/404Page/not-found-page';
import { isAuth } from '../../utils/functions/isAuth';
import { IS_AUTH } from '../../Services/actions/requestAction/requestsActions';
import IngredientModal from '../Modals/IngredientModal/IngredientModal';
import { Location } from 'history';
import FeedPage from '../../pages/Feed/feed';
import Order from '../../pages/Order/order';
import OrderModal from '../Modals/orderModal/order-modal';
import { useDispatch, useSelector } from '../../utils/types/store';

const App: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation<{
        background: Location | undefined;
        orderBackground: Location | undefined;
        personOrderBackground: Location | undefined;
    }>();

    useEffect(() => {
        dispatch(fetchData(baseURL + '/ingredients'));
    }, []);
    const {
        isActive,
        cardData,
        isLogin,
        baseURL,
        ordersActive,
        personOrdersActive,
    } = useSelector(
        (store) => ({
            isActive: store.component.isActiv,
            cardData: store.component.cardData,
            isLogin: store.requests.isLogin,
            baseURL: store.requests.baseURL,
            ordersActive: store.requests.ordersActive,
            personOrdersActive: store.requests.personOrdersActive,
        }),
        shallowEqual
    );
    // console.log(personOrdersActive);
    //задаём состояние подложки для модалки
    let background: Location | undefined =
        location.state && location.state.background;

    //задаём состояние подложки для модалки
    let orderBackground: Location | undefined =
        location.state && location.state.orderBackground;

    //задаём состояние подложки для модалки
    let personOrderBackground: Location | undefined =
        location.state && location.state.personOrderBackground;

    //fetch запрос на получение ингедиентов
    useEffect(() => {
        dispatch(fetchData(baseURL + '/ingredients'));
    }, []);

    //запрос на авторизацию
    useEffect(() => {
        const data: boolean = isAuth();
        dispatch({ type: IS_AUTH, data: data });
    }, [isLogin]);

    if (!cardData && background !== undefined) {
        location.state.background = undefined;
    }
    if (!ordersActive && orderBackground !== undefined) {
        location.state.orderBackground = undefined;
    }
    if (!personOrdersActive && personOrderBackground !== undefined) {
        location.state.personOrderBackground = undefined;
    }
    // console.log(personOrderBackground);
    // console.log('app');
    // console.log(orderBackground);
    return (
        <>
            {/*шапка с роутингом*/}
            <Header />

            {/*роуты*/}
            <div className={appStyles.page}>
                <Switch
                    location={
                        background ||
                        orderBackground ||
                        personOrderBackground ||
                        location
                    }>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login" exact={true}>
                        <Login />
                    </Route>
                    <Route path="/register" exact={true}>
                        <Registration />
                    </Route>
                    <Route path="/forgot-password" exact={true}>
                        <ForgotPassword />
                    </Route>
                    <Route path="/reset-password" exact={true}>
                        <ResetPassword />
                    </Route>
                    <Route path="/feed" exact={true}>
                        <FeedPage />
                    </Route>
                    <ProtectedRoute path={'/profile'} exact={true}>
                        <Profile />
                    </ProtectedRoute>
                    <ProtectedRoute path={'/profile/orders'} exact={true}>
                        <Profile />
                    </ProtectedRoute>
                    <ProtectedRoute path={'/profile/orders/:id'} exact={true}>
                        <Order />
                    </ProtectedRoute>
                    <Route path="/ingredients/:id" exact={true}>
                        <Ingredient />
                    </Route>
                    <Route path="/feed/:id" exact={true}>
                        <Order />
                    </Route>
                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
                {background && isActive && (
                    <Route
                        path="/ingredients/:id"
                        children={<IngredientModal />}
                    />
                )}
                {orderBackground && isActive && (
                    <Route path="/feed/:id" children={<OrderModal />} />
                )}
                {personOrderBackground && isActive && (
                    <Route
                        path="/profile/orders/:id"
                        children={<OrderModal />}
                    />
                )}
            </div>
        </>
    );
};

export default App;
