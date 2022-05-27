import React, { useEffect, useState } from 'react';
import forgotStyles from './forgot.module.css';
import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import '../../commonStyles/styles.css';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    forgotRequest,
    getCookie,
} from '../../Services/actions/requestsActions';

const ForgotPassword = () => {
    const [forgot, setForgot] = useState('');
    const dispatch = useDispatch();
    const { forgotURL, forgotRequestSuccess, forgotRequestError } = useSelector(
        (store) => ({
            forgotURL: store.requests.forgotURL,
            forgotRequestSuccess: store.requests.forgotRequestSuccess,
            forgotRequestError: store.requests.forgotRequestError,
        })
    );

    const history = useHistory();

    useEffect(() => {
        forgotRequestSuccess &&
            !forgotRequestError &&
            history.replace({ pathname: '/reset-password' });
    }, [forgotRequestSuccess, forgotRequestError]);

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
        <div className={forgotStyles.commonContainer}>
            <div className={forgotStyles.formContainer}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
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
                <div className={forgotStyles.buttonContainer}>
                    <Button
                        type="primary"
                        size="medium"
                        onClick={(e) => {
                            dispatch(forgotRequest(forgotURL, forgot));
                        }}>
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
            </div>
        </div>
    );
};

export default ForgotPassword;
