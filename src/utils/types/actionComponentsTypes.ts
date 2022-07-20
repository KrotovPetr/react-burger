import { TCard, TOrder } from './types';
import {
    ADD_BUN,
    ADD_COMPONENT,
    CHANGE_BUN,
    CHANGE_COMPONENTS,
    CHANGE_SWAP,
    CLEAR_INFO,
    DRAG_ELEMENT,
    GET_INGREDIENTS_URL_ERROR,
    GET_INGREDIENTS_URL_REQUEST,
    GET_INGREDIENTS_URL_SUCCESS,
    ORDER_URL_ERROR,
    ORDER_URL_REQUEST,
    ORDER_URL_SUCCESS,
    SET_ACTIVE,
    SET_DATA,
    SET_ON_DRAG,
    SET_ORDER_ACTIVE,
    SET_ORDER_INFO,
    SET_STATE,
    SWAP_COMPONENTS,
} from '../../Services/actions/componentAction/components';

export interface ISetState {
    readonly type: typeof SET_STATE;
    readonly data: TCard[];
}
export interface IAddBun {
    readonly type: typeof ADD_BUN;
    readonly data: TCard;
}
export interface IAddComponent {
    readonly type: typeof ADD_COMPONENT;
    readonly data: TCard;
}
export interface IChangeBun {
    readonly type: typeof CHANGE_BUN;
    readonly data: TCard;
}
export interface ISetData {
    readonly type: typeof SET_DATA;
    readonly data: TCard | null;
}
export interface ISetActive {
    readonly type: typeof SET_ACTIVE;
    readonly value: boolean;
}
export interface IClearInfo {
    readonly type: typeof CLEAR_INFO;
    readonly data: TCard[];
}
export interface IDragElement {
    readonly type: typeof DRAG_ELEMENT;
    readonly data: TCard;
    readonly isReady: boolean;
    readonly cartData: string;
}

export interface IChangeComponents {
    readonly type: typeof CHANGE_COMPONENTS;
    readonly length: number;
    readonly index: number;
    readonly element: TCard;
}
export interface ISetOnDrag {
    readonly type: typeof SET_ON_DRAG;
    readonly data: TCard;
}
// export interface IAddComponent {
//     readonly type: typeof SET_STATE;
// }
export interface ISwapComponents {
    readonly type: typeof SWAP_COMPONENTS;
    readonly isReady: boolean;
    readonly data: TCard[];
}
export interface IChangeSwap {
    readonly type: typeof CHANGE_SWAP;
    readonly isSwap: boolean;
}
export interface IOrderUrlSuccess {
    readonly type: typeof ORDER_URL_SUCCESS;
}
export interface IOrderUrlError {
    readonly type: typeof ORDER_URL_ERROR;
}
export interface IOrderUrlRequest {
    readonly type: typeof ORDER_URL_REQUEST;
}
export interface IGetIngredientsUrlRequest {
    readonly type: typeof GET_INGREDIENTS_URL_REQUEST;
}
export interface IGetIngredientsUrlSuccess {
    readonly type: typeof GET_INGREDIENTS_URL_SUCCESS;
    readonly data: TCard[] | [];
}
export interface IGetIngredientsUrlError {
    readonly type: typeof GET_INGREDIENTS_URL_ERROR;
}
export interface ISetOrderInfo {
    readonly type: typeof SET_ORDER_INFO;
    readonly data: TOrder | string | {};
}
export interface ISetOrderActive {
    readonly type: typeof SET_ORDER_ACTIVE;
    readonly data: boolean;
}

export type TComponentsActions =
    | ISetState
    | ISetOrderActive
    | ISetOrderInfo
    | IGetIngredientsUrlError
    | IGetIngredientsUrlSuccess
    | IGetIngredientsUrlRequest
    | IOrderUrlRequest
    | IOrderUrlError
    | IOrderUrlSuccess
    | IChangeSwap
    | ISwapComponents
    | IAddComponent
    | ISetOnDrag
    | IChangeComponents
    | IDragElement
    | IClearInfo
    | ISetActive
    | ISetData
    | IChangeBun
    | IAddBun;
