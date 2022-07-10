import { AppDispatch } from '../../utils/types/store';
import { checkResponse } from '../../utils/functions/checkResponse';
import {
    FORGOT_URL_ERROR,
    FORGOT_URL_REQUEST,
    FORGOT_URL_SUCCESS,
} from './requestsActions';

export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' =
    'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' =
    'WS_CONNECTION_CLOSED';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
//
// //функция на открытие соединения
// export function wsOnOpen(ev: any) {
//     return function (dispatch: AppDispatch) {
//         dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: ev });
//     };
// }
// //функция на открытие соединения
// export function wsOnClose(ev: any) {
//     return function (dispatch: AppDispatch) {
//         dispatch({ type: 'WS_CONNECTION_CLOSED', payload: ev });
//     };
// }
//
// //функция на открытие соединения
// export function wsOnopen(ev: any) {
//     return function (dispatch: AppDispatch) {
//         dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: ev });
//     };
// }
//
// //функция на открытие соединения
// export function wsOnopen(ev: any) {
//     return function (dispatch: AppDispatch) {
//         dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: ev });
//     };
// }
//
// //функция на открытие соединения
// export function wsOnopen(ev: any) {
//     return function (dispatch: AppDispatch) {
//         dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: ev });
//     };
// }
