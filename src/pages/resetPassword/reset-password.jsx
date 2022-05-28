import React, { useEffect, useState } from 'react';
import resetStyles from './reset.module.css';
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import '../../commonStyles/styles.css';
import { Redirect, useHistory } from 'react-router-dom';
import { resetRequest } from '../../Services/actions/requestsActions';
import { useDispatch, useSelector } from 'react-redux';
import { isForgot } from '../../utils/functions/isForgot';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const { baseURL, resetRequestSuccess, resetRequestError, isLogin } =
        useSelector((store) => ({
            baseURL: store.requests.baseURL,
            resetRequestSuccess: store.requests.resetRequestSuccess,
            resetRequestError: store.requests.resetRequestError,
            isLogin: store.requests.isLogin,
        }));

    useEffect(() => {
        resetRequestSuccess &&
            !resetRequestError &&
            history.replace({ pathname: '/login' });
    }, [resetRequestSuccess, resetRequestError]);

    const dispatch = useDispatch();
    const history = useHistory();

    if (isLogin) {
        return (
            <Redirect
                to={{
                    pathname: '/',
                }}
            />
        );
    }
    if (!isLogin && isForgot()) {
        return (
            <Redirect
                to={{
                    pathname: '/forgot-password',
                }}
            />
        );
    }

    // console.log(isAuth(), ' ', isForgot());
    // console.log(
    //     isForgot(),
    //     ' ',
    //     getCookie('accessToken'),
    //     ' ',
    //     getCookie('forgot')
    // );

    return (
        <div className={resetStyles.commonContainer}>
            <form
                className={resetStyles.formContainer}
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(resetRequest(password, token, baseURL));
                }}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
                <label>
                    <PasswordInput
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                        value={password}
                        name={'password'}
                    />
                </label>
                <label>
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
                </label>
                <div className={resetStyles.buttonContainer}>
                    <Button type="primary" size="medium">
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
            </form>
        </div>
    );
};

export default ResetPassword;
