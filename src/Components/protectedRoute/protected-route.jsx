import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, ...rest }) => {
    const { isLogin } = useSelector((store) => ({
        baseURL: store.requests.baseURL,
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

ProtectedRoute.propTypes = {
    children: PropTypes.element,
    rest: PropTypes.object,
};

export default ProtectedRoute;
