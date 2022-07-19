import * as types from './requestsActions';
import * as actions from './requestsActions';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('request actions', () => {
    // it('should clear all info', () => {
    //     expect(actions.clearOrderInfo()).toEqual({
    //         type: types.CLEAR_ORDER_INFO,
    //     });
    // });
});
