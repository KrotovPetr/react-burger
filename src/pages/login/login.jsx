import React, { useEffect, useState } from 'react';
import loginStyles from './login.module.css';
import '../../commonStyles/styles.css';
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearForgotCookie,
    enterRequest,
    getCookie,
} from '../../Services/actions/requestsActions';

const Login = () => {
    // console.log(typeof location.state.from.pathname);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { baseURL, isLogin } = useSelector((store) => ({
        baseURL: store.requests.baseURL,
        isLogin: store.requests.isLogin,
    }));
    const { state } = useLocation();

    useEffect(() => {
        dispatch(clearForgotCookie());
    }, []);

    // console.log(isAuth(), ' ', getCookie('accessToken'));
    if (isLogin) {
        return <Redirect to={{ pathname: state?.from.pathname || '/' }} />;
    }

    return (
        <div className={loginStyles.mainContainer}>
            <div className={loginStyles.formContainer}>
                <h1
                    className={
                        loginStyles.headerText + 'text text_type_main-medium'
                    }>
                    Войти
                </h1>

                <form
                    className={loginStyles.inputContainer}
                    onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(enterRequest(email, password, baseURL));
                    }}>
                    <label>
                        <Input
                            type={'text'}
                            placeholder={'Email'}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </label>
                    <label>
                        <PasswordInput
                            className="input"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name={'password'}
                        />
                    </label>

                    <div className={loginStyles.buttonContainer}>
                        <Button type="primary" size="small">
                            <p className="text text_type_main-default ">
                                Войти
                            </p>
                        </Button>
                    </div>
                </form>

                <p className="text text_type_main-default text_color_inactive">
                    Вы новый пользователь?
                    <span
                        className="text text_type_main-default text_color_inactive"
                        onClick={() =>
                            history.push({
                                pathname: '/register',
                                state: { url: state?.from.pathname },
                            })
                        }>
                        {' '}
                        Зарегистрироваться
                    </span>
                </p>

                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль?{' '}
                    <span
                        className="text text_type_main-default text_color_inactive"
                        onClick={() =>
                            history.replace({ pathname: '/forgot-password' })
                        }>
                        {' '}
                        Восстановить пароль
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
