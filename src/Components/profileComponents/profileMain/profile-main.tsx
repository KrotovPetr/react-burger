import React, { FC } from 'react';
import profileMStyles from './profile-main.module.css';
import {
    Button,
    EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
    profileRequest,
    setLogoutData,
    updateRequest,
} from '../../../Services/actions/requestAction/requestsActions';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCookie } from '../../../utils/functions/cookieFunctions/getCookie';
import {
    RootState,
    useDispatch,
    useSelector,
} from '../../../utils/types/store';

const ProfileMain: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
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
    } = useSelector((store) => ({
        baseURL: store.requests.baseURL,
        nameV: store.requests.name,
        emailV: store.requests.email,
        profileRequestError: store.requests.profileRequestError,
        logoutRequestSuccess: store.requests.logoutRequestSuccess,
        isLogout: store.requests.isLogout,
        isLogin: store.requests.isLogin,
    }));

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
                let myPass: string | undefined = getCookie('password');
                if (myPass !== undefined) {
                    setPassword(myPass);
                }
            }
        }
    }, [nameV, emailV, logoutRequestSuccess]);

    return (
        <form
            className={profileMStyles.formContainer}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                dispatch(updateRequest(baseURL, name, email, password));
            }}>
            <label>
                <div className="input">
                    <EmailInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                        value={name}
                        name={'name'}
                    />
                </div>
            </label>
            <label>
                <div className="input">
                    <EmailInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(e.target.value)
                        }
                        value={email}
                        name={'email'}
                        // TS2339: Property 'value' does not exist on type 'EventTarget & HTMLElement'.
                    />
                </div>
            </label>
            <label>
                <div className="input">
                    <EmailInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                        value={password}
                        name={'password'}
                    />
                </div>
            </label>
            <div className={profileMStyles.tabsContainer}>
                <p
                    className="text text_type_main-default text_color_inactive"
                    onClick={(): void => {
                        setEmail(emailV);
                        setName(nameV);
                        let myPass: string | undefined = getCookie('password');
                        if (myPass !== undefined) {
                            setPassword(myPass);
                        }
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
