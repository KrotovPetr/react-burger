import React, { FC } from 'react';
import profileStyles from './profileOrders/profile-orders.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from '../../utils/types/store';
import { shallowEqual } from 'react-redux';
import { TOrderIngredients } from '../../utils/types/types';
import ProfileOrdersActive from './profile-orders-active';
type TProfileOrders = {
    onActive: (element: TOrderIngredients) => void;
};

const ProfileOrdersAll: FC<TProfileOrders> = (props) => {
    const { ingredients, payload } = useSelector(
        (store: any) => ({
            ingredients: store.component.ingredients,
            payload: store.sockets.payload,
        }),
        shallowEqual
    );
    return (
        <div className={profileStyles.orders}>
            {payload &&
                payload.orders.map((element: any) => (
                    // карточка заказа
                    <ProfileOrdersActive
                        key={uuidv4()}
                        onActive={props.onActive}
                        element={element}
                    />
                ))}
        </div>
    );
};

export default ProfileOrdersAll;
