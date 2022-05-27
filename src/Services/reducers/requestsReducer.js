import {
    ENTER_URL_ERROR,
    ENTER_URL_REQUEST,
    ENTER_URL_SUCCESS,
    FORGOT_URL_ERROR,
    FORGOT_URL_REQUEST,
    FORGOT_URL_SUCCESS,
    LOGOUT_URL_ERROR,
    LOGOUT_URL_REQUEST,
    LOGOUT_URL_SUCCESS,
    PROFILE_URL_ERROR,
    PROFILE_URL_REQUEST,
    PROFILE_URL_SUCCESS,
    REFRESH_URL_ERROR,
    REFRESH_URL_REQUEST,
    REFRESH_URL_SUCCESS,
    REGIST_URL_ERROR,
    REGIST_URL_REQUEST,
    REGIST_URL_SUCCESS,
    RESET_URL_ERROR,
    RESET_URL_REQUEST,
    RESET_URL_SUCCESS,
    SET_LOGOUT_DATA,
    UPDATE_URL_ERROR,
    UPDATE_URL_REQUEST,
    UPDATE_URL_SUCCESS,
} from '../actions/requestsActions';

const initialState = {
    //логин пользователя
    email: '',

    //имя пользователя
    name: '',

    //блок страницы /forgot-password
    //отправка запроса на сброс пароля
    forgotRequestRequest: false,

    //успех запроса на сброс пароля
    forgotRequestSuccess: false,

    //ошибка в запросе на сброс пароля
    forgotRequestError: false,

    //блок страницы /reset-password
    //отправка запроса на регистрацию
    resetRequestRequest: false,

    //успех запроса на регистрацию
    resetRequestSuccess: false,

    //ошибка в запросе на регистрацию
    resetRequestError: false,

    //отправка запроса на регистрацию
    profileRequestRequest: false,

    //успех запроса на регистрацию
    profileRequestSuccess: false,

    //ошибка в запросе на регистрацию
    profileRequestError: false,

    //блок страницы /login
    //отправка запроса на вход пользователя
    enterRequestRequest: false,

    //успех запроса на вход пользователя
    enterRequestSuccess: false,

    //ошибка в запросе на вход пользователя
    enterRequestError: false,

    //блок страницы /register
    //отправка запроса на регистрацию
    registerRequestRequest: false,

    //успех запроса на регистрацию
    registerRequestSuccess: false,

    //ошибка в запросе на регистрацию
    registerRequestError: false,

    //блок страницы /logout
    //отправка запроса на регистрацию
    logoutRequestRequest: false,

    //успех запроса на регистрацию
    logoutRequestSuccess: false,

    //ошибка в запросе на регистрацию
    logoutRequestError: false,

    isLogout: false,

    //блок страницы /logout
    //отправка запроса на регистрацию
    updateRequestRequest: false,

    //успех запроса на регистрацию
    updateRequestSuccess: false,

    //ошибка в запросе на регистрацию
    updateRequestError: false,

    //блок страницы /token
    //отправка запроса на регистрацию
    tokenRequestRequest: false,

    //успех запроса на регистрацию
    tokenRequestSuccess: false,

    //ошибка в запросе на регистрацию
    tokenRequestError: false,

    //блок эндпоинтов
    //получение информации о пользователе
    profileURL: 'https://norma.nomoreparties.space/api/auth/user',

    //обновление информации о пользователе
    updateURL: 'https://norma.nomoreparties.space/api/auth/user',

    //адрес эндпоинта для обновления токена
    tokenURL: 'https://norma.nomoreparties.space/api/auth/token',

    //адрес эндпоинта для сброса пароля
    forgotURL: 'https://norma.nomoreparties.space/api/password-reset',

    //адрес эндпоинта для установки новых данных
    resetURL: ' https://norma.nomoreparties.space/api/password-reset/reset',

    //адрес эндпоинта для входа
    enterURL: 'https://norma.nomoreparties.space/api/auth/login',

    //адрес эндпоинта для регистрации новых данных
    registerURL: 'https://norma.nomoreparties.space/api/auth/register',

    //эндпоинт для выхода из системы
    logoutURL: 'https://norma.nomoreparties.space/api/auth/logout',
};

export const requestsReducer = (state = initialState, action) => {
    switch (action.type) {
        //запрос на сброс пароля
        case FORGOT_URL_REQUEST: {
            return {
                ...state,
                forgotRequestError: false,
                forgotRequestSuccess: false,
                forgotRequestRequest: true,
            };
        }

        //успешный запрос на сброс пароля
        case FORGOT_URL_SUCCESS: {
            return {
                ...state,
                forgotRequestRequest: false,
                forgotRequestError: false,
                forgotRequestSuccess: true,
            };
        }

        //неудачный запрос на сброс пароля
        case FORGOT_URL_ERROR: {
            return {
                ...state,
                forgotRequestRequest: false,
                forgotRequestError: true,
                forgotRequestSuccess: false,
            };
        }

        //запрос на восстановление пароля на регистрацию
        case REGIST_URL_REQUEST: {
            return {
                ...state,
                registerRequestError: false,
                registerRequestSuccess: false,
                registerRequestRequest: true,
            };
        }

        //успешный запрос на регистрацию
        case REGIST_URL_SUCCESS: {
            return {
                ...state,
                registerRequestRequest: false,
                registerRequestError: false,
                registerRequestSuccess: true,
            };
        }

        //неудачный запрос на регистрацию
        case REGIST_URL_ERROR: {
            return {
                ...state,
                registerRequestRequest: false,
                registerRequestError: true,
                registerRequestSuccess: false,
            };
        }

        //запрос на восстановление пароля на авторизацию
        case ENTER_URL_REQUEST: {
            return {
                ...state,
                enterRequestError: false,
                enterRequestSuccess: false,
                enterRequestRequest: true,
            };
        }

        //успешный запрос на авторизацию
        case ENTER_URL_SUCCESS: {
            return {
                ...state,
                isLogout: false,
                enterRequestRequest: false,
                enterRequestError: false,
                enterRequestSuccess: true,
            };
        }

        //неудачный запрос на авторизацию
        case ENTER_URL_ERROR: {
            return {
                ...state,
                enterRequestRequest: false,
                enterRequestError: true,
                enterRequestSuccess: false,
            };
        }

        //запрос на восстановление пароля на регистрацию
        case RESET_URL_REQUEST: {
            return {
                ...state,
                resetRequestError: false,
                resetRequestSuccess: false,
                resetRequestRequest: true,
            };
        }

        //успешный запрос на восстановление пароля
        case RESET_URL_SUCCESS: {
            return {
                ...state,
                resetRequestRequest: false,
                resetRequestError: false,
                resetRequestSuccess: true,
            };
        }

        //неудачный запрос на восстановление пароля
        case RESET_URL_ERROR: {
            return {
                ...state,
                resetRequestRequest: false,
                resetRequestError: true,
                resetRequestSuccess: false,
            };
        }
        //запрос на выход
        case LOGOUT_URL_REQUEST: {
            return {
                ...state,
                logoutRequestError: false,
                logoutRequestSuccess: false,
                logoutRequestRequest: true,
            };
        }

        //запрос на выход
        case SET_LOGOUT_DATA: {
            return {
                ...state,
                logoutRequestError: false,
                logoutRequestSuccess: false,
                logoutRequestRequest: false,
            };
        }

        //успешный запрос на выход
        case LOGOUT_URL_SUCCESS: {
            return {
                ...state,
                email: '',
                name: '',
                isLogout: true,
                logoutRequestRequest: false,
                logoutRequestError: false,
                logoutRequestSuccess: true,
            };
        }

        //неудачный запрос навыход
        case LOGOUT_URL_ERROR: {
            return {
                ...state,
                logoutRequestRequest: false,
                logoutRequestError: true,
                logoutRequestSuccess: false,
            };
        }

        //запрос на получение данных
        case PROFILE_URL_REQUEST: {
            return {
                ...state,
                profileRequestError: false,
                profileRequestSuccess: false,
                profileRequestRequest: true,
            };
        }

        //успешный запрос на получение данных
        case PROFILE_URL_SUCCESS: {
            return {
                ...state,
                email: action.data.user.email,
                name: action.data.user.name,
                profileRequestRequest: false,
                profileRequestError: false,
                profileRequestSuccess: true,
            };
        }

        //неудачный запрос на получение данных
        case PROFILE_URL_ERROR: {
            return {
                ...state,
                profileRequestRequest: false,
                profileRequestError: true,
                profileRequestSuccess: false,
            };
        }

        //запрос на обновление данных
        case UPDATE_URL_REQUEST: {
            return {
                ...state,
                updateRequestError: false,
                updateRequestSuccess: false,
                updateRequestRequest: true,
            };
        }

        //успешный запрос на обновление данных
        case UPDATE_URL_SUCCESS: {
            return {
                ...state,
                email: action.data.user.email,
                name: action.data.user.name,
                updateRequestRequest: false,
                updateRequestError: false,
                updateRequestSuccess: true,
            };
        }

        //неудачный запрос на обновление данных
        case UPDATE_URL_ERROR: {
            return {
                ...state,
                updateRequestRequest: false,
                updateRequestError: true,
                updateRequestSuccess: false,
            };
        }

        //запрос на обновление данных
        case REFRESH_URL_REQUEST: {
            return {
                ...state,
                tokenRequestError: false,
                tokenRequestSuccess: false,
                tokenRequestRequest: true,
            };
        }

        //успешный запрос на обновление данных
        case REFRESH_URL_SUCCESS: {
            return {
                ...state,
                tokenRequestRequest: false,
                tokenRequestError: false,
                tokenRequestSuccess: true,
            };
        }

        //неудачный запрос на обновление данных
        case REFRESH_URL_ERROR: {
            return {
                ...state,
                tokenRequestRequest: false,
                tokenRequestError: true,
                tokenRequestSuccess: false,
            };
        }

        //иное
        default: {
            return state;
        }
    }
};
