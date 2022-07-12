import { checkResponse } from '../../utils/functions/checkResponse';
import { getCookie } from '../../utils/functions/cookieFunctions/getCookie';
import { TCard, TOrder } from '../../utils/types/types';
import { AppDispatch } from '../../utils/types/store';
export const SET_STATE: 'SET_STATE' = 'SET_STATE';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_COMPONENT: 'ADD_COMPONENT' = 'ADD_COMPONENT';
export const CHANGE_BUN: 'CHANGE_BUN' = 'CHANGE_BUN';
export const SET_DATA: 'SET_DATA' = 'SET_DATA';
export const SET_ACTIVE: 'SET_ACTIVE' = 'SET_ACTIVE';
export const CLEAR_INFO: 'CLEAR_INFO' = 'CLEAR_INFO';
export const DRAG_ELEMENT: 'DRAG_ELEMENT' = 'DRAG_ELEMENT';
export const CHANGE_COMPONENTS: 'CHANGE_COMPONENTS' = 'CHANGE_COMPONENTS';
export const SET_ON_DRAG: 'SET_ON_DRAG' = 'SET_ON_DRAG';
export const SWAP_COMPONENTS: 'SWAP_COMPONENTS' = 'SWAP_COMPONENTS';
export const CHANGE_SWAP: 'CHANGE_SWAP' = 'CHANGE_SWAP';
export const ORDER_URL_REQUEST: 'ORDER_URL_REQUEST' = 'ORDER_URL_REQUEST';
export const ORDER_URL_ERROR: 'ORDER_URL_ERROR' = 'ORDER_URL_ERROR';
export const ORDER_URL_SUCCESS: 'ORDER_URL_SUCCESS' = 'ORDER_URL_SUCCESS';
export const GET_INGREDIENTS_URL_REQUEST: 'GET_INGREDIENTS_URL_REQUEST' =
    'GET_INGREDIENTS_URL_REQUEST';
export const GET_INGREDIENTS_URL_ERROR: 'GET_INGREDIENTS_URL_ERROR' =
    'GET_INGREDIENTS_URL_ERROR';
export const GET_INGREDIENTS_URL_SUCCESS: 'GET_INGREDIENTS_URL_SUCCESS' =
    'GET_INGREDIENTS_URL_SUCCESS';
export const SET_ORDER_INFO: 'SET_ORDER_INFO' = 'SET_ORDER_INFO';
export const SET_ORDER_ACTIVE: 'SET_ORDER_ACTIVE' = 'SET_ORDER_ACTIVE';

//fetch - функция для получения данных
export function fetchData(refURL: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_URL_REQUEST,
        });
        fetch(refURL)
            .then(checkResponse)
            .then((result: any) => {
                //<--- TCard | string | undefined, но не работает
                dispatch({
                    type: GET_INGREDIENTS_URL_SUCCESS,
                    data: result.data,
                });
            })
            .catch(() => dispatch({ type: GET_INGREDIENTS_URL_ERROR }));
    };
}

//установка данных карты
export function setData(card: TCard | null) {
    return function (dispatch: AppDispatch) {
        // document.cookie = 'data=' + JSON.stringify(card) + '; path=/;';
        dispatch({ type: SET_DATA, data: card });
    };
}

//изменение статуса активности модального окна
export function setActive(data: boolean) {
    return function (dispatch: AppDispatch) {
        dispatch({ type: SET_ACTIVE, value: data });
    };
}

//функция удаления всего заказа
export function clearInfo(ingredients: TCard[]) {
    return function (dispatch: AppDispatch) {
        let arr = ingredients.map((cards: TCard) => {
            cards['__v'] = 0;
            return cards;
        });

        dispatch({ type: CLEAR_INFO, data: arr });
        dispatch({ type: SET_ORDER_ACTIVE, data: false });
    };
}

//функция получения номера заказа
export function getNumberOrder(array: string[], fetchURL: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: ORDER_URL_REQUEST,
        });
        fetch(fetchURL, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + getCookie('accessToken'),
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ ingredients: array }),
        })
            .then(checkResponse)
            .then((data) => {
                // console.log(data);
                dispatch({ type: ORDER_URL_SUCCESS });
                dispatch({ type: SET_ORDER_INFO, data: data });
            })
            .catch(() => dispatch({ type: ORDER_URL_ERROR }));
    };
}

// запись перетаскиваемого элемента
export function dragElement(cards: TCard, cart: string, isReady: boolean) {
    return function (dispatch: AppDispatch) {
        // console.log(cart);
        dispatch({
            type: DRAG_ELEMENT,
            data: cards,
            cartData: cart,
            isReady: isReady,
        });
    };
}

//функция изменения счётчика ингредиентов
export function increaseCounter(changeElement: TCard, ingredients: TCard[]) {
    return function (dispatch: AppDispatch) {
        let arr: TCard[];
        if (changeElement.type === 'bun') {
            arr = ingredients.map((cards: TCard) => {
                if (cards.type === 'bun') {
                    cards['__v'] = 0;
                }
                return cards;
            });
        }
        arr = ingredients.map((cards: TCard) => {
            if (cards['_id'] === changeElement['_id']) {
                if (changeElement.type === 'bun') {
                    cards['__v'] += 2;
                } else {
                    cards['__v']++;
                }
            }

            return cards;
        });
        dispatch({ type: SET_STATE, data: arr });
    };
}

export function decreaseCounter(changeElement: TCard, ingredients: TCard[]) {
    return function (dispatch: AppDispatch) {
        let arr: TCard[] = ingredients.map((cards) => {
            if (cards['_id'] === changeElement['_id']) {
                cards['__v']--;
            }

            return cards;
        });
        dispatch({ type: SET_STATE, data: arr });
    };
}
//функция перетаскивания элемента при бросании
export function replaceElement(
    dragElement: TCard,
    underDraggedElement: TCard,
    components: TCard[],
    buns: TCard,
    cart: string,
    isReady: boolean
) {
    return function (dispatch: AppDispatch) {
        if (cart === 'ingredients') {
            dragElement && dragElement.type === 'bun'
                ? buns
                    ? dispatch({
                          type: CHANGE_BUN,
                          data: dragElement,
                      })
                    : dispatch({ type: ADD_BUN, data: dragElement })
                : dispatch({
                      type: ADD_COMPONENT,
                      data: dragElement,
                  });
        } else {
            if (!isReady) {
                const currentIndex: number = components.indexOf(dragElement);
                const dropInd: number = components.indexOf(underDraggedElement);
                if (currentIndex < dropInd) {
                    // console.log(
                    //     'DOWN\ndropInd: ' + dropInd + '\nCurrent' + currentIndex
                    // );
                    components.splice(currentIndex, 1);
                    const dropIndex: number =
                        components.indexOf(underDraggedElement);
                    components.splice(dropIndex + 1, 0, dragElement);
                } else {
                    // console.log(
                    //     'UP\ndropInd: ' + dropInd + '\nCurrent' + currentIndex
                    // );
                    components.splice(currentIndex, 1);
                    const dropIndex: number =
                        components.indexOf(underDraggedElement);
                    components.splice(dropIndex, 0, dragElement);
                }
                dispatch({
                    type: SWAP_COMPONENTS,
                    data: components,
                    isReady: true,
                });
            }
        }
    };
}

//функция записи элемента, лежащего под перетаскиваемым
export function setDragOver(card: TCard) {
    return function (dispatch: AppDispatch) {
        dispatch({ type: SET_ON_DRAG, data: card });
    };
}

export function deleteElement(
    index: number,
    changeElement: TCard,
    ingredients: TCard[],
    length: number
) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: CHANGE_COMPONENTS,
            index: index,
            length: length,
            element: changeElement,
        });
    };
}

export function getOrder(buns: TCard, components: TCard[], fetchURL: string) {
    return function (dispatch: AppDispatch) {
        const ingredients = [buns, ...components, buns];
        const ingredientIds = ingredients.map(
            (ingredient: TCard) => ingredient._id
        );
        dispatch(getNumberOrder(ingredientIds, fetchURL));
        dispatch(setActive(true));
        dispatch({ type: SET_ORDER_ACTIVE, data: true });
    };
}
