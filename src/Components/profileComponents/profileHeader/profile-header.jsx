import React, { useEffect, useState } from 'react';
import profileHStyles from './profile-header.module.css';
import {
    getCookie,
    logoutRequest,
    setLogoutData,
} from '../../../Services/actions/requestsActions';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

const ProfileHeader = () => {
    const { url } = useRouteMatch();
    const dispatch = useDispatch();
    const [active, setActive] = useState(1);
    const { logoutURL, logoutRequestSuccess } = useSelector(
        (store) => ({
            logoutURL: store.requests.logoutURL,
            logoutRequestSuccess: store.requests.logoutRequestSuccess,
        }),
        shallowEqual
    );

    const history = useHistory();
    return (
        <div className={profileHStyles.headContainer}>
            <div className={profileHStyles.pText}>
                <p
                    className={
                        active === 1
                            ? 'text text_type_main-medium'
                            : 'text text_type_main-medium text_color_inactive'
                    }
                    onClick={() => {
                        setActive(1);
                        history.replace({ pathname: url });
                    }}>
                    Профиль
                </p>
            </div>
            <div className={profileHStyles.pText}>
                <p
                    className={
                        active === 2
                            ? 'text text_type_main-medium'
                            : 'text text_type_main-medium text_color_inactive'
                    }
                    onClick={() => {
                        setActive(2);
                        history.replace({ pathname: url + '/orders' });
                    }}>
                    История заказов
                </p>
            </div>
            <div className={profileHStyles.pText}>
                <p
                    className="text text_type_main-medium text_color_inactive"
                    onClick={() => {
                        dispatch(logoutRequest(logoutURL));
                    }}>
                    Выход
                </p>
            </div>
            <div className={profileHStyles.descrText}>
                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
        </div>
    );
};

export default ProfileHeader;
