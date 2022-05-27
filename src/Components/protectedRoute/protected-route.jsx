import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getCookie } from '../../Services/actions/requestsActions';

const ProtectedRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                getCookie('accessToken') !== undefined ? (
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

export default ProtectedRoute;
