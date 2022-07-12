import {
    Action,
    ActionCreator,
    applyMiddleware,
    compose,
    createStore,
} from 'redux';
import { rootReducer } from '../../Services/reducers/components';

import { TComponentsActions } from './actionComponentsTypes';
import { TRequestActions } from './actionRequestsTypes';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
    useDispatch as dispatchHook,
} from 'react-redux';
import { TSocketActions } from './actionSocketTypes';
import { socketMiddleware } from '../../Services/middleware/socketMiddleware';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_GET_MESSAGE,
    WS_CONNECTION_SEND_MESSAGE,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
} from '../../Services/actions/socketActions';

const wsUrl = 'wss://norma.nomoreparties.space/orders';

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_CONNECTION_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_CONNECTION_GET_MESSAGE,
};

export const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const enhancer = composeEnhancers(
    applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
);

export const store = createStore(rootReducer, enhancer);

// получение состояний хранилища
export type RootState = ReturnType<typeof store.getState>;
// единый тип для экшенов
export type TApplicationActions =
    | TComponentsActions
    | TRequestActions
    | TSocketActions;

// типизация thunk
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// типизация хранилища и thunk
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

// типизация useSelector
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// типизация useDispatch
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
