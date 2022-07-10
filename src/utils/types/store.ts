import { Action, ActionCreator, createStore } from 'redux';
import { rootReducer } from '../../Services/reducers/components';

import { TComponentsActions } from './actionComponentsTypes';
import { TRequestActions } from './actionRequestsTypes';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';
import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
    useDispatch as dispatchHook,
} from 'react-redux';
import { TSocketActions } from './actionSocketTypes';

const store = createStore(rootReducer);
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
export type AppDispatch = Dispatch<TApplicationActions>;

// типизация useSelector
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// типизация useDispatch
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
