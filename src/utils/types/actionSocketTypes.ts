import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_GET_MESSAGE,
    WS_CONNECTION_SEND_MESSAGE,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
} from '../../Services/actions/socketActions';
import { TListOfOrders } from './types';

export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: Event;
}
export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly payload: any;
}
export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: ErrorEvent;
}
export interface IWSConnectionSendMessage {
    readonly type: typeof WS_CONNECTION_SEND_MESSAGE;
    readonly payload: any;
}
export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
}
export interface IWSGetMessage {
    readonly type: typeof WS_CONNECTION_GET_MESSAGE;
    readonly payload: TListOfOrders;
}
export type TSocketActions =
    | IWSConnectionSuccess
    | IWSConnectionSendMessage
    | IWSConnectionError
    | IWSConnectionClosed
    | IWSConnectionStart
    | IWSGetMessage;
