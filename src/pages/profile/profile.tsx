import React, { FC, useEffect } from 'react';
import profileStyles from './profile.module.css';
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation,
    useRouteMatch,
} from 'react-router-dom';
import '../../commonStyles/styles.css';
import ProfileHeader from '../../Components/profileComponents/profileHeader/profile-header';
import ProfileMain from '../../Components/profileComponents/profileMain/profile-main';
import ProfileOrders from '../../Components/profileComponents/profileOrders/profile-orders';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '../../utils/types/store';
import OrderModal from '../../Components/Modals/orderModal/order-modal';
import { Location } from 'history';
import { fetchData } from '../../Services/actions/components';
import { isAuth } from '../../utils/functions/isAuth';
import { IS_AUTH } from '../../Services/actions/requestsActions';
import Order from '../Order/order';
import * as url from 'url';

const Profile: FC = () => {
    const history = useHistory();
    const location = useLocation<{
        background: Location | undefined;
        orderBackground: Location | undefined;
        personOrderBackground: Location | undefined;
    }>();
    const { url } = useRouteMatch();

    const { isActive, personOrdersActive } = useSelector(
        (store: RootState) => ({
            isActive: store.component.isActiv,
            personOrdersActive: store.requests.personOrdersActive,
        }),
        shallowEqual
    );

    // //задаём состояние подложки для модалки
    // let background: Location | undefined =
    //     location.state && location.state.background;
    //
    // //задаём состояние подложки для модалки
    // let orderBackground: Location | undefined =
    //     location.state && location.state.orderBackground;
    //
    // //задаём состояние подложки для модалки
    // let personOrderBackground: Location | undefined =
    //     location.state && location.state.personOrderBackground;
    //
    // if (!cardData && background !== undefined) {
    //     location.state.background = undefined;
    // }
    // if (!ordersActive && orderBackground !== undefined) {
    //     location.state.orderBackground = undefined;
    // }
    // if (!personOrdersActive && personOrderBackground !== undefined) {
    //     location.state.personOrderBackground = undefined;
    // }
    useEffect(() => {
        if (personOrdersActive && isActive) {
            history.push({
                pathname: '/profile/orders/' + personOrdersActive['_id'],
                state: { personOrderBackground: location },
            });
        }
    }, [isActive, personOrdersActive]);
    if (url.split('/').length > 2 && !isActive) {
        return (
            <Redirect
                to={{
                    pathname: '/profile/orders/' + personOrdersActive['_id'],
                    state: { personOrderBackground: location },
                }}
            />
        );
    }

    // if (url.split('/').length > 2 && !isActive) {
    //     history.replace({ pathname: url });
    // }
    return (
        <div className={profileStyles.commonContainer}>
            <div className={profileStyles.subRouterContainer}>
                <ProfileHeader />
            </div>
            <div className={profileStyles.formContainer}>
                <Switch>
                    <Route exact path="/profile">
                        <ProfileMain />
                    </Route>
                    <Route path="/profile/orders" exact={true}>
                        <ProfileOrders />
                    </Route>
                    {/*<Route path="/profile/orders/:id">*/}
                    {/*    <Order />*/}
                    {/*</Route>*/}
                </Switch>
                {/*{(orderBackground || personOrderBackground) &&*/}
                {/*    isActive &&*/}
                {/*    (orderBackground ? (*/}
                {/*        <Route path="/feed/:id" children={<OrderModal />} />*/}
                {/*    ) : (*/}
                {/*        <Route*/}
                {/*            path="/profile/orders/:id"*/}
                {/*            children={<OrderModal />}*/}
                {/*        />*/}
                {/*    ))}*/}
            </div>
        </div>
    );
};

//propTypes - нету
export default Profile;
