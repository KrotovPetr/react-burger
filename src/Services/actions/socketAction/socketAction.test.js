import * as types from './socketActions';
import {
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionGetMessage,
    wsConnectionStart,
    wsConnectionSuccess,
} from './socketActions';
describe('Action creators', () => {
    it('should create new websocket connection', () => {
        // Эталонный экшен
        const expectedAction = {
            type: types.WS_CONNECTION_START,
            wsUrl: 'some words',
        };

        expect(wsConnectionStart('some words')).toEqual(expectedAction);
    });
    it('should close connection', () => {
        // Эталонный экшен
        const expectedAction = {
            type: types.WS_CONNECTION_CLOSED,
        };

        expect(wsConnectionClosed()).toEqual(expectedAction);
    });

    it('should receive message from server', () => {
        // Эталонный экшен
        const expectedAction = {
            type: types.WS_CONNECTION_GET_MESSAGE,
            payload: 'message from server with orders',
        };

        expect(
            wsConnectionGetMessage('message from server with orders')
        ).toEqual(expectedAction);
    });

    it('should receive success data event to store', () => {
        // Эталонный экшен
        const expectedAction = {
            type: types.WS_CONNECTION_SUCCESS,
            payload: 'message with success event data object',
        };

        expect(
            wsConnectionSuccess('message with success event data object')
        ).toEqual(expectedAction);
    });
    it('should receive error data event to store', () => {
        // Эталонный экшен
        const expectedAction = {
            type: types.WS_CONNECTION_ERROR,
            payload: 'message with success event data object',
        };

        expect(
            wsConnectionError('message with success event data object')
        ).toEqual(expectedAction);
    });
});
