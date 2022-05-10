import {
    ORDER_URL_ERROR,
    ORDER_URL_SUCCESS,
    ORDER_URL_REQUEST,
} from '../actions/components';

const initialState = {
    //отправка запроса
    isOrderSend: false,

    //успех запроса
    isOrderSuccess: false,

    //ошибка в запросе
    isOrderError: false,
};

export const orderReducer = (state = initialState, action) => {
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
