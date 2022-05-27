import React, { useCallback } from 'react';
import HeaderStyles from './header.module.css';
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';
const Header = () => {
    const history = useHistory();

    return (
        <div className={HeaderStyles.top}>
            <header className={HeaderStyles.header}>
                {/*зона левых кнопок*/}
                <div className={HeaderStyles.btnArea}>
                    <div
                        className={HeaderStyles.constructor}
                        onClick={(e) => history.replace({ pathname: '/' })}>
                        <BurgerIcon type="primary" />
                        <p
                            className={
                                HeaderStyles.headerText +
                                'text text_type_main-default text_color_active ' +
                                HeaderStyles.hoverText
                            }>
                            Конструктор
                        </p>
                    </div>
                    <div
                        className={HeaderStyles.orderList}
                        onClick={() =>
                            history.replace({ pathname: '/profile' })
                        }>
                        <ListIcon type="secondary" />
                        <p
                            className={
                                HeaderStyles.headerText +
                                'text text_type_main-default text_color_inactive ' +
                                HeaderStyles.hoverText
                            }>
                            Лента заказов
                        </p>
                    </div>
                </div>

                {/*лого*/}
                <Logo className={HeaderStyles.logo} />

                {/*зона правых кнопок*/}
                <div
                    className={HeaderStyles.personalAccount}
                    onClick={() => history.replace({ pathname: '/profile' })}>
                    <ProfileIcon type="secondary" />
                    <p
                        className={
                            'text headerText text_type_main-small text_color_inactive ' +
                            HeaderStyles.hoverText
                        }>
                        Личный кабинет
                    </p>
                </div>
            </header>
        </div>
    );
};

export default Header;
