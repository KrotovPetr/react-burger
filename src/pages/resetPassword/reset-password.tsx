import React, { FC, useEffect, useState } from 'react';
import resetStyles from './reset.module.css';
import {
    Button,
    Input,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import '../../commonStyles/styles.css';
import { Redirect, useHistory } from 'react-router-dom';
import { resetRequest } from '../../Services/actions/requestAction/requestsActions';
import { isForgot } from '../../utils/functions/isForgot';
import { useDispatch, useSelector } from '../../utils/types/store';

const ResetPassword: FC = () => {
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const { baseURL, resetRequestSuccess, resetRequestError, isLogin } =
        useSelector((store) => ({
            baseURL: store.requests.baseURL,
            resetRequestSuccess: store.requests.resetRequestSuccess,
            resetRequestError: store.requests.resetRequestError,
            isLogin: store.requests.isLogin,
        }));

    useEffect((): void => {
        resetRequestSuccess &&
            !resetRequestError &&
            history.replace({ pathname: '/login' });
    }, [resetRequestSuccess, resetRequestError]);

    const dispatch = useDispatch();
    const history = useHistory();

    if (isLogin) {
        return (
            <Redirect
                to={{
                    pathname: '/',
                }}
            />
        );
    }
    if (!isLogin && isForgot()) {
        return (
            <Redirect
                to={{
                    pathname: '/forgot-password',
                }}
            />
        );
    }

    // console.log(isAuth(), ' ', isForgot());
    // console.log(
    //     isForgot(),
    //     ' ',
    //     getCookie('accessToken'),
    //     ' ',
    //     getCookie('forgot')
    // );

    return (
        <div className={resetStyles.commonContainer}>
            <form
                className={resetStyles.formContainer}
                onSubmit={(e): void => {
                    e.preventDefault();
                    dispatch(resetRequest(password, token, baseURL));
                }}>
                <h1 className="text text_type_main-medium">
                    ???????????????????????????? ????????????
                </h1>
                <label>
                    <div className="input">
                        <PasswordInput
                            onChange={(e): void => setPassword(e.target.value)}
                            value={password}
                            name={'password'}
                        />
                    </div>
                </label>
                <label>
                    <div className="input">
                        <Input
                            type={'text'}
                            placeholder={'?????????????? ?????? ???? ????????????'}
                            onChange={(e): void => setToken(e.target.value)}
                            value={token}
                            name={'name'}
                            error={false}
                            errorText={'????????????'}
                            size={'default'}
                        />
                    </div>
                </label>
                <div className={resetStyles.buttonContainer}>
                    <Button type="primary" size="medium">
                        ??????????????????
                    </Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">
                    ?????????????????? ?????????????{' '}
                    <span
                        className="text text_type_main-default text_color_inactive"
                        onClick={() => history.replace({ pathname: '/login' })}>
                        {' '}
                        ??????????
                    </span>
                </p>
            </form>
        </div>
    );
};

//propTypes - ????????
export default ResetPassword;
