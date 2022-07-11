import React, { FC, useEffect, useState } from 'react';
import profileStyles from './profile.module.css';
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation,
    useParams,
    useRouteMatch,
} from 'react-router-dom';
import '../../commonStyles/styles.css';
import ProfileHeader from '../../Components/profileComponents/profileHeader/profile-header';
import ProfileMain from '../../Components/profileComponents/profileMain/profile-main';
import ProfileOrders from '../../Components/profileComponents/profileOrders/profile-orders';
import { RootState, useSelector } from '../../utils/types/store';
import OrderModal from '../../Components/Modals/orderModal/order-modal';
import { Location } from 'history';
import { fetchData } from '../../Services/actions/components';
import { isAuth } from '../../utils/functions/isAuth';
import { IS_AUTH } from '../../Services/actions/requestsActions';
import Order from '../Order/order';
import * as url from 'url';
import { TOrderIngredients } from '../../utils/types/types';

const Profile: FC = () => {
    const [activeOrder, onActive] = useState<TOrderIngredients | undefined>(
        undefined
    );
    console.log(activeOrder);
    const history = useHistory();
    // const params: any = useParams();
    // console.log(params);
    const location = useLocation<{
        background: Location | undefined;
        orderBackground: Location | undefined;
        personOrderBackground: Location | undefined;
    }>();
    const { url } = useRouteMatch();

    //функция прямой передачи компонента из заказов
    const getActiveElement = (element: TOrderIngredients): void => {
        onActive(element);
    };

    const { isActive, personOrdersActive } = useSelector((store) => ({
        isActive: store.component.isActiv, //активировано ли модальное окно
        personOrdersActive: store.requests.personOrdersActive, //данные о заказе
    }));

    useEffect(() => {
        if (!isActive) {
            // console.log(location.pathname);
            history.replace({ pathname: location.pathname });
        }
    }, [history]);

    // if (location.pathname.split('/').length > 2 && !isActive) {
    //     return (
    //         <Redirect
    //             to={{
    //                 pathname: location.pathname,
    //                 state: { personOrderBackground: location },
    //             }}
    //         />
    //     );
    // }

    // if (url.split('/').length > 2 && !isActive) {
    //     activeOrder &&
    //         history.replace({ pathname: url + '/' + activeOrder['_id'] });
    // }

    //Link не встроил, ибо некуда

    return (
        <div className={profileStyles.commonContainer}>
            <div className={profileStyles.subRouterContainer}>
                <ProfileHeader />
            </div>
            <div className={profileStyles.formContainer}>
                <Switch>
                    <Route path="/profile" exact={true}>
                        <ProfileMain />
                    </Route>
                    <Route path="/profile/orders" exact={true}>
                        <ProfileOrders onActive={getActiveElement} />
                    </Route>
                    <Route path="/profile/orders/:id" exact={true}>
                        <Order />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

//propTypes - нету
export default Profile;
