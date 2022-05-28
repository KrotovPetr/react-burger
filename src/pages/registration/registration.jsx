import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import registerStyle from './register.module.css';
import '../../commonStyles/styles.css';
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { registerRequest } from '../../Services/actions/requestsActions';
import { useDispatch, useSelector } from 'react-redux';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    let fromURL = location.state.url;

    const { baseURL, isLogin } = useSelector((store) => ({
        baseURL: store.requests.baseURL,
        isLogin: store.requests.isLogin,
    }));

    // console.log(isAuth(), ' ', getCookie('accessToken'));
    //
    if (isLogin) {
        return <Redirect to={{ pathname: fromURL }} />;
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
                <form
                    className={registerStyle.inputContainer}
                    onSubmit={(e) => {
                        e.preventDefault();

                        dispatch(
                            registerRequest(email, password, name, baseURL)
                        );
                    }}>
                    <label>
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
                    </label>
                    <label>
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
                    </label>
                    <label>
                        <PasswordInput
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name={'password'}
                        />
                    </label>
                    <div className={registerStyle.buttonContainer}>
                        <Button type="primary" size="small">
                            <p className="text text_type_main-default ">
                                Зарегистироваться
                            </p>
                        </Button>
                    </div>
                </form>

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
