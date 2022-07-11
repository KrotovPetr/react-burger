import React, { FC } from 'react';
import profileStyles from './profileOrders/profile-orders.module.css';
import { v4 as uuidv4 } from 'uuid';
import { getDate } from '../../utils/functions/getDate';
import { getInfo } from '../../utils/functions/getInfo';
import { getOrderPrice } from '../../utils/functions/getPrice';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../utils/types/store';
import { shallowEqual } from 'react-redux';
import { TOrderIngredients } from '../../utils/types/types';
import { setActive } from '../../Services/actions/components';
type TProfileOrders = {
    onActive: (element: TOrderIngredients) => void;
    element: TOrderIngredients;
};
const ProfileOrdersCard: FC<TProfileOrders> = (props) => {
    const dispatch = useDispatch();
    const { ingredients, payload } = useSelector(
        (store: any) => ({
            ingredients: store.component.ingredients,
            payload: store.sockets.payload,
        }),
        shallowEqual
    );
    return (
        <div
            className={profileStyles.orderPosition}
            onClick={(): void => {
                // dispatch(setPersonOrderInfo(element));
                dispatch(setActive(true));
                props.onActive(props.element);
            }}>
            <div className={profileStyles.positionInfo}>
                <p className="text text_type_digits-default">
                    #{props.element.number}
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    {getDate(props.element.createdAt)}
                </p>
            </div>
            <div className={profileStyles.desContainer}>
                <h2
                    className={
                        profileStyles.h2Header + ' text text_type_main-medium'
                    }>
                    {props.element.name}
                </h2>
                {props.element.status === 'done' ? (
                    <p className="text text_type_main-default text_color_success">
                        Выполнен
                    </p>
                ) : props.element.status === 'created' ? (
                    <p className="text text_type_main-default">Создан</p>
                ) : (
                    <p className="text text_type_main-default text_color_error">
                        Отменён
                    </p>
                )}
            </div>
            <div className={profileStyles.priceLevel}>
                <div className={profileStyles.orderIngredients}>
                    {props.element.ingredients.map((elem: any, index: number) =>
                        index < 5 ? (
                            <div
                                className={profileStyles.pageContainer}
                                key={uuidv4()}>
                                <img
                                    src={
                                        ingredients[getInfo(elem, ingredients)]
                                            .image_mobile
                                    }
                                    width="56px"
                                    height="56px"
                                    alt="Ingredient icon"
                                />
                            </div>
                        ) : index === 5 ? (
                            <div
                                className={profileStyles.pageContainer}
                                key={uuidv4()}>
                                <p className="text text_type_digits-default">
                                    +{props.element.ingredients.length - index}
                                </p>
                                <img
                                    src={
                                        ingredients[getInfo(elem, ingredients)]
                                            .image_mobile
                                    }
                                    width="56px"
                                    height="56px"
                                    className={profileStyles.img}
                                    alt="Ingredient icon"
                                />
                            </div>
                        ) : null
                    )}
                </div>
                <div className={profileStyles.priceContainer}>
                    <p className="text text_type_main-medium">
                        {getOrderPrice(props.element.ingredients, ingredients)}
                    </p>
                    <div className={profileStyles.iconContainer}>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileOrdersCard;
