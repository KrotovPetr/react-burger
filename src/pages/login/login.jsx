import React, { useState } from 'react';
import loginStyles from './login.module.css';
import '../../commonStyles/styles.css';
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    enterRequest,
    getCookie,
} from '../../Services/actions/requestsActions';

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { enterURL, isLogout } = useSelector((store) => ({
        enterURL: store.requests.enterURL,
        isLogout: store.requests.isLogout,
    }));
    const isAuth = () => {
        return getCookie('accessToken') !== undefined;
    };

    // console.log(isAuth(), ' ', getCookie('accessToken'));
    if (isAuth()) {
        return (
            <Redirect
                to={{
                    pathname: '/',
                }}
            />
        );
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
                <div className={loginStyles.inputContainer}>
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
                    <PasswordInput
                        className="input"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                    />
                </div>
                <div className={loginStyles.buttonContainer}>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            dispatch(enterRequest(email, password, enterURL));
                        }}>
                        <p className="text text_type_main-default ">Войти</p>
                    </Button>
                </div>

                <p className="text text_type_main-default text_color_inactive">
                    Вы новый пользователь?
                    <span
                        className="text text_type_main-default text_color_inactive"
                        onClick={() =>
                            history.replace({ pathname: '/register' })
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
