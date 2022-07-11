import { TListOfOrders } from '../../utils/types/types';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' =
    'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' =
    'WS_CONNECTION_CLOSED';
// export const WS_CONNECTION_END: 'WS_CONNECTION_END' = 'WS_CONNECTION_END';
export const WS_CONNECTION_GET_MESSAGE: 'WS_CONNECTION_GET_MESSAGE' =
    'WS_CONNECTION_GET_MESSAGE';
export const WS_CONNECTION_SEND_MESSAGE: 'WS_CONNECTION_SEND_MESSAGE' =
    'WS_CONNECTION_SEND_MESSAGE';

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly wsUrl: string;
}
export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    readonly payload: Event;
}
export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: ErrorEvent;
}
export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSConnectionGetMessage {
    readonly type: typeof WS_CONNECTION_GET_MESSAGE;
    readonly payload: TListOfOrders;
}
export interface IWSConnectionSendMessage {
    readonly type: typeof WS_CONNECTION_SEND_MESSAGE;
    readonly payload: any;
}

export type TWSConnectionActions =
    | IWSConnectionSendMessage
    | IWSConnectionGetMessage
    | IWSConnectionClosed
    | IWSConnectionError
    | IWSConnectionSuccess
    | IWSConnectionStart;

export const wsConnectionStart = (wsUrl: string): IWSConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        wsUrl: wsUrl,
    };
};
//
// export const wsClose = (): IWSConnectionClosed => {
//     return {
//         type: WS_CONNECTION_END,
//     };
// };

export const wsConnectionSuccess = (payload: Event): IWSConnectionSuccess => {
    console.log(payload);
    return {
        type: WS_CONNECTION_SUCCESS,
        payload: payload,
    };
};

export const wsConnectionError = (payload: ErrorEvent): IWSConnectionError => {
    return {
        type: WS_CONNECTION_ERROR,
        payload: payload,
    };
};

export const wsConnectionClosed = (): IWSConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED,
    };
};

export const wsConnectionGetMessage = (
    message: TListOfOrders
): IWSConnectionGetMessage => {
    return {
        type: WS_CONNECTION_GET_MESSAGE,
        payload: message,
    };
};

export const wsConnectionSendMessage = (
    message: any //<-----тут может быть что угодно
): IWSConnectionSendMessage => {
    return {
        type: WS_CONNECTION_SEND_MESSAGE,
        payload: message,
    };
};
