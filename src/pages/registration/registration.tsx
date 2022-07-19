import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import registerStyle from './register.module.css';
import '../../commonStyles/styles.css';
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { registerRequest } from '../../Services/actions/requestAction/requestsActions';
import { Location } from 'history';
import { useDispatch, useSelector } from '../../utils/types/store';

type TLocation = {
    url: string;
    location: Location;
};

const Registration: FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation<TLocation>();
    let fromURL: string = '';
    useEffect(() => {
        if (location.state) {
            fromURL = location.state.url;
        }
    }, [location]);

    const { baseURL, isLogin } = useSelector((store) => ({
        baseURL: store.requests.baseURL,
        isLogin: store.requests.isLogin,
    }));

    // console.log(isAuth(), ' ', getCookie('accessToken'));

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
                    onSubmit={(e: FormEvent<HTMLFormElement>): void => {
                        e.preventDefault();
                        dispatch(
                            registerRequest(email, password, name, baseURL)
                        );
                    }}>
                    <label>
                        <div className="input">
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ): void => setName(e.target.value)}
                                value={name}
                                name={'name'}
                                error={false}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                        </div>
                    </label>
                    <label>
                        <div className="input">
                            <Input
                                type={'text'}
                                placeholder={'E-mail'}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ): void => setEmail(e.target.value)}
                                value={email}
                                name={'name'}
                                error={false}
                                errorText={'Ошибка'}
                                size={'default'}
                            />
                        </div>
                    </label>
                    <label>
                        <PasswordInput
                            onChange={(
                                e: ChangeEvent<HTMLInputElement>
                            ): void => setPassword(e.target.value)}
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
                        onClick={(): void =>
                            history.replace({ pathname: '/login' })
                        }>
                        {' '}
                        Войти
                    </span>
                </p>
            </div>
        </div>
    );
};

//propTypes - нету
export default Registration;
