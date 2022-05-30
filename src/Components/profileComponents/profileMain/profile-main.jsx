import React from 'react';
import profileMStyles from './profile-main.module.css';
import {
    Button,
    EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
    profileRequest,
    setLogoutData,
    updateRequest,
} from '../../../Services/actions/requestsActions';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCookie } from '../../../utils/functions/cookieFunctions/getCookie';

const ProfileMain = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        baseURL,
        nameV,
        emailV,
        profileRequestError,
        logoutRequestSuccess,
        isLogout,
        isLogin,
    } = useSelector(
        (store) => ({
            baseURL: store.requests.baseURL,
            nameV: store.requests.name,
            emailV: store.requests.email,
            profileRequestRequest: store.requests.profileRequestRequest,
            profileRequestError: store.requests.profileRequestError,
            updateRequestRequest: store.requests.updateRequestRequest,
            logoutRequestSuccess: store.requests.logoutRequestSuccess,
            isLogout: store.requests.isLogout,
            isLogin: store.requests.isLogin,
        }),
        shallowEqual
    );

    //useEffect - проверка на авторизованность и выход из профиля
    useEffect(() => {
        // console.log(getCookie('accessToken') + ' ' + isLogout);
        if (!isLogin) {
            dispatch(setLogoutData());
            history.replace({ pathname: '/login' });
        } else {
            if (!isLogout) {
                dispatch(profileRequest(baseURL));
                if (profileRequestError) {
                    dispatch(profileRequest(baseURL));
                }
                setEmail(emailV);
                setName(nameV);
                setPassword(getCookie('password'));
            }
        }
    }, [nameV, emailV, logoutRequestSuccess]);

    return (
        <form
            className={profileMStyles.formContainer}
            onSubmit={(e) => {
                e.preventDefault();
                dispatch(updateRequest(baseURL, name, email, password));
            }}>
            <label>
                <EmailInput
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name={'name'}
                    className="input"
                />
            </label>
            <label>
                <EmailInput
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    className="input"
                />
            </label>
            <label>
                <EmailInput
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    className="input"
                />
            </label>
            <div className={profileMStyles.tabsContainer}>
                <p
                    className="text text_type_main-default text_color_inactive"
                    onClick={() => {
                        setEmail(emailV);
                        setName(nameV);
                        setPassword(getCookie('password'));
                    }}>
                    Отмена
                </p>
                <Button type="primary" size="medium">
                    Сохранить
                </Button>
            </div>
        </form>
    );
};

//propTypes - нету

export default ProfileMain;
