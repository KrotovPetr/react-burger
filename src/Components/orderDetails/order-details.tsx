import React, { FC } from 'react';
import orderStyles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

// interface IOrderDetails {
//     component: {
//         orderInfo: {
//             order: {
//                 number: number;
//             };
//         } | null;
//     };
// }

type TOrderDetails = {};

const OrderDetails: FC<TOrderDetails> = () => {
    const { orderInfo } = useSelector((store: any) => ({
        orderInfo: store.component.orderInfo,
    }));

    return orderInfo ? (
        <div className={orderStyles.main}>
            <h2
                className={
                    orderStyles.headDig + ' text text_type_digits-large'
                }>
                {orderInfo.order.number}
            </h2>
            <p className={orderStyles.ident + ' text text_type_main-medium'}>
                идентификатор заказа
            </p>
            <div className={orderStyles.done}>
                <div className={orderStyles.doneMini}>
                    <div className={orderStyles.doneDiv}>
                        <CheckMarkIcon type="primary" />
                    </div>
                </div>
            </div>
            <div className={orderStyles.desc}>
                <p className="text text_type_main-small">
                    Ваш заказ начали готовить
                </p>
                <p className="text text_type_main-small text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </div>
    ) : (
        <div className={orderStyles.main}>
            <h2
                className={
                    orderStyles.headDig + ' text text_type_digits-medium'
                }>
                Формируем номер...
            </h2>
            <p className={orderStyles.ident + ' text text_type_main-medium'}>
                Пожалуйста, подождите
            </p>
            <div className={orderStyles.done}>
                <div className={orderStyles.doneMini}>
                    <div className={orderStyles.doneDiv}>
                        {/*<CheckMarkIcon type="primary" />*/}
                    </div>
                </div>
            </div>
            <div className={orderStyles.desc}>
                <p className="text text_type_main-small">
                    Ваш заказ начали готовить
                </p>
                <p className="text text_type_main-small text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </div>
    );
};

//propTypes - нету

export default OrderDetails;
