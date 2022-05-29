import React from 'react';
import loadStyles from './loading-comp.module.css';

const LoadingComp = () => {
    return (
        <div className={loadStyles.main}>
            <h2 className={loadStyles.headDig + ' text text_type_digits-large'}>
                Ожидаем сборку заказа
            </h2>
        </div>
    );
};

//propTypes - нету

export default LoadingComp;
