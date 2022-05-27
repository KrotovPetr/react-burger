import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import registerStyle from './register.module.css';
import '../../commonStyles/styles.css';
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
    getCookie,
    registerRequest,
} from '../../Services/actions/requestsActions';
import { useDispatch, useSelector } from 'react-redux';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const { registerURL } = useSelector((store) => ({
        registerURL: store.requests.registerURL,
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
        <div className={registerStyle.mainContainer}>
            <div className={registerStyle.formContainer}>
                <h1
                    className={
                        registerStyle.headerText + 'text text_type_main-medium'
                    }>
                    Регистрация
                </h1>
                <div className={registerStyle.inputContainer}>
                    <Input
                        type={'text'}
                        className="input"
                        placeholder={'Имя'}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <Input
                        type={'text'}
                        placeholder={'E-mail'}
                        className="input"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <PasswordInput
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                    />
                </div>
                <div className={registerStyle.buttonContainer}>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            dispatch(
                                registerRequest(
                                    email,
                                    password,
                                    name,
                                    registerURL
                                )
                            );
                        }}>
                        <p className="text text_type_main-default ">
                            Зарегистироваться
                        </p>
                    </Button>
                </div>

                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы?
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

export default Registration;
