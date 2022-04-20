import React from 'react';
import HeaderStyles from "./header.module.css";
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
const Header = () => {
    return (
        <div className={HeaderStyles.top}>
            <header className={HeaderStyles.header}>

                {/*зона левых кнопок*/}
                <div className={HeaderStyles.btnArea}>
                    <div className={HeaderStyles.constructor}>
                        <BurgerIcon type="primary" />
                        <p className={HeaderStyles.headerText + "text text_type_main-default text_color_active"}>Конструктор</p>
                    </div>
                    <div className={HeaderStyles.orderList}>
                        <ListIcon type="secondary" />
                        <p className={HeaderStyles.headerText + "text text_type_main-default text_color_inactive"}>Лента заказов</p>
                    </div>
                </div>

                {/*лого*/}
                <Logo className={HeaderStyles.logo}/>

                {/*зона правых кнопок*/}
                <div className={HeaderStyles.personalAccount}>
                    <ProfileIcon type="secondary"/>
                    <p className="text headerText text_type_main-small text_color_inactive">Личный кабинет</p>
                </div>
            </header>
        </div>
    );
};

export default Header;