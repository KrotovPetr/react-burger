import React, { useEffect, useState } from 'react';
import resetStyles from './reset.module.css';
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import '../../commonStyles/styles.css';
import { Redirect, useHistory } from 'react-router-dom';
import {
    getCookie,
    resetRequest,
} from '../../Services/actions/requestsActions';
import { useDispatch, useSelector } from 'react-redux';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const { resetURL, resetRequestSuccess, resetRequestError } = useSelector(
        (store) => ({
            resetURL: store.requests.resetURL,
            resetRequestSuccess: store.requests.resetRequestSuccess,
            resetRequestError: store.requests.resetRequestError,
        })
    );

    useEffect(() => {
        resetRequestSuccess &&
            !resetRequestError &&
            history.replace({ pathname: '/login' });
    }, [resetRequestSuccess, resetRequestError]);

    const dispatch = useDispatch();
    const history = useHistory();

    const isAuth = () => {
        return getCookie('accessToken') !== undefined;
    };
    const isForgot = () => {
        return getCookie('forgot') === undefined;
    };

    console.log(isAuth(), ' ', isForgot());
    if (isAuth()) {
        return (
            <Redirect
                to={{
                    pathname: '/',
                }}
            />
        );
    } else if (isForgot()) {
        return (
            <Redirect
                to={{
                    pathname: '/forgot-password',
                }}
            />
        );
    }

    console.log(isForgot(), ' ', getCookie('accessToken'));
    if (isForgot()) {
        return (
            <Redirect
                to={{
                    pathname: '/',
                }}
            />
        );
    }

    return (
        <div className={resetStyles.commonContainer}>
            <div className={resetStyles.formContainer}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
                <PasswordInput
                    onChange={(e) => setPassword(e.target.value)}
                    className="input"
                    value={password}
                    name={'password'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={(e) => setToken(e.target.value)}
                    className="input"
                    value={token}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <div className={resetStyles.buttonContainer}>
                    <Button
                        type="primary"
                        size="medium"
                        onClick={() => {
                            dispatch(resetRequest(password, token, resetURL));
                        }}>
                        Сохранить
                    </Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль?{' '}
                    <span
                        className="text text_type_main-default text_color_inactive"
                        onClick={() => history.replace({ pathname: '/login' })}>
                        {' '}
                        Войти
                    </span>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;
