import React, { FC, useEffect, useState } from 'react';
import profileStyles from './profile-orders.module.css';

import { getCookie } from '../../../utils/functions/cookieFunctions/getCookie';
import { WS_CONNECTION_START } from '../../../Services/actions/socketActions';
import ProfileOrdersAll from '../profile-orders-all';
import {
    RootState,
    useDispatch,
    useSelector,
} from '../../../utils/types/store';
import { TOrderIngredients } from '../../../utils/types/types';
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../../../utils/functions/getDate';
import { getInfo } from '../../../utils/functions/getInfo';
import { getOrderPrice } from '../../../utils/functions/getPrice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { shallowEqual } from 'react-redux';

type TProfileOrders = {
    onActive: (element: TOrderIngredients) => void;
};

const ProfileOrders: FC<TProfileOrders> = (props) => {
    const dispatch = useDispatch();

    const { ingredients, payload } = useSelector(
        (store: any) => ({
            ingredients: store.component.ingredients,
            payload: store.sockets.payload,
        }),
        shallowEqual
    );

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: '?token=' + getCookie('accessToken'),
        });
    }, []);

    return (
        // контенер с заказами
        <div className={profileStyles.ordersContainer}>
            <ProfileOrdersAll onActive={props.onActive} />
        </div>
    );
};

//propTypes - нету

export default ProfileOrders;
