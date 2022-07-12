import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { RootState, useSelector } from '../../utils/types/store';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const { isLogin } = useSelector((store) => ({
        isLogin: store.requests.isLogin,
    }));

    return (
        <Route
            {...rest}
            // Получим текущий маршрут, с которого произойдёт переадресация
            // для неавторизованного пользователя
            render={({ location }) =>
                isLogin ? (
                    children
                ) : (
                    // переводим на логин
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;
