import React, { FC, useEffect, useState } from 'react';
import profileStyles from './profile.module.css';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import '../../commonStyles/styles.css';
import ProfileHeader from '../../Components/profileComponents/profileHeader/profile-header';
import ProfileMain from '../../Components/profileComponents/profileMain/profile-main';
import ProfileOrders from '../../Components/profileComponents/profileOrders/profile-orders';
import { useDispatch, useSelector } from '../../utils/types/store';
import { Location } from 'history';
import { setActive } from '../../Services/actions/components';
import { setPersonOrderInfo } from '../../Services/actions/requestsActions';
import { TOrderIngredients } from '../../utils/types/types';

const Profile: FC = () => {
    const [activeOrder, onActive] = useState<TOrderIngredients | undefined>(
        undefined
    );
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<{
        background: Location | undefined;
        orderBackground: Location | undefined;
        personOrderBackground: Location | undefined;
    }>();
    const { url } = useRouteMatch();

    //функция прямой передачи компонента из заказов
    const getActiveElement = (element: TOrderIngredients): void => {
        dispatch(setPersonOrderInfo(element));
        dispatch(setActive(true));
        history.push(`/profile/orders/${element['_id']}`);
        onActive(element);
    };

    const { isActive, personOrdersActive } = useSelector((store) => ({
        isActive: store.component.isActiv, //активировано ли модальное окно
        personOrdersActive: store.requests.personOrdersActive, //данные о заказе
    }));

    return (
        <div className={profileStyles.commonContainer}>
            <div className={profileStyles.subRouterContainer}>
                <ProfileHeader />
            </div>
            <div className={profileStyles.formContainer}>
                {url.split('/').length === 2 ? (
                    <ProfileMain />
                ) : (
                    <ProfileOrders onActive={getActiveElement} />
                )}
            </div>
        </div>
    );
};

//propTypes - нету
export default Profile;
