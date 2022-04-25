import React from 'react';
import orderStyles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = () => {
    return (
        <div className={orderStyles.main}>
            <h2
                className={
                    orderStyles.headDig + ' text text_type_digits-large'
                }>
                034536
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
            <div className={orderStyles.descr}>
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
//propTypes - нет
export default OrderDetails;
