import React, { FC } from 'react';
import profileHStyles from './profile-header.module.css';
import { logoutRequest } from '../../../Services/actions/requestsActions';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../utils/types/store';

const ProfileHeader: FC = () => {
    // console.log('profileHeader');
    const { url } = useRouteMatch<string | undefined>();
    const dispatch = useDispatch();
    const history = useHistory();
    const { baseURL } = useSelector((store) => ({
        baseURL: store.requests.baseURL,
    }));

    return (
        <div className={profileHStyles.headContainer}>
            <div className={profileHStyles.pText}>
                {/*/profile*/}
                <p
                    className={
                        url.split('/')[2] === undefined
                            ? 'text text_type_main-medium text_color_active'
                            : 'text text_type_main-medium text_color_inactive'
                    }
                    onClick={(): void => {
                        history.replace({ pathname: '/profile' });
                    }}>
                    Профиль
                </p>
            </div>
            <div className={profileHStyles.pText}>
                {/*/profile orders*/}
                <p
                    className={
                        url.split('/')[2] === 'orders'
                            ? 'text text_type_main-medium text_color_active'
                            : 'text text_type_main-medium text_color_inactive'
                    }
                    onClick={(): void => {
                        url.split('/')[2] !== 'orders' &&
                            history.replace({ pathname: url + '/orders' });
                    }}>
                    История заказов
                </p>
            </div>
            <div className={profileHStyles.pText}>
                {/*/logout*/}
                <p
                    className="text text_type_main-medium text_color_inactive"
                    onClick={(): void => {
                        dispatch(logoutRequest(baseURL));
                    }}>
                    Выход
                </p>
            </div>
            <div className={profileHStyles.descText}>
                <p className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
        </div>
    );
};
//propTypes - нету

export default ProfileHeader;
