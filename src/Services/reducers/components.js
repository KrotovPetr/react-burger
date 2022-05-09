import {
    SET_STATE,
    ADD_COMPONENT,
    ADD_BUN,
    CHANGE_BUN,
    SET_ACTIVE,
    SET_DATA,
    SET_ORDER_DATA,
    CLEAR_INFO,
    DRAG_ELEMENT,
    CHANGE_COMPONENTS,
    SET_ON_DRAG,
    SWAP_COMPONENTS,
    CHANGE_SWAP,
} from '../actions/components';

import { combineReducers } from 'redux';

const initialState = {
    //список всех ингредиентов
    ingredients: [],

    //итоговая цена заказа
    totalPrice: 0,

    //заказ
    order: {
        buns: null,
        components: [],
    },

    //ссылка на ингредиенты
    refURL: 'https://norma.nomoreparties.space/api/ingredients',

    //состояние модального окна
    isActiv: false,

    //данные карточки ингредиента
    cardData: null,

    //ссылка на номер заказа
    fetchURL: 'https://norma.nomoreparties.space/api/orders',

    //хранение информации заказа
    orderInfo: null,

    //перетаскиваемый объект
    draggedElement: {},

    //объект, над которым держат
    underDraggedElement: null,

    //корзина, из которой перетаскивают
    cart: '',

    //готовность записи поднятого элемента
    isReady: true,
};

export const componentReducer = (state = initialState, action) => {
    switch (action.type) {
        //получение данных
        case SET_STATE: {
            return { ...state, ingredients: action.data };
        }

        //добавление небулки
        case ADD_COMPONENT: {
            return {
                ...state,

                order: {
                    components: [...state.order.components, action.data],
                    buns: state.order.buns,
                },
                totalPrice: state.totalPrice + action.data.price,
            };
        }

        //добавление булки
        case ADD_BUN: {
            return {
                ...state,
                order: {
                    components: [...state.order.components],
                    buns: action.data,
                },
                totalPrice: state.totalPrice + 2 * action.data.price,
            };
        }

        //замена булки
        case CHANGE_BUN: {
            return {
                ...state,
                order: {
                    components: [...state.order.components],
                    buns: action.data,
                },
                totalPrice:
                    state.totalPrice +
                    2 * action.data.price -
                    2 * state.order.buns.price,
            };
        }

        //изменение статуса активности
        case SET_ACTIVE: {
            return {
                ...state,
                isActiv: action.value,
            };
        }

        //запись данных карточки
        case SET_DATA: {
            return {
                ...state,
                cardData: action.data,
            };
        }

        //запись данных ответа о заказе
        case SET_ORDER_DATA: {
            return {
                ...state,
                orderInfo: action.data,
            };
        }

        //очистка информации заказа для нового
        case CLEAR_INFO: {
            return {
                ...state,
                order: {
                    buns: null,
                    components: [],
                },
                ingredients: action.data,
                totalPrice: 0,
                orderInfo: null,
            };
        }

        //функция смены компонентов местами
        case CHANGE_SWAP: {
            return {
                ...state,
                isSwap: action.isSwap,
            };
        }

        //запись переносимого элемента
        case DRAG_ELEMENT: {
            return {
                ...state,
                draggedElement: action.data,
                cart: action.cartData,
                isReady: action.isReady,
            };
        }

        //функция смены компонентов местами
        case SWAP_COMPONENTS: {
            return {
                ...state,
                components: action.data,
                isReady: action.isReady,
            };
        }

        //удаление элементов
        case CHANGE_COMPONENTS: {
            return {
                ...state,
                order: {
                    ...state,
                    buns: state.order.buns,
                    components: [
                        ...state.order.components.slice(0, action.index),
                        ...state.order.components.slice(
                            action.index + 1,
                            action.length
                        ),
                    ],
                },
                totalPrice: state.totalPrice - action.element.price,

                underDraggedElement: null,
            };
        }

        //запись переносимого элемента
        case SET_ON_DRAG: {
            return {
                ...state,
                underDraggedElement: action.data,
            };
        }

        //иное
        default: {
            return state;
        }
    }
};

export const rootReducer = combineReducers({
    component: componentReducer,
});
