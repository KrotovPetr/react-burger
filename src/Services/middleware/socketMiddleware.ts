import {
    WS_CONNECTION_GET_MESSAGE,
    WS_CONNECTION_START,
    wsConnectionError,
    wsConnectionGetMessage,
    wsConnectionStart,
} from '../actions/socketActions';
import { useLocation } from 'react-router-dom';

export const socketMiddleware = (wsUrl: string, wsActions: any) => {
    return (store: any) => {
        let socket: null | WebSocket = null;

        return (next: any) => (action: any) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            // const { token } = getState().token;
            // console.log(payload);
            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(wsUrl + payload);
            }

            if (socket) {
                socket.onopen = (event: Event) => {
                    // console.log('onSuccess');
                    dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
                };

                socket.onerror = (event: Event) => {
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
                };

                socket.onmessage = (event: MessageEvent) => {
                    // console.log('hello again!');
                    // console.log(event.data);
                    const parsedData = JSON.parse(event.data);
                    const { success, ...restParsedData } = parsedData;
                    // console.log('onMessage');
                    dispatch({
                        type: 'WS_CONNECTION_GET_MESSAGE',
                        payload: parsedData,
                    });
                    // wsConnectionGetMessage(restParsedData);
                };

                socket.onclose = (event: CloseEvent) => {
                    dispatch({
                        type: 'WS_CONNECTION_CLOSE',
                        payload: event,
                    });
                };

                // if (type === wsSendMessage) {
                //     const message = { ...payload, token: user.token };
                //     socket.send(JSON.stringify(message));
                // }
            }

            next(action);
        };
    };
};
