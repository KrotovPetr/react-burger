export const FORGOT_URL_REQUEST = 'FORGOT_URL_REQUEST';
export const FORGOT_URL_ERROR = 'FORGOT_URL_ERROR';
export const FORGOT_URL_SUCCESS = 'FORGOT_URL_SUCCESS';
export const REGIST_URL_REQUEST = 'REGIST_URL_REQUEST';
export const REGIST_URL_ERROR = 'REGIST_URL_ERROR';
export const REGIST_URL_SUCCESS = 'REGIST_URL_SUCCESS';
export const ENTER_URL_REQUEST = 'ENTER_URL_REQUEST';
export const ENTER_URL_ERROR = 'ENTER_URL_ERROR';
export const ENTER_URL_SUCCESS = 'ENTER_URL_SUCCESS';
export const RESET_URL_REQUEST = 'RESET_URL_REQUEST';
export const RESET_URL_ERROR = 'RESET_URL_ERROR';
export const RESET_URL_SUCCESS = 'RESET_URL_SUCCESS';
export const PROFILE_URL_REQUEST = 'PROFILE_URL_REQUEST';
export const PROFILE_URL_ERROR = 'PROFILE_URL_ERROR';
export const PROFILE_URL_SUCCESS = 'PROFILE_URL_SUCCESS';
export const LOGOUT_URL_REQUEST = 'LOGOUT_URL_REQUEST';
export const LOGOUT_URL_ERROR = 'LOGOUT_URL_ERROR';
export const LOGOUT_URL_SUCCESS = 'LOGOUT_URL_SUCCESS';
export const UPDATE_URL_REQUEST = 'UPDATE_URL_REQUEST';
export const UPDATE_URL_ERROR = 'UPDATE_URL_ERROR';
export const UPDATE_URL_SUCCESS = 'UPDATE_URL_SUCCESS';
export const REFRESH_URL_REQUEST = 'REFRESH_URL_REQUEST';
export const REFRESH_URL_ERROR = 'REFRESH_URL_ERROR';
export const REFRESH_URL_SUCCESS = 'REFRESH_URL_SUCCESS';
export const SET_LOGOUT_DATA = 'SET_LOGOUT_DATA';

//функция на сброс пароля
export function forgotRequest(resetURL, data) {
    return function (dispatch) {
        dispatch({
            type: FORGOT_URL_REQUEST,
        });
        fetch(resetURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ email: data }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    dispatch({ type: FORGOT_URL_ERROR });
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            })
            .then(() => {
                setCookie('forgot', 'ok', 1200);
                dispatch({ type: FORGOT_URL_SUCCESS });
            })
            .catch((e) => console.error(e));
    };
}
//функция на установления нового запроса
export function registerRequest(email, password, name, registerURL) {
    return function (dispatch) {
        dispatch({
            type: REGIST_URL_REQUEST,
        });
        fetch(registerURL, {
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
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    dispatch({ type: REGIST_URL_ERROR });
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            })
            .then((data) => {
                document.cookie =
                    ' ' +
                    encodeURIComponent('accessToken') +
                    '=' +
                    encodeURIComponent(data.accessToken.split(' ')[1]) +
                    '; path=/;';
                document.cookie =
                    ' ' +
                    encodeURIComponent('refreshToken') +
                    '=' +
                    encodeURIComponent(data.refreshToken) +
                    '; path=/;';
                setCookie('password', password, 1200);
                dispatch({ type: REGIST_URL_SUCCESS });
            })
            .catch((e) => console.error(e));
    };
}

//вставка куков
export function setCookie(name, value, duration) {
    document.cookie =
        ' ' +
        encodeURIComponent(name) +
        '=' +
        encodeURIComponent(value) +
        '; path=/; max-age=' +
        duration;
}

//функция на установления нового запроса
export function enterRequest(email, password, enterURL) {
    return function (dispatch) {
        dispatch({
            type: ENTER_URL_REQUEST,
        });
        fetch(enterURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    dispatch({ type: ENTER_URL_ERROR });
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            })
            .then((data) => {
                document.cookie =
                    ' ' +
                    encodeURIComponent('accessToken') +
                    '=' +
                    encodeURIComponent(data.accessToken.split(' ')[1]) +
                    '; path=/;';
                document.cookie =
                    ' ' +
                    encodeURIComponent('refreshToken') +
                    '=' +
                    encodeURIComponent(data.refreshToken) +
                    '; path=/;';
                document.cookie =
                    ' ' +
                    encodeURIComponent('password') +
                    '=' +
                    encodeURIComponent(password) +
                    '; path=/;';

                dispatch({ type: ENTER_URL_SUCCESS });
            })
            .catch((e) => console.error(e));
    };
}

//функция на установления нового запроса
export function resetRequest(password, token, resetURL) {
    return function (dispatch) {
        dispatch({
            type: RESET_URL_REQUEST,
        });
        fetch(resetURL, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                password: password,
                token: token,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    dispatch({ type: RESET_URL_ERROR });
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            })
            .then(() => {
                dispatch({ type: RESET_URL_SUCCESS });
                document.cookie = 'forgot=delete; max-age=0';
            })
            .catch((e) => console.error(e));
    };
}

export function profileRequest(profileURL, tokenURL) {
    return function (dispatch) {
        dispatch({
            type: PROFILE_URL_REQUEST,
        });
        fetch(profileURL, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + getCookie('accessToken'),
                'Content-Type': 'application/json;charset=utf-8',
            },
        })
            .then((result) => {
                if (result.ok) {
                    return result.json();
                } else {
                    dispatch({ type: PROFILE_URL_ERROR });
                    return Promise.reject(`Ошибка ${result.status}`);
                }
            })
            .then((result) => {
                dispatch({
                    type: PROFILE_URL_SUCCESS,
                    data: result,
                });
            })
            .catch((e) => {
                dispatch(setNewToken(getCookie('refreshToken'), tokenURL));
                console.error(e);
            });
    };
}

function setNewToken(token, tokenURL) {
    return function (dispatch) {
        dispatch({
            type: REFRESH_URL_REQUEST,
        });
        fetch(tokenURL, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                token: token,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    dispatch({ type: REFRESH_URL_ERROR });
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            })
            .then((data) => {
                // console.log(
                //     'Old token ' +
                //         getCookie('accessToken') +
                //         '  New token: ' +
                //         data.accessToken.split(' ')[1]
                // );
                document.cookie = 'accessToken=delete; max-age=0';
                document.cookie = 'refreshToken=delete; max-age=0';
                document.cookie =
                    ' ' +
                    encodeURIComponent('accessToken') +
                    '=' +
                    encodeURIComponent(data.accessToken.split(' ')[1]) +
                    '; path=/;';
                document.cookie =
                    ' ' +
                    encodeURIComponent('refreshToken') +
                    '=' +
                    encodeURIComponent(data.refreshToken) +
                    '; path=/;';
                dispatch({ type: REFRESH_URL_SUCCESS });
                document.cookie = 'forgot=delete; max-age=0';
            })
            .catch((e) => console.error(e));
    };
}

//функция на сброс пароля
export function logoutRequest(logoutURL) {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_URL_REQUEST,
        });
        fetch(logoutURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                token: getCookie('refreshToken'),
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    dispatch({ type: LOGOUT_URL_ERROR });
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            })
            .then((data) => {
                // console.log(data);
                document.cookie = 'accessToken=;max-age=-1';
                document.cookie = 'refreshToken=;max-age=-1';
                document.cookie = 'password=;max-age=-1';
                document.cookie = 'forgot=;max-age=-1';
                // cookies.remove('accessToken');
                // cookies.remove('refreshToken');
                // cookies.remove('password');
                // cookies.remove('forgot');
                dispatch({ type: LOGOUT_URL_SUCCESS });
            })
            .catch((e) => console.error(e));
    };
}

//функция на обновление данных
export function updateRequest(updateURL, name, email, password) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_URL_REQUEST,
        });
        fetch(updateURL, {
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
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    dispatch({ type: UPDATE_URL_ERROR });
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            })
            .then((data) => {
                // console.log(data);
                dispatch({ type: UPDATE_URL_SUCCESS, data: data });
            })
            .catch((e) => console.error(e));
    };
}

//функция получения определённой куки
export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)'
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

//функция на обновление данных
export function setLogoutData(updateURL, name, email, password) {
    return function (dispatch) {
        dispatch({ type: SET_LOGOUT_DATA });
    };
}
