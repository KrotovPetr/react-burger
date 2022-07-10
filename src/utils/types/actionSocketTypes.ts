import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
} from '../../Services/actions/socketActions';

export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: any;
}
export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
    readonly payload: any;
}
export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: any;
}
export interface IWSConnectionSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: any;
}
export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
}
export interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: any;
}
export type TSocketActions =
    | IWSConnectionSuccess
    | IWSConnectionSendMessage
    | IWSConnectionError
    | IWSConnectionClosed
    | IWSConnectionStart
    | IWSGetMessage;
