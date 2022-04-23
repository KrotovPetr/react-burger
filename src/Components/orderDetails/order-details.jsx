import React from 'react';
import orderStyles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = () => {
    return (
        <div className={orderStyles.main}>
            <h1
                className={
                    orderStyles.headDig + ' text text_type_digits-large'
                }>
                034536
            </h1>
            <h2 className={orderStyles.ident + ' text text_type_main-medium'}>
                идентификатор заказа
            </h2>
            <div className={orderStyles.done}>
                <div className={orderStyles.doneMini}>
                    <div className={orderStyles.doneDiv}>
                        <CheckMarkIcon type="primary" />
                    </div>
                </div>
            </div>
            <div className={orderStyles.descr}>
                <h3 className="text text_type_main-small">
                    Ваш заказ начали готовить
                </h3>
                <h3 className="text text_type_main-small text_color_inactive">
                    Дождитесь готовности на орбитальной станции
                </h3>
            </div>
        </div>
    );
};

export default OrderDetails;
