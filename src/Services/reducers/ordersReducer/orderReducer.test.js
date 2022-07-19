import { orderReducer } from './orders';
import * as types from '../../actions/componentAction/components';

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual({
            //отправка запроса
            isOrderSend: false,

            //успех запроса
            isOrderSuccess: false,

            //ошибка в запросе
            isOrderError: false,
        });
    });
    it('should return order error(getting order number)', () => {
        expect(
            orderReducer(
                {
                    isOrderSend: false,
                    isOrderSuccess: false,
                    isOrderError: false,
                },
                { type: types.ORDER_URL_ERROR }
            )
        ).toEqual({
            isOrderSend: false,
            isOrderSuccess: false,
            isOrderError: true,
        });
    });

    it('should return order request(getting order number)', () => {
        expect(
            orderReducer(
                {
                    isOrderSend: false,
                    isOrderSuccess: false,
                    isOrderError: false,
                },
                { type: types.ORDER_URL_REQUEST }
            )
        ).toEqual({
            isOrderSend: true,
            isOrderSuccess: false,
            isOrderError: false,
        });
    });

    it('should return order success(getting order number)', () => {
        expect(
            orderReducer(
                {
                    isOrderSend: false,
                    isOrderSuccess: false,
                    isOrderError: false,
                },
                { type: types.ORDER_URL_SUCCESS }
            )
        ).toEqual({
            isOrderSend: false,
            isOrderSuccess: true,
            isOrderError: false,
        });
    });
});
