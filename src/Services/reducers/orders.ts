import {
    ORDER_URL_ERROR,
    ORDER_URL_SUCCESS,
    ORDER_URL_REQUEST,
} from '../actions/components';
import { TComponentsActions } from '../../utils/types/actionComponentsTypes';

export type TOrderState = {
    isOrderSend: boolean;
    isOrderSuccess: boolean;
    isOrderError: boolean;
};
const initialState: TOrderState = {
    //отправка запроса
    isOrderSend: false,

    //успех запроса
    isOrderSuccess: false,

    //ошибка в запросе
    isOrderError: false,
};

export const orderReducer = (
    state: TOrderState = initialState,
    action: TComponentsActions
): TOrderState => {
    switch (action.type) {
        case ORDER_URL_REQUEST: {
            return {
                ...state,
                isOrderError: false,
                isOrderSuccess: false,
                isOrderSend: true,
            };
        }

        case ORDER_URL_SUCCESS: {
            return {
                ...state,
                isOrderSend: false,
                isOrderError: false,
                isOrderSuccess: true,
            };
        }

        case ORDER_URL_ERROR: {
            return {
                ...state,
                isOrderSend: false,
                isOrderError: true,
                isOrderSuccess: false,
            };
        }

        //иное
        default: {
            return state;
        }
    }
};
