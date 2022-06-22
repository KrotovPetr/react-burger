import React, { FC, ReactChildren, ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

type TProtRoute = {
    children?: ReactNode | ReactChildren;
    path?: string;
};
// interface IStore {
//     requests: {
//         isLogin: boolean;
//     };
// }

const ProtectedRoute: FC<TProtRoute> = ({ children, ...rest }) => {
    const { isLogin } = useSelector((store: any) => ({
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
