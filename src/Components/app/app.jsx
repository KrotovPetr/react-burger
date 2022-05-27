import React, { useEffect } from 'react';
import Header from '../header/header';
import appStyles from './app.module.css';
import { Provider, shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchData, setActive } from '../../Services/actions/components';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Login from '../../pages/login/login';
import Registration from '../../pages/registration/registration';
import ForgotPassword from '../../pages/forgotPassword/forgot-password';
import ResetPassword from '../../pages/resetPassword/reset-password';
import Profile from '../../pages/profile/profile';
import Home from '../../pages/home/home';
import Ingredient from '../../pages/ingredientPage/ingredient';
import { getCookie } from '../../Services/actions/requestsActions';
import ProtectedRoute from '../protectedRoute/protected-route';
import NotFoundPage from '../../pages/404Page/not-found-page';
const App = () => {
    const dispatch = useDispatch();

    //вытаскивание из хранилища данных
    const { refURL, isActive } = useSelector(
        (store) => ({
            refURL: store.component.refURL,
            isActive: store.component.isActiv,
        }),
        shallowEqual
    );

    //fetch запрос при отрисовке
    useEffect(() => {
        dispatch(fetchData(refURL));
    }, []);

    return (
        <Router>
            <>
                <Header />
                <div className={appStyles.page}>
                    <Switch>
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
                            {!isActive &&
                            getCookie('isActive') === undefined ? (
                                <Ingredient />
                            ) : (
                                <Home />
                            )}
                        </Route>
                        <Route>
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </div>
            </>
        </Router>
    );
};

export default App;
