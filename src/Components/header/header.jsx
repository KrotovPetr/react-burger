import React from 'react';
import HeaderStyles from "./header.module.css";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import "./styles.css"
const Header = () => {
    return (
        <header className={HeaderStyles.header}>
            <div className={HeaderStyles.btnArea}>
                <div className={HeaderStyles.constructor}>
                    <BurgerIcon type="primary" />
                    <p className="text headerText text_type_main-default text_color_active">Конструктор</p>
                </div>
                <div className={HeaderStyles.orderList}>
                    <ListIcon type="secondary" />
                    <p className="text headerText text_type_main-default text_color_inactive">Лента заказов</p></div>
            </div>
            <Logo className={HeaderStyles.logo}/>
            <div className={HeaderStyles.btnArea}/>
            <div className={HeaderStyles.personalAccount}>
                <ProfileIcon type="secondary"/>
                <p className="text headerText text_type_main-small text_color_inactive">Личный кабинет</p>
            </div>
        </header>
    );
};

export default Header;