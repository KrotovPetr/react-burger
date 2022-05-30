import React, { useEffect, useState } from 'react';
import forgotStyles from './forgot.module.css';
import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import '../../commonStyles/styles.css';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotRequest } from '../../Services/actions/requestsActions';

const ForgotPassword = () => {
    const [forgot, setForgot] = useState('');
    const dispatch = useDispatch();
    const { baseURL, forgotRequestSuccess, forgotRequestError, isLogin } =
        useSelector((store) => ({
            baseURL: store.requests.baseURL,
            forgotRequestSuccess: store.requests.forgotRequestSuccess,
            forgotRequestError: store.requests.forgotRequestError,
            isLogin: store.requests.isLogin,
        }));

    const history = useHistory();

    useEffect(() => {
        forgotRequestSuccess &&
            !forgotRequestError &&
            history.replace({ pathname: '/reset-password' });
    }, [forgotRequestSuccess, forgotRequestError]);

    // console.log(isAuth(), ' ', getCookie('accessToken'));
    if (isLogin) {
        return (
            <Redirect
                to={{
                    pathname: '/',
                }}
            />
        );
    }

    return (
        <div className={forgotStyles.commonContainer}>
            <form
                className={forgotStyles.formContainer}
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(forgotRequest(baseURL, forgot));
                }}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
                <label>
                    <Input
                        type={'text'}
                        placeholder={'Email'}
                        onChange={(e) => setForgot(e.target.value)}
                        className="input"
                        value={forgot}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </label>
                <div className={forgotStyles.buttonContainer}>
                    <Button type="primary" size="medium">
                        Восстановить
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

//propTypes - нету
export default ForgotPassword;
