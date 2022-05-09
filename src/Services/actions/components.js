export const SET_STATE = 'SET_STATE';
export const ADD_BUN = 'ADD_BUN';
export const ADD_COMPONENT = 'ADD_COMPONENT';
export const CHANGE_BUN = 'CHANGE_BUN';
export const SET_DATA = 'SET_DATA';
export const SET_ACTIVE = 'SET_ACTIVE';
export const SET_ORDER_DATA = 'SET_ORDER_DATA';
export const CLEAR_INFO = 'CLEAR_INFO';
export const DRAG_ELEMENT = 'DRAG_ELEMENT';
export const CHANGE_COMPONENTS = 'CHANGE_COMPONENTS';
export const SET_ON_DRAG = 'SET_ON_DRAG';
export const SWAP_COMPONENTS = 'SWAP_COMPONENTS';
export const CHANGE_SWAP = 'CHANGE_SWAP';

//fetch - функция для получения данных
export function fetchData(refURL) {
    return function (dispatch) {
        fetch(refURL)
            .then((result) => {
                if (result.ok) {
                    return result.json();
                }
                return Promise.reject(`Ошибка ${result.status}`);
            })
            .then((result) => {
                dispatch({
                    type: SET_STATE,
                    data: result.data,
                });
            })
            .catch((e) => console.error(e));
    };
}

//установка данных карты
export function setData(card) {
    return function (dispatch) {
        dispatch({ type: SET_DATA, data: card });
    };
}

//изменение статуса активности модального окна
export function setActive(data) {
    return function (dispatch) {
        dispatch({ type: SET_ACTIVE, value: data });
    };
}

//функция удаления всего заказа
export function clearInfo(ingredients) {
    return function (dispatch) {
        let arr = ingredients.map((cards) => {
            cards['__v'] = 0;
            return cards;
        });

        dispatch({ type: CLEAR_INFO, data: arr });
    };
}

//функция получения номера заказа
export function getNumberOrder(array, fetchURL) {
    return function (dispatch) {
        //запрос
        fetch(fetchURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ ingredients: array }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка ${res.status}`);
                }
            })
            .then((data) => {
                dispatch({ type: SET_ORDER_DATA, data: data });
            })
            .catch((e) => console.error(e));
    };
}

// запись перетаскиваемого элемента
export function dragElement(cards, cart, isReady) {
    return function (dispatch) {
        dispatch({
            type: DRAG_ELEMENT,
            data: cards,
            cartData: cart,
            isReady: isReady,
        });
    };
}

//функция изменения счётчика ингредиентов
export function increaseCounter(changeElement, ingredients) {
    return function (dispatch) {
        let arr;
        if (changeElement.type === 'bun') {
            arr = ingredients.map((cards) => {
                if (cards.type === 'bun') {
                    cards['__v'] = 0;
                }
                return cards;
            });
        }
        arr = ingredients.map((cards) => {
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

export function decreaseCounter(changeElement, ingredients) {
    return function (dispatch) {
        let arr = ingredients.map((cards) => {
            if (cards['_id'] === changeElement['_id']) {
                cards['__v'] = 0;
            }

            return cards;
        });
        dispatch({ type: SET_STATE, data: arr });
    };
}
//функция перетаскивания элемента при бросании
export function replaceElement(
    dragElement,
    underDraggedElement,
    components,
    buns,
    cart,
    isReady
) {
    return function (dispatch) {
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
            if (isReady !== true) {
                const currentIndex = components.indexOf(dragElement);
                const dropInd = components.indexOf(underDraggedElement);
                if (currentIndex < dropInd) {
                    // console.log(
                    //     'DOWN\ndropInd: ' + dropInd + '\nCurrent' + currentIndex
                    // );
                    components.splice(currentIndex, 1);
                    const dropIndex = components.indexOf(underDraggedElement);
                    components.splice(dropIndex + 1, 0, dragElement);
                } else {
                    // console.log(
                    //     'UP\ndropInd: ' + dropInd + '\nCurrent' + currentIndex
                    // );
                    components.splice(currentIndex, 1);
                    const dropIndex = components.indexOf(underDraggedElement);
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
export function setDragOver(card) {
    return function (dispatch) {
        dispatch({ type: SET_ON_DRAG, data: card });
    };
}

export function deleteElement(index, changeElement, ingredients, length) {
    return function (dispatch) {
        dispatch(decreaseCounter(changeElement, ingredients));
        dispatch({
            type: CHANGE_COMPONENTS,
            index: index,
            length: length,
            element: changeElement,
        });
    };
}

export function getOrder(buns, components, fetchURL) {
    return function (dispatch) {
        const ingredients = [buns, ...components, buns];
        const ingredientIds = ingredients.map((ingredient) => ingredient._id);
        dispatch(getNumberOrder(ingredientIds, fetchURL));
        dispatch(setActive(true));
    };
}
