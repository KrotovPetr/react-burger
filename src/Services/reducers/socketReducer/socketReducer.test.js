import { socketReducer } from './socketReducer';
import * as types from '../../actions/socketAction/socketActions';

//базовая ссылка на подключение к сокетам
const baseURL = 'wss://norma.nomoreparties.space/orders';
describe('socket reducer', () => {
    it('should return the initial state', () => {
        expect(socketReducer(undefined, {})).toEqual({
            data: undefined,
            WSUrl: baseURL,
            payload: undefined,
        });
    });
    it('should return closed data event', () => {
        expect(
            socketReducer(
                {
                    data: undefined,
                    WSUrl: baseURL,
                    payload: undefined,
                },
                { type: types.WS_CONNECTION_CLOSED }
            )
        ).toEqual({
            data: undefined,
            WSUrl: baseURL,
            payload: undefined,
        });
    });
    it('should return error data event', () => {
        expect(
            socketReducer(
                {
                    data: undefined,
                    WSUrl: baseURL,
                    payload: undefined,
                },
                {
                    type: types.WS_CONNECTION_ERROR,
                    payload: 'error object message',
                }
            )
        ).toEqual({
            data: 'error object message',
            WSUrl: baseURL,
            payload: undefined,
        });
    });
    it('should return start event data', () => {
        expect(
            socketReducer(
                {
                    data: undefined,
                    WSUrl: baseURL,
                    payload: undefined,
                },
                {
                    type: types.WS_CONNECTION_START,
                    wsUrl: baseURL,
                }
            )
        ).toEqual({
            data: undefined,
            WSUrl: baseURL,
            payload: undefined,
        });
    });
    it('should return success event data', () => {
        expect(
            socketReducer(
                {
                    data: undefined,
                    WSUrl: baseURL,
                    payload: undefined,
                },
                {
                    type: types.WS_CONNECTION_SUCCESS,
                    payload: 'success event data object',
                }
            )
        ).toEqual({
            data: 'success event data object',
            WSUrl: baseURL,
            payload: undefined,
        });
    });
    it('should return get message data', () => {
        expect(
            socketReducer(
                {
                    data: undefined,
                    WSUrl: baseURL,
                    payload: undefined,
                },
                {
                    type: types.WS_CONNECTION_GET_MESSAGE,
                    payload: {
                        _id: '62c6c87542d34a001c274c7a',
                        ingredients: [
                            '60d3b41abdacab0026a733c7',
                            '60d3b41abdacab0026a733c7',
                        ],
                        status: 'done',
                        name: 'Флюоресцентный бургер',
                        createdAt: '2022-07-07T11:50:13.787Z',
                        updatedAt: '2022-07-07T11:50:14.091Z',
                        number: 19592,
                    },
                }
            )
        ).toEqual({
            data: undefined,
            WSUrl: baseURL,
            payload: {
                _id: '62c6c87542d34a001c274c7a',
                ingredients: [
                    '60d3b41abdacab0026a733c7',
                    '60d3b41abdacab0026a733c7',
                ],
                status: 'done',
                name: 'Флюоресцентный бургер',
                createdAt: '2022-07-07T11:50:13.787Z',
                updatedAt: '2022-07-07T11:50:14.091Z',
                number: 19592,
            },
        });
    });
});
