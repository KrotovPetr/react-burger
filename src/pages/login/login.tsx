import React, { FC, useEffect, useState } from 'react';
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
    // getCookie,
} from '../../Services/actions/requestsActions';

type TLocation = {
    from: { pathname: string };
};

const Login: FC = () => {
    // console.log(typeof location.state.from.pathname);
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { baseURL, isLogin } = useSelector((store: any) => ({
        baseURL: store.requests.baseURL,
        isLogin: store.requests.isLogin,
    }));
    const { state } = useLocation<TLocation>();

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
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        dispatch(enterRequest(email, password, baseURL));
                    }}>
                    <label>
                        <Input
                            type={'text'}
                            placeholder={'Email'}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ): void => setEmail(e.target.value)}
                            value={email}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                        />
                    </label>
                    <label>
                        <div className="input">
                            <PasswordInput
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ): void => setPassword(e.target.value)}
                                value={password}
                                name={'password'}
                            />
                        </div>
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
                        onClick={(): void =>
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
                        onClick={(): void =>
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

//propTypes - нету
export default Login;
