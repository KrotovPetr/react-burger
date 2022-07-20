import React, { FC, useEffect, useState } from 'react';
import HeaderStyles from './header.module.css';
import {
    BurgerIcon,
    ListIcon,
    Logo,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { setOrderInfo } from '../../Services/actions/requestAction/requestsActions';
import { useDispatch } from '../../utils/types/store';

const Header: FC = () => {
    const location = useLocation();
    const history = useHistory();
    const [type, setType] = useState<string>('home');
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    useEffect(() => {
        if (location.pathname === '/') {
            setType('home');
        } else if (location.pathname.split('/')[1] === 'profile') {
            setType('profile');
        } else {
            setType('beSoon');
        }
    }, [location]);
    // console.log(type);
    return (
        <div className={HeaderStyles.top}>
            <header className={HeaderStyles.header}>
                {/*зона левых кнопок*/}
                <div className={HeaderStyles.btnArea}>
                    <div
                        className={HeaderStyles.constructorR}
                        onClick={(): void => {
                            history.replace({ pathname: '/' });
                        }}>
                        <BurgerIcon
                            type={type === 'home' ? 'primary' : 'secondary'}
                        />
                        <p
                            className={
                                type === 'home'
                                    ? HeaderStyles.headerText +
                                      'text text_type_main-default text_color_active ' +
                                      HeaderStyles.hoverText
                                    : HeaderStyles.headerText +
                                      'text text_type_main-default text_color_inactive ' +
                                      HeaderStyles.hoverText
                            }>
                            Конструктор
                        </p>
                    </div>
                    <div
                        className={HeaderStyles.orderList}
                        onClick={() => {
                            history.replace({ pathname: '/feed' });

                            dispatch(setOrderInfo(undefined));
                        }}>
                        <ListIcon
                            type={type === 'beSoon' ? 'primary' : 'secondary'}
                        />
                        <p
                            className={
                                type === 'beSoon'
                                    ? HeaderStyles.headerText +
                                      'text text_type_main-default text_color_active ' +
                                      HeaderStyles.hoverText
                                    : HeaderStyles.headerText +
                                      'text text_type_main-default text_color_inactive ' +
                                      HeaderStyles.hoverText
                            }>
                            Лента заказов
                        </p>
                    </div>
                </div>

                {/*лого*/}
                <div
                    className={HeaderStyles.logoDiv}
                    onClick={(): void => {
                        history.replace({ pathname: '/' });
                    }}>
                    <div className={HeaderStyles.logo}>
                        {' '}
                        <Logo />
                    </div>
                </div>
                {/*зона правых кнопок*/}
                <div
                    className={HeaderStyles.personalAccount}
                    onClick={(): void =>
                        history.replace({ pathname: '/profile' })
                    }>
                    <ProfileIcon
                        type={type === 'profile' ? 'primary' : 'secondary'}
                    />
                    <p
                        className={
                            type === 'profile'
                                ? 'text headerText text_type_main-small text_color_active ' +
                                  HeaderStyles.hoverText
                                : 'text headerText text_type_main-small text_color_inactive ' +
                                  HeaderStyles.hoverText
                        }>
                        Личный кабинет
                    </p>
                </div>
            </header>
        </div>
    );
};

//propTypes - нету

export default Header;
