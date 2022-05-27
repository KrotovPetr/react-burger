import React from 'react';
import profileMStyles from './profile-main.module.css';
import {
    Button,
    Input,
    EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
    getCookie,
    profileRequest,
    setLogoutData,
    updateRequest,
} from '../../../Services/actions/requestsActions';
import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ProfileMain = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const {
        profileURL,
        nameV,
        emailV,
        updateURL,
        tokenURL,
        profileRequestError,
        logoutRequestSuccess,
        isLogout,
    } = useSelector(
        (store) => ({
            profileURL: store.requests.profileURL,
            nameV: store.requests.name,
            emailV: store.requests.email,
            logoutURL: store.requests.logoutURL,
            updateURL: store.requests.updateURL,
            tokenURL: store.requests.tokenURL,
            profileRequestRequest: store.requests.profileRequestRequest,
            profileRequestError: store.requests.profileRequestError,
            updateRequestRequest: store.requests.updateRequestRequest,
            logoutRequestSuccess: store.requests.logoutRequestSuccess,
            isLogout: store.requests.isLogout,
        }),
        shallowEqual
    );
    const history = useHistory();
    useEffect(() => {
        if (logoutRequestSuccess) {
            dispatch(setLogoutData());
            history.replace({ pathname: '/login' });
        } else {
            if (!isLogout) {
                dispatch(profileRequest(profileURL, tokenURL));
                if (profileRequestError) {
                    dispatch(profileRequest(profileURL, tokenURL));
                }
                setEmail(emailV);
                setName(nameV);
                setPassword(getCookie('password'));
            }
        }
    }, [nameV, emailV, logoutRequestSuccess]);

    return (
        <div className={profileMStyles.formContainer}>
            <EmailInput
                onChange={(e) => setName(e.target.value)}
                value={name}
                name={'name'}
                className="input"
            />
            <EmailInput
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name={'email'}
                className="input"
            />
            <EmailInput
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name={'password'}
                className="input"
            />

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
                <Button
                    type="primary"
                    size="medium"
                    onClick={() => {
                        dispatch(
                            updateRequest(updateURL, name, email, password)
                        );
                    }}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default ProfileMain;
