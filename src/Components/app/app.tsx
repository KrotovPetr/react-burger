import React, { FC, useEffect } from 'react';
import Header from '../header/header';
import appStyles from './app.module.css';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../Services/actions/components';
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
import { IS_AUTH } from '../../Services/actions/requestsActions';
import IngredientModal from '../IngredientModal/IngredientModal';
import { Location } from 'history';

// type TSelector = {
//     // component: {
//     //     isActiv: boolean;
//     //     cardData: {
//     //         calories: number;
//     //         carbohydrates: number;
//     //         fat: number;
//     //         image: string;
//     //         image_large: string;
//     //         image_mobile: string;
//     //         price: number;
//     //         proteins: number;
//     //         type: string;
//     //         __v: number;
//     //         _id: string;
//     //     } | null;
//     // };
//     // requests: {
//     //     isLogin: boolean;
//     //     baseURL: string;
//     // };
//     component: any;
//     requests: any;
// };

// type TLocation = {
//     background
// }

const App: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation<{ background: Location | undefined }>();
    const { isActive, cardData, isLogin, baseURL } = useSelector(
        (store: any) => ({
            isActive: store.component.isActiv,
            cardData: store.component.cardData,
            isLogin: store.requests.isLogin,
            baseURL: store.requests.baseURL,
        }),
        shallowEqual
    );

    //задаём состояние подложки для модалки
    let background: Location | undefined =
        location.state && location.state.background;

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

    return (
        <>
            {/*шапка с роутингом*/}
            <Header />

            {/*роуты*/}
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
                    <ProtectedRoute path={'/profile'}>
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
                    <Route
                        path="/ingredients/:id"
                        children={<IngredientModal />}
                    />
                )}
            </div>
        </>
    );
};

export default App;
