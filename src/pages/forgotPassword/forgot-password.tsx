import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import forgotStyles from './forgot.module.css';
import {
    Button,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import '../../commonStyles/styles.css';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotRequest } from '../../Services/actions/requestsActions';
import { RootState } from '../../utils/types/store';

const ForgotPassword: FC = () => {
    const [forgot, setForgot] = useState<string>('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { baseURL, forgotRequestSuccess, forgotRequestError, isLogin } =
        useSelector((store: RootState) => ({
            baseURL: store.requests.baseURL,
            forgotRequestSuccess: store.requests.forgotRequestSuccess,
            forgotRequestError: store.requests.forgotRequestError,
            isLogin: store.requests.isLogin,
        }));

    useEffect((): void => {
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
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    dispatch(forgotRequest(baseURL, forgot));
                }}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
                <label>
                    <div className="input">
                        <Input
                            type={'text'}
                            placeholder={'Email'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setForgot(e.target.value)
                            }
                            value={forgot}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </div>
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
                        onClick={(): void =>
                            history.replace({ pathname: '/login' })
                        }>
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
