import { checkResponse } from '../../../utils/functions/checkResponse';
import { getCookie } from '../../../utils/functions/cookieFunctions/getCookie';
import { setCookie } from '../../../utils/functions/cookieFunctions/setCookie';
import { deleteCookie } from '../../../utils/functions/cookieFunctions/deleteCookie';
import {
    TOrder,
    TOrderIngredients,
    TOrderResponse,
} from '../../../utils/types/types';
import { AppDispatch } from '../../../utils/types/store';

export const FORGOT_URL_REQUEST: 'FORGOT_URL_REQUEST' = 'FORGOT_URL_REQUEST';
export const FORGOT_URL_ERROR: 'FORGOT_URL_ERROR' = 'FORGOT_URL_ERROR';
export const FORGOT_URL_SUCCESS: 'FORGOT_URL_SUCCESS' = 'FORGOT_URL_SUCCESS';
export const REGIST_URL_REQUEST: 'REGIST_URL_REQUEST' = 'REGIST_URL_REQUEST';
export const REGIST_URL_ERROR: 'REGIST_URL_ERROR' = 'REGIST_URL_ERROR';
export const REGIST_URL_SUCCESS: 'REGIST_URL_SUCCESS' = 'REGIST_URL_SUCCESS';
export const ENTER_URL_REQUEST: 'ENTER_URL_REQUEST' = 'ENTER_URL_REQUEST';
export const ENTER_URL_ERROR: 'ENTER_URL_ERROR' = 'ENTER_URL_ERROR';
export const ENTER_URL_SUCCESS: 'ENTER_URL_SUCCESS' = 'ENTER_URL_SUCCESS';
export const RESET_URL_REQUEST: 'RESET_URL_REQUEST' = 'RESET_URL_REQUEST';
export const RESET_URL_ERROR: 'RESET_URL_ERROR' = 'RESET_URL_ERROR';
export const RESET_URL_SUCCESS: 'RESET_URL_SUCCESS' = 'RESET_URL_SUCCESS';
export const PROFILE_URL_REQUEST: 'PROFILE_URL_REQUEST' = 'PROFILE_URL_REQUEST';
export const PROFILE_URL_ERROR: 'PROFILE_URL_ERROR' = 'PROFILE_URL_ERROR';
export const PROFILE_URL_SUCCESS: 'PROFILE_URL_SUCCESS' = 'PROFILE_URL_SUCCESS';
export const LOGOUT_URL_REQUEST: 'LOGOUT_URL_REQUEST' = 'LOGOUT_URL_REQUEST';
export const LOGOUT_URL_ERROR: 'LOGOUT_URL_ERROR' = 'LOGOUT_URL_ERROR';
export const LOGOUT_URL_SUCCESS: 'LOGOUT_URL_SUCCESS' = 'LOGOUT_URL_SUCCESS';
export const UPDATE_URL_REQUEST: 'UPDATE_URL_REQUEST' = 'UPDATE_URL_REQUEST';
export const UPDATE_URL_ERROR: 'UPDATE_URL_ERROR' = 'UPDATE_URL_ERROR';
export const UPDATE_URL_SUCCESS: 'UPDATE_URL_SUCCESS' = 'UPDATE_URL_SUCCESS';
export const REFRESH_URL_REQUEST: 'REFRESH_URL_REQUEST' = 'REFRESH_URL_REQUEST';
export const REFRESH_URL_ERROR: 'REFRESH_URL_ERROR' = 'REFRESH_URL_ERROR';
export const REFRESH_URL_SUCCESS: 'REFRESH_URL_SUCCESS' = 'REFRESH_URL_SUCCESS';
export const SET_LOGOUT_DATA: 'SET_LOGOUT_DATA' = 'SET_LOGOUT_DATA';
export const IS_AUTH: 'IS_AUTH' = 'IS_AUTH';
export const SET_ORDER_INFO: 'SET_ORDER_INFO' = 'SET_ORDER_INFO';
export const SET_PERSON_ORDER_INFO: 'SET_PERSON_ORDER_INFO' =
    'SET_PERSON_ORDER_INFO';
export const GET_ORDER_INFO_SUCCESS: 'GET_ORDER_INFO_SUCCESS' =
    'GET_ORDER_INFO_SUCCESS';
export const GET_ORDER_INFO_ERROR: 'GET_ORDER_INFO_ERROR' =
    'GET_ORDER_INFO_ERROR';
export const GET_ORDER_INFO_REQUEST: 'GET_ORDER_INFO_REQUEST' =
    'GET_ORDER_INFO_REQUEST';
export const CLEAR_ORDER_INFO: 'CLEAR_ORDER_INFO' = 'CLEAR_ORDER_INFO';

//?????????????? ???? ?????????? ????????????
export function forgotRequest(baseURL: string, data: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: FORGOT_URL_REQUEST,
        });
        fetch(baseURL + '/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ email: data }),
        })
            .then(checkResponse)
            .then(() => {
                // setCookie('forgot', 'ok');
                dispatch({ type: FORGOT_URL_SUCCESS });
            })
            .catch(() => {
                dispatch({ type: FORGOT_URL_ERROR });
            });
    };
}
//?????????????? ???? ???????????????????????? ???????????? ??????????????
export function registerRequest(
    email: string,
    password: string,
    name: string,
    baseURL: string
) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REGIST_URL_REQUEST,
        });
        fetch(baseURL + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name,
            }),
        })
            .then(checkResponse)
            .then((data: any) => {
                setCookie(
                    'accessToken',
                    data.accessToken.split(' ')[1],
                    undefined
                );
                setCookie('refreshToken', data.refreshToken, undefined);
                setCookie('password', password, undefined);
                dispatch({ type: REGIST_URL_SUCCESS });
            })
            .catch(() => dispatch({ type: REGIST_URL_ERROR }));
    };
}

//?????????????? ???? ???????????????????????? ???????????? ??????????????
export function enterRequest(email: string, password: string, baseURL: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: ENTER_URL_REQUEST,
        });
        fetch(baseURL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(checkResponse)
            .then((data: any) => {
                setCookie(
                    'accessToken',
                    data.accessToken.split(' ')[1],
                    undefined
                );
                setCookie('refreshToken', data.refreshToken, undefined);
                setCookie('password', password, undefined);
                dispatch({ type: ENTER_URL_SUCCESS });
            })
            .catch((e) => {
                console.error(e);
                dispatch({ type: ENTER_URL_ERROR });
            });
    };
}

//?????????????? ???? ???????????????????????? ???????????? ??????????????
export function resetRequest(password: string, token: string, baseURL: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: RESET_URL_REQUEST,
        });
        fetch(baseURL + '/password-reset/reset', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                password: password,
                token: token,
            }),
        })
            .then(checkResponse)
            .then(() => {
                // document.cookie = 'forgot=;max-age=-1';
                dispatch({ type: RESET_URL_SUCCESS });
            })
            .catch(() => dispatch({ type: RESET_URL_ERROR }));
    };
}

export function profileRequest(baseURL: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: PROFILE_URL_REQUEST,
        });
        fetch(baseURL + '/auth/user', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + getCookie('accessToken'),
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then(checkResponse)
            .then((result) => {
                dispatch({
                    type: PROFILE_URL_SUCCESS,
                    data: result,
                });
            })
            .catch(() => {
                dispatch({ type: PROFILE_URL_ERROR });
                dispatch(setNewToken(getCookie('refreshToken'), baseURL));
            });
    };
}

function setNewToken(token: string | undefined, baseURL: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REFRESH_URL_REQUEST,
        });
        fetch(baseURL + '/auth/token', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                token: token,
            }),
        })
            .then(checkResponse)
            .then(() => {
                // console.log(
                //     'Old token ' +
                //         getCookie('accessToken') +
                //         '  New token: ' +
                //         data.accessToken.split(' ')[1]
                // );
                deleteCookie('accessToken');
                deleteCookie('refreshToken');
                deleteCookie('password');
                deleteCookie('forgot');

                dispatch({ type: REFRESH_URL_SUCCESS });
            })
            .catch(() => dispatch({ type: REFRESH_URL_ERROR }));
    };
}

//?????????????? ???? ?????????? ????????????
export function logoutRequest(baseURL: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_URL_REQUEST,
        });
        fetch(baseURL + '/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                token: getCookie('refreshToken'),
            }),
        })
            .then(checkResponse)
            .then(() => {
                // console.log(data);

                deleteCookie('accessToken');
                deleteCookie('refreshToken');
                deleteCookie('password');
                deleteCookie('forgot');

                dispatch({ type: LOGOUT_URL_SUCCESS });
            })
            .catch(() => dispatch({ type: LOGOUT_URL_ERROR }));
    };
}

//?????????????? ???? ???????????????????? ????????????
export function updateRequest(
    baseURL: string,
    name: string,
    email: string,
    password: string
) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_URL_REQUEST,
        });
        fetch(baseURL + '/auth/user', {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + getCookie('accessToken'),
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        })
            .then(checkResponse)
            .then((data) => {
                // console.log(data);
                dispatch({ type: UPDATE_URL_SUCCESS, data: data });
            })
            .catch(() => dispatch({ type: UPDATE_URL_ERROR }));
    };
}

//?????????????? ???? ???????????????????? ????????????
export function setLogoutData() {
    return function (dispatch: AppDispatch) {
        dispatch({ type: SET_LOGOUT_DATA });
    };
}

//?????????????? ???? ???????????????????? ????????????
export function clearForgotCookie() {
    return function (dispatch: AppDispatch) {
        document.cookie = 'forgot=;max-age=-1';
    };
}

export function setOrderInfo(data: TOrderIngredients | undefined) {
    return function (dispatch: AppDispatch) {
        dispatch({ type: SET_ORDER_INFO, data: data });
    };
}

export function setPersonOrderInfo(data: TOrderIngredients | undefined) {
    return function (dispatch: AppDispatch) {
        dispatch({ type: SET_PERSON_ORDER_INFO, data: data });
    };
}

export function getOrderInfo(url: string) {
    return function (dispatch: AppDispatch) {
        // console.log(url);
        dispatch({ type: GET_ORDER_INFO_REQUEST });
        fetch(url)
            .then(checkResponse)
            .then((result: any) => {
                dispatch({ type: GET_ORDER_INFO_SUCCESS, data: result });
            })
            .catch((e) => {
                dispatch({ type: GET_ORDER_INFO_ERROR });
                console.error(e);
            });
    };
}

export function clearOrderInfo() {
    return function (dispatch: AppDispatch) {
        dispatch({ type: CLEAR_ORDER_INFO });
    };
}
