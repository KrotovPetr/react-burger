import { requestsReducer } from './requestsReducer';
import * as types from '../../actions/requestAction/requestsActions';
import { socketReducer } from '../socketReducer/socketReducer';

describe('request reducer', () => {
    it('should return the initial state', () => {
        expect(requestsReducer(undefined, {})).toEqual({
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

            isLogin: false,

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
            //общая часть ссылки
            baseURL: 'https://norma.nomoreparties.space/api',

            //состав заказа, доступный всем
            ordersActive: undefined,

            //состав заказа личного
            personOrdersActive: undefined,

            //запрос о составе заказа отправлен
            getOrderInfoRequestRequest: false,

            //запрос о составе заказа получен успешно
            getOrderInfoRequestSuccess: false,

            //запрос о составе заказа - ошибка
            getOrderInfoRequestError: false,

            //подробная информация о заказе и его номере
            orderIngredientInfo: undefined,
        });
    });

    it('should return the forgot URL error', () => {
        expect(
            requestsReducer(
                {
                    forgotRequestRequest: false, //<--change it
                    forgotRequestSuccess: false, //<--change it
                    forgotRequestError: false, //<--change it
                },
                { type: types.FORGOT_URL_ERROR }
            )
        ).toEqual({
            forgotRequestRequest: false, //<--changed it
            forgotRequestSuccess: false, //<--changed it
            forgotRequestError: true, //<--changed it
        });
    });
    it('should return the forgot URL request', () => {
        expect(
            requestsReducer(
                {
                    forgotRequestRequest: false, //<--change it
                    forgotRequestSuccess: false, //<--change it
                    forgotRequestError: false, //<--change it
                },
                { type: types.FORGOT_URL_REQUEST }
            )
        ).toEqual({
            forgotRequestRequest: true, //<--changed it
            forgotRequestSuccess: false, //<--changed it
            forgotRequestError: false, //<--changed it
        });
    });

    it('should return the forgot(password/token etc...) URL success', () => {
        expect(
            requestsReducer(
                {
                    forgotRequestRequest: false, //<--change it
                    forgotRequestSuccess: false, //<--change it
                    forgotRequestError: false, //<--change it
                },
                { type: types.FORGOT_URL_SUCCESS }
            )
        ).toEqual({
            forgotRequestRequest: false, //<--changed it
            forgotRequestSuccess: true, //<--changed it
            forgotRequestError: false, //<--changed it
        });
    });

    it('should return the enter URL error', () => {
        expect(
            requestsReducer(
                {
                    enterRequestRequest: false, //<--change it
                    enterRequestSuccess: false, //<--change it
                    enterRequestError: false, //<--change it
                },
                { type: types.ENTER_URL_ERROR }
            )
        ).toEqual({
            enterRequestRequest: false, //<--changed it
            enterRequestSuccess: false, //<--changed it
            enterRequestError: true, //<--changed it
        });
    });
    it('should return the enter URL request', () => {
        expect(
            requestsReducer(
                {
                    enterRequestRequest: false, //<--change it
                    enterRequestSuccess: false, //<--change it
                    enterRequestError: false, //<--change it
                },
                { type: types.ENTER_URL_REQUEST }
            )
        ).toEqual({
            enterRequestRequest: true, //<--changed it
            enterRequestSuccess: false, //<--changed it
            enterRequestError: false, //<--changed it
        });
    });

    it('should return the enter URL success', () => {
        expect(
            requestsReducer(
                {
                    enterRequestRequest: false, //<--change it
                    enterRequestSuccess: false, //<--change it
                    enterRequestError: false, //<--change it
                    isLogout: false, //<--change it
                    isLogin: false, //<--change it
                },
                { type: types.ENTER_URL_SUCCESS }
            )
        ).toEqual({
            enterRequestRequest: false, //<--changed it
            enterRequestSuccess: true, //<--changed it
            enterRequestError: false, //<--changed it
            isLogout: false,
            isLogin: true, //<---changed it
        });
    });
    it('should return get order URL error', () => {
        expect(
            requestsReducer(
                {
                    getOrderInfoRequestRequest: false, //<--change it
                    getOrderInfoRequestSuccess: false, //<--change it
                    getOrderInfoRequestError: false, //<--change it
                },
                { type: types.GET_ORDER_INFO_ERROR }
            )
        ).toEqual({
            getOrderInfoRequestRequest: false, //<--changed it
            getOrderInfoRequestSuccess: false, //<--changed it
            getOrderInfoRequestError: true, //<--changed it
        });
    });
    it('should return the get order info URL request', () => {
        expect(
            requestsReducer(
                {
                    getOrderInfoRequestRequest: false, //<--change it
                    getOrderInfoRequestSuccess: false, //<--change it
                    getOrderInfoRequestError: false, //<--change it
                },
                { type: types.GET_ORDER_INFO_REQUEST }
            )
        ).toEqual({
            getOrderInfoRequestRequest: true, //<--changed it
            getOrderInfoRequestSuccess: false, //<--changed it
            getOrderInfoRequestError: false, //<--changed it
        });
    });

    it('should return the get order info URL success', () => {
        expect(
            requestsReducer(
                {
                    getOrderInfoRequestRequest: false, //<--change it
                    getOrderInfoRequestSuccess: false, //<--change it
                    getOrderInfoRequestError: false, //<--change it
                    orderIngredientInfo: undefined,
                },
                {
                    type: types.GET_ORDER_INFO_SUCCESS,
                    data: 'something interesting',
                }
            )
        ).toEqual({
            getOrderInfoRequestRequest: false, //<--changed it
            getOrderInfoRequestSuccess: true, //<--changed it
            getOrderInfoRequestError: false, //<--changed it
            orderIngredientInfo: 'something interesting',
        });
    });

    it('should return logout URL error', () => {
        expect(
            requestsReducer(
                {
                    logoutRequestRequest: false, //<--change it
                    logoutRequestSuccess: false, //<--change it
                    logoutRequestError: false, //<--change it
                },
                { type: types.LOGOUT_URL_ERROR }
            )
        ).toEqual({
            logoutRequestRequest: false,
            logoutRequestSuccess: false,
            logoutRequestError: true,
        });
    });
    it('should return logout URL request', () => {
        expect(
            requestsReducer(
                {
                    isLogin: true,
                    logoutRequestRequest: false,
                    logoutRequestSuccess: false,
                    logoutRequestError: false,
                },
                { type: types.LOGOUT_URL_REQUEST }
            )
        ).toEqual({
            isLogin: false,
            logoutRequestRequest: true,
            logoutRequestSuccess: false,
            logoutRequestError: false,
        });
    });

    it('should return logout URL success', () => {
        expect(
            requestsReducer(
                {
                    email: 'random email',
                    name: 'random name',
                    isLogout: false,
                    isLogin: true,
                    logoutRequestRequest: true,
                    logoutRequestError: false,
                    logoutRequestSuccess: false,
                },
                {
                    type: types.LOGOUT_URL_SUCCESS,
                }
            )
        ).toEqual({
            email: '',
            name: '',
            isLogout: true,
            isLogin: false,
            logoutRequestRequest: false,
            logoutRequestError: false,
            logoutRequestSuccess: true,
        });
    });

    it('should return profile URL error', () => {
        expect(
            requestsReducer(
                {
                    profileRequestRequest: false, //<--change it
                    profileRequestSuccess: false, //<--change it
                    profileRequestError: false, //<--change it
                },
                { type: types.PROFILE_URL_ERROR }
            )
        ).toEqual({
            profileRequestRequest: false,
            profileRequestSuccess: false,
            profileRequestError: true,
        });
    });
    it('should return profile URL request', () => {
        expect(
            requestsReducer(
                {
                    profileRequestRequest: false,
                    profileRequestSuccess: false,
                    profileRequestError: false,
                },
                { type: types.PROFILE_URL_REQUEST }
            )
        ).toEqual({
            profileRequestRequest: true,
            profileRequestSuccess: false,
            profileRequestError: false,
        });
    });

    // it('should return profile URL success', () => {
    //     expect(
    //         requestsReducer(
    //             {
    //                 email: '',
    //                 name: '',
    //                 profileRequestRequest: true,
    //                 profileRequestError: false,
    //                 profileRequestSuccess: false,
    //             },
    //             {
    //                 type: types.PROFILE_URL_SUCCESS,
    //             }
    //         )
    //     ).toEqual({
    //         email: 'random email',
    //         name: 'random name',
    //
    //         profileRequestRequest: false,
    //         profileRequestError: false,
    //         profileRequestSuccess: true,
    //     });
    // });

    it('should return reset URL error', () => {
        expect(
            requestsReducer(
                {
                    resetRequestRequest: true,
                    resetRequestError: false,
                    resetRequestSuccess: false,
                },
                { type: types.RESET_URL_ERROR }
            )
        ).toEqual({
            resetRequestRequest: false,
            resetRequestError: true,
            resetRequestSuccess: false,
        });
    });
    it('should return reset URL request', () => {
        expect(
            requestsReducer(
                {
                    resetRequestRequest: false,
                    resetRequestError: false,
                    resetRequestSuccess: false,
                },
                { type: types.RESET_URL_REQUEST }
            )
        ).toEqual({
            resetRequestRequest: true,
            resetRequestError: false,
            resetRequestSuccess: false,
        });
    });

    it('should return reset URL success', () => {
        expect(
            requestsReducer(
                {
                    resetRequestRequest: true,
                    resetRequestError: false,
                    resetRequestSuccess: false,
                },
                {
                    type: types.RESET_URL_SUCCESS,
                }
            )
        ).toEqual({
            resetRequestRequest: false,
            resetRequestError: false,
            resetRequestSuccess: true,
        });
    });

    it('should return regist URL error', () => {
        expect(
            requestsReducer(
                {
                    registerRequestRequest: true,
                    registerRequestError: false,
                    registerRequestSuccess: false,
                },
                { type: types.REGIST_URL_ERROR }
            )
        ).toEqual({
            registerRequestRequest: false,
            registerRequestError: true,
            registerRequestSuccess: false,
        });
    });
    it('should return regist URL request', () => {
        expect(
            requestsReducer(
                {
                    registerRequestRequest: false,
                    registerRequestError: false,
                    registerRequestSuccess: false,
                },
                { type: types.REGIST_URL_REQUEST }
            )
        ).toEqual({
            registerRequestRequest: true,
            registerRequestError: false,
            registerRequestSuccess: false,
        });
    });

    it('should return regist URL success', () => {
        expect(
            requestsReducer(
                {
                    isLogin: false,
                    isLogout: false,
                    registerRequestRequest: true,
                    registerRequestError: false,
                    registerRequestSuccess: false,
                },
                {
                    type: types.REGIST_URL_SUCCESS,
                }
            )
        ).toEqual({
            isLogin: true,
            isLogout: false,
            registerRequestRequest: false,
            registerRequestError: false,
            registerRequestSuccess: true,
        });
    });

    it('should return refresh URL error', () => {
        expect(
            requestsReducer(
                {
                    tokenRequestRequest: false,
                    tokenRequestSuccess: false,
                    tokenRequestError: false,
                },
                { type: types.REFRESH_URL_ERROR }
            )
        ).toEqual({
            tokenRequestRequest: false,
            tokenRequestSuccess: false,
            tokenRequestError: true,
        });
    });
    it('should return refresh URL request', () => {
        expect(
            requestsReducer(
                {
                    tokenRequestRequest: false,
                    tokenRequestSuccess: false,
                    tokenRequestError: false,
                },
                { type: types.REFRESH_URL_REQUEST }
            )
        ).toEqual({
            tokenRequestRequest: true,
            tokenRequestSuccess: false,
            tokenRequestError: false,
        });
    });

    it('should return refresh URL success', () => {
        expect(
            requestsReducer(
                {
                    tokenRequestRequest: true,
                    tokenRequestError: false,
                    tokenRequestSuccess: false,
                },
                {
                    type: types.REFRESH_URL_SUCCESS,
                }
            )
        ).toEqual({
            tokenRequestRequest: false,
            tokenRequestError: false,
            tokenRequestSuccess: true,
        });
    });
    it('should clear active order information', () => {
        expect(
            socketReducer(
                {
                    orderIngredientInfo: undefined, //<---change it
                },
                { type: types.CLEAR_ORDER_INFO }
            )
        ).toEqual({
            orderIngredientInfo: undefined, //<--undefined now
        });
    });

    it('should return update URL error', () => {
        expect(
            requestsReducer(
                {
                    updateRequestRequest: true,
                    updateRequestError: false,
                    updateRequestSuccess: false,
                },
                { type: types.UPDATE_URL_ERROR }
            )
        ).toEqual({
            updateRequestRequest: false,
            updateRequestError: true,
            updateRequestSuccess: false,
        });
    });
    it('should return update URL request', () => {
        expect(
            requestsReducer(
                {
                    updateRequestRequest: false,
                    updateRequestError: false,
                    updateRequestSuccess: false,
                },
                { type: types.UPDATE_URL_REQUEST }
            )
        ).toEqual({
            updateRequestRequest: true,
            updateRequestError: false,
            updateRequestSuccess: false,
        });
    });
    it('should clear logout request status', () => {
        expect(
            requestsReducer(
                {
                    logoutRequestRequest: true,
                    logoutRequestError: true,
                    logoutRequestSuccess: true,
                },
                { type: types.SET_LOGOUT_DATA }
            )
        ).toEqual({
            logoutRequestRequest: false,
            logoutRequestError: false,
            logoutRequestSuccess: false,
        });
    });
    it('should send order info', () => {
        expect(
            requestsReducer(
                {
                    ordersActive: undefined,
                },
                { type: types.SET_ORDER_INFO, data: 'random string' }
            )
        ).toEqual({
            ordersActive: 'random string',
        });
    });
    it('should send person order info', () => {
        expect(
            requestsReducer(
                {
                    personOrdersActive: undefined,
                },
                { type: types.SET_PERSON_ORDER_INFO, data: 'random string' }
            )
        ).toEqual({
            personOrdersActive: 'random string',
        });
    });
    it('should return update URL success', () => {
        const user = { email: 'random email', name: 'random name' };
        const data = { success: true, user: user };
        expect(
            requestsReducer(
                {
                    email: '',
                    name: '',
                    updateRequestRequest: true,
                    updateRequestError: false,
                    updateRequestSuccess: false,
                },
                {
                    type: types.UPDATE_URL_SUCCESS,
                    data: data,
                }
            )
        ).toEqual({
            email: 'random email',
            name: 'random name',
            updateRequestRequest: false,
            updateRequestError: false,
            updateRequestSuccess: true,
        });
    });
});
