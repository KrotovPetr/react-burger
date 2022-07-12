import {
    ENTER_URL_ERROR,
    ENTER_URL_REQUEST,
    ENTER_URL_SUCCESS,
    FORGOT_URL_ERROR,
    FORGOT_URL_REQUEST,
    FORGOT_URL_SUCCESS,
    IS_AUTH,
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
    SET_ORDER_INFO,
    SET_PERSON_ORDER_INFO,
    UPDATE_URL_ERROR,
    UPDATE_URL_REQUEST,
    UPDATE_URL_SUCCESS,
} from '../../Services/actions/requestsActions';
import { TAutorization, TOrderIngredients } from './types';

export interface ISetPersonOrderInfo {
    readonly type: typeof SET_PERSON_ORDER_INFO;
    readonly data: TOrderIngredients | undefined;
}

export interface ISetOrderInfo {
    readonly type: typeof SET_ORDER_INFO;
    readonly data: TOrderIngredients | undefined;
}

export interface IIsAuth {
    readonly type: typeof IS_AUTH;
    readonly data: boolean;
}
export interface ISetLogoutData {
    readonly type: typeof SET_LOGOUT_DATA;
}
export interface IRefreshUrlSuccess {
    readonly type: typeof REFRESH_URL_SUCCESS;
}
export interface IRefreshUrlRequest {
    readonly type: typeof REFRESH_URL_REQUEST;
}
export interface IRefreshUrlError {
    readonly type: typeof REFRESH_URL_ERROR;
}
export interface IUpdateUrlSuccess {
    readonly type: typeof UPDATE_URL_SUCCESS;
    readonly data: any | TAutorization;
}
export interface IUpdateUrlError {
    readonly type: typeof UPDATE_URL_ERROR;
}
export interface IUpdateUrlRequest {
    readonly type: typeof UPDATE_URL_REQUEST;
}

export interface ILogoutUrlRequest {
    readonly type: typeof LOGOUT_URL_REQUEST;
}
export interface ILogoutUrlSuccess {
    readonly type: typeof LOGOUT_URL_SUCCESS;
}
export interface ILogoutUrlError {
    readonly type: typeof LOGOUT_URL_ERROR;
}

export interface IProfileUrlRequest {
    readonly type: typeof PROFILE_URL_REQUEST;
}
export interface IProfileUrlSuccess {
    readonly type: typeof PROFILE_URL_SUCCESS;
    readonly data: any | TAutorization;
}
export interface IProfileUrlError {
    readonly type: typeof PROFILE_URL_ERROR;
}

export interface IResetUrlSuccess {
    readonly type: typeof RESET_URL_SUCCESS;
}
export interface IResetUrlRequest {
    readonly type: typeof RESET_URL_REQUEST;
}
export interface IResetUrlError {
    readonly type: typeof RESET_URL_ERROR;
}

export interface IEnterUrlRequest {
    readonly type: typeof ENTER_URL_REQUEST;
}
export interface IEnterUrlSuccess {
    readonly type: typeof ENTER_URL_SUCCESS;
}
export interface IEnterUrlError {
    readonly type: typeof ENTER_URL_ERROR;
}

export interface IRegistUrlRequest {
    readonly type: typeof REGIST_URL_REQUEST;
}
export interface IRegistUrlSuccess {
    readonly type: typeof REGIST_URL_SUCCESS;
}
export interface IRegistUrlError {
    readonly type: typeof REGIST_URL_ERROR;
}
export interface IForgotUrlRequest {
    readonly type: typeof FORGOT_URL_REQUEST;
}
export interface IForgotUrlSuccess {
    readonly type: typeof FORGOT_URL_SUCCESS;
}
export interface IForgotUrlError {
    readonly type: typeof FORGOT_URL_ERROR;
}

export type TRequestActions =
    | IRegistUrlRequest
    | IRegistUrlSuccess
    | IRegistUrlError
    | IEnterUrlError
    | IEnterUrlSuccess
    | IEnterUrlRequest
    | IResetUrlError
    | IResetUrlSuccess
    | IResetUrlRequest
    | IProfileUrlError
    | IProfileUrlSuccess
    | IProfileUrlRequest
    | ILogoutUrlError
    | ILogoutUrlSuccess
    | ILogoutUrlRequest
    | IUpdateUrlRequest
    | IUpdateUrlError
    | IUpdateUrlSuccess
    | IRefreshUrlError
    | IRefreshUrlRequest
    | IRefreshUrlSuccess
    | ISetLogoutData
    | IIsAuth
    | IForgotUrlError
    | IForgotUrlSuccess
    | IForgotUrlRequest
    // | ISaveData
    | ISetOrderInfo
    | ISetPersonOrderInfo;
