import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../../utils/types/store';

export const socketMiddleware = (wsUrl: string, wsActions: any): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: null | WebSocket = null;

        return (next) => (action) => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
            // const { token } = getState().token;
            // console.log(payload);
            if (type === wsInit) {
                // console.log(payload);
                socket = new WebSocket(wsUrl + payload);
            }

            if (socket) {
                socket.onopen = (event: Event) => {
                    // console.log('onSuccess');
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = (event: Event) => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = (event: MessageEvent) => {
                    // console.log('hello again!');
                    // console.log(event.data);
                    const parsedData = JSON.parse(event.data);
                    // console.log('onMessage');
                    // console.log(parsedData);
                    dispatch({
                        type: onMessage,
                        payload: parsedData,
                    });
                    // wsConnectionGetMessage(restParsedData);
                };

                socket.onclose = () => {
                    // console.log('close');
                    dispatch({
                        type: onClose,
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
