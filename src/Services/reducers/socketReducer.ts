import { TSocketActions } from '../../utils/types/actionSocketTypes';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
} from '../actions/socketActions';

export type TSocketReducer = { data: any; WSUrl: string };
const initialState: TSocketReducer = {
    data: undefined,
    WSUrl: 'wss://norma.nomoreparties.space/orders',
};
export const socketReducer = (
    state: TSocketReducer = initialState,
    action: TSocketActions
): TSocketReducer => {
    switch (action.type) {
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case WS_CONNECTION_START: {
            return {
                ...state,
            };
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case WS_SEND_MESSAGE: {
            return {
                ...state,
            };
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                data: action.payload,
            };
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                data: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};