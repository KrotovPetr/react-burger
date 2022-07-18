import { componentReducer } from './components';
import * as types from '../../actions/componentAction/components';
import { requestsReducer } from '../requestsReducer/requestsReducer';

describe('component reducer', () => {
    it('should return the initial state', () => {
        expect(componentReducer(undefined, {})).toEqual({
            //список всех ингредиентов
            ingredients: [],

            //итоговая цена заказа
            totalPrice: 0,

            //заказ
            order: {
                buns: null,
                components: [],
            },

            //состояние модального окна
            isActiv: false,

            //состояние модального окна заказа
            isOrderActiv: false,

            //данные карточки ингредиента
            cardData: null,

            //хранение информации заказа
            orderInfo: null,

            //перетаскиваемый объект
            draggedElement: null,

            //объект, над которым держат
            underDraggedElement: null,

            //корзина, из которой перетаскивают
            cart: '',

            //готовность записи поднятого элемента
            isReady: true,

            //отправка запроса
            isIngredientSend: false,

            //успех запроса
            isIngredientSuccess: false,

            //ошибка в запросе
            isIngredientError: false,
        });
    });

    it('should set ingredient menu', () => {
        expect(
            componentReducer(
                { ingredients: [] },
                {
                    type: types.SET_STATE,
                    data: {
                        _id: '60666c42cc7b410027a1a9b1',
                        name: 'Краторная булка N-200i',
                        type: 'bun',
                        proteins: 80,
                        fat: 24,
                        carbohydrates: 53,
                        calories: 420,
                        price: 1255,
                        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-02-large.png',
                        __v: 0,
                    },
                }
            )
        ).toEqual({
            ingredients: {
                _id: '60666c42cc7b410027a1a9b1',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0,
            },
        });
    });

    it('should return ingredients request success', () => {
        expect(
            componentReducer(
                {
                    ingredients: [],
                    isIngredientSend: true,
                    isIngredientError: false,
                    isIngredientSuccess: false,
                },
                {
                    type: types.GET_INGREDIENTS_URL_SUCCESS,
                    data: {
                        _id: '60666c42cc7b410027a1a9b1',
                        name: 'Краторная булка N-200i',
                        type: 'bun',
                        proteins: 80,
                        fat: 24,
                        carbohydrates: 53,
                        calories: 420,
                        price: 1255,
                        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-02-large.png',
                        __v: 0,
                    },
                }
            )
        ).toEqual({
            ingredients: {
                _id: '60666c42cc7b410027a1a9b1',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0,
            },
            isIngredientSend: false,
            isIngredientError: false,
            isIngredientSuccess: true,
        });
    });
    it('should return ingredients request request', () => {
        expect(
            componentReducer(
                {
                    isIngredientSend: false,
                    isIngredientError: false,
                    isIngredientSuccess: false,
                },
                { type: types.GET_INGREDIENTS_URL_REQUEST }
            )
        ).toEqual({
            isIngredientSend: true,
            isIngredientError: false,
            isIngredientSuccess: false,
        });
    });

    it('should return ingredients request error', () => {
        expect(
            componentReducer(
                {
                    isIngredientSend: true,
                    isIngredientError: false,
                    isIngredientSuccess: false,
                },
                {
                    type: types.GET_INGREDIENTS_URL_ERROR,
                }
            )
        ).toEqual({
            isIngredientSend: false,
            isIngredientError: true,
            isIngredientSuccess: false,
        });
    });
    it('should set underDragged element', () => {
        expect(
            componentReducer(
                {
                    underDraggedElement: undefined,
                },
                {
                    type: types.SET_ON_DRAG,
                    data: {
                        _id: '60666c42cc7b410027a1a9b1',
                        name: 'Краторная булка N-200i',
                        type: 'bun',
                        proteins: 80,
                        fat: 24,
                        carbohydrates: 53,
                        calories: 420,
                        price: 1255,
                        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-02-large.png',
                        __v: 0,
                    },
                }
            )
        ).toEqual({
            underDraggedElement: {
                _id: '60666c42cc7b410027a1a9b1',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0,
            },
        });
    });

    it('should set info about orders to cart', () => {
        expect(
            componentReducer(
                {
                    orderInfo: null,
                },
                {
                    type: types.SET_ORDER_INFO,
                    data: {
                        _id: '60666c42cc7b410027a1a9b1',
                        name: 'Краторная булка N-200i',
                        type: 'bun',
                        proteins: 80,
                        fat: 24,
                        carbohydrates: 53,
                        calories: 420,
                        price: 1255,
                        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-02-large.png',
                        __v: 0,
                    },
                }
            )
        ).toEqual({
            orderInfo: {
                _id: '60666c42cc7b410027a1a9b1',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0,
            },
        });
    });
    it('should clear all info about order', () => {
        expect(
            componentReducer(
                {
                    order: {
                        buns: {
                            _id: '60666c42cc7b410027a1a9b1',
                            name: 'Краторная булка N-200i',
                            type: 'bun',
                            proteins: 80,
                            fat: 24,
                            carbohydrates: 53,
                            calories: 420,
                            price: 1255,
                            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                            image_mobile:
                                'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                            image_large:
                                'https://code.s3.yandex.net/react/code/bun-02-large.png',
                            __v: 0,
                        },
                        components: [
                            {
                                _id: '60666c42cc7b410027a1a9b1',
                                name: 'Краторная булка N-200i',
                                type: 'bun',
                                proteins: 80,
                                fat: 24,
                                carbohydrates: 53,
                                calories: 420,
                                price: 1255,
                                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                                image_mobile:
                                    'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                                image_large:
                                    'https://code.s3.yandex.net/react/code/bun-02-large.png',
                                __v: 0,
                            },
                        ],
                    },
                    ingredients: {
                        _id: '60666c42cc7b410027a1a9b1',
                        name: 'Краторная булка N-200i',
                        type: 'bun',
                        proteins: 80,
                        fat: 24,
                        carbohydrates: 53,
                        calories: 420,
                        price: 1255,
                        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-02-large.png',
                        __v: 1,
                    },
                    totalPrice: 1110,
                    orderInfo: {
                        _id: '60666c42cc7b410027a1a9b1',
                        name: 'Краторная булка N-200i',
                        type: 'bun',
                        proteins: 80,
                        fat: 24,
                        carbohydrates: 53,
                        calories: 420,
                        price: 1255,
                        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-02-large.png',
                        __v: 0,
                    },
                },
                {
                    type: types.CLEAR_INFO,
                    data: {
                        _id: '60666c42cc7b410027a1a9b1',
                        name: 'Краторная булка N-200i',
                        type: 'bun',
                        proteins: 80,
                        fat: 24,
                        carbohydrates: 53,
                        calories: 420,
                        price: 1255,
                        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-02-large.png',
                        __v: 0,
                    },
                }
            )
        ).toEqual({
            orderInfo: null,
            order: { buns: null, components: [] },
            totalPrice: 0,
            ingredients: {
                _id: '60666c42cc7b410027a1a9b1',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0,
            },
        });
    });
    it('should set info about ingredient', () => {
        expect(
            componentReducer(
                {
                    cardData: null,
                },
                {
                    type: types.SET_DATA,
                    data: {
                        _id: '60666c42cc7b410027a1a9b1',
                        name: 'Краторная булка N-200i',
                        type: 'bun',
                        proteins: 80,
                        fat: 24,
                        carbohydrates: 53,
                        calories: 420,
                        price: 1255,
                        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-02-large.png',
                        __v: 0,
                    },
                }
            )
        ).toEqual({
            cardData: {
                _id: '60666c42cc7b410027a1a9b1',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large:
                    'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0,
            },
        });
    });
    it('should set element card activity', () => {
        expect(
            componentReducer(
                {
                    isActiv: false,
                },
                {
                    type: types.SET_ACTIVE,
                    value: true,
                }
            )
        ).toEqual({
            isActiv: true,
        });
    });
    it('should set order modal activity', () => {
        expect(
            componentReducer(
                {
                    isOrderActiv: false,
                },
                {
                    type: types.SET_ORDER_ACTIVE,
                    data: true,
                }
            )
        ).toEqual({
            isOrderActiv: true,
        });
    });
    it('should add bun to cart and calculate price of order', () => {
        expect(
            componentReducer(
                {
                    order: {
                        components: [],
                        buns: null,
                    },
                    totalPrice: 0,
                },
                {
                    type: types.ADD_BUN,
                    data: {
                        _id: '60666c42cc7b410027a1a9b1',
                        name: 'Краторная булка N-200i',
                        type: 'bun',
                        proteins: 80,
                        fat: 24,
                        carbohydrates: 53,
                        calories: 420,
                        price: 1255,
                        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-02-large.png',
                        __v: 0,
                    },
                }
            )
        ).toEqual({
            order: {
                components: [],
                buns: {
                    _id: '60666c42cc7b410027a1a9b1',
                    name: 'Краторная булка N-200i',
                    type: 'bun',
                    proteins: 80,
                    fat: 24,
                    carbohydrates: 53,
                    calories: 420,
                    price: 1255,
                    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                    image_mobile:
                        'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                    image_large:
                        'https://code.s3.yandex.net/react/code/bun-02-large.png',
                    __v: 0,
                },
            },
            totalPrice: 2510,
        });
    });
    it('should change bun and price', () => {
        expect(
            componentReducer(
                {
                    order: {
                        components: [],
                        buns: {
                            _id: '60666c42cc7b410027a1a9b1',
                            name: 'Краторная булка N-200i',
                            type: 'bun',
                            proteins: 80,
                            fat: 24,
                            carbohydrates: 53,
                            calories: 420,
                            price: 1255,
                            image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                            image_mobile:
                                'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                            image_large:
                                'https://code.s3.yandex.net/react/code/bun-02-large.png',
                            __v: 0,
                        },
                    },
                    totalPrice: 2510,
                },
                {
                    type: types.CHANGE_BUN,
                    data: {
                        _id: '60666c42cc7b410027a1a9b2',
                        name: 'Флюоресцентная булка R2-D3',
                        type: 'bun',
                        proteins: 44,
                        fat: 26,
                        carbohydrates: 85,
                        calories: 643,
                        price: 988,
                        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-01-large.png',
                        __v: 0,
                    },
                }
            )
        ).toEqual({
            order: {
                components: [],
                buns: {
                    _id: '60666c42cc7b410027a1a9b2',
                    name: 'Флюоресцентная булка R2-D3',
                    type: 'bun',
                    proteins: 44,
                    fat: 26,
                    carbohydrates: 85,
                    calories: 643,
                    price: 988,
                    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                    image_mobile:
                        'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                    image_large:
                        'https://code.s3.yandex.net/react/code/bun-01-large.png',
                    __v: 0,
                },
            },
            totalPrice: 1976,
        });
    });

    it('should add components to order', () => {
        expect(
            componentReducer(
                {
                    order: {
                        components: [],
                        buns: null,
                    },
                    totalPrice: 0,
                },
                {
                    type: types.ADD_COMPONENT,
                    data: {
                        _id: '60666c42cc7b410027a1a9b2',
                        name: 'Флюоресцентная булка R2-D3',
                        type: 'bun',
                        proteins: 44,
                        fat: 26,
                        carbohydrates: 85,
                        calories: 643,
                        price: 988,
                        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-01-large.png',
                        __v: 0,
                    },
                }
            )
        ).toEqual({
            order: {
                components: [
                    {
                        _id: '60666c42cc7b410027a1a9b2',
                        name: 'Флюоресцентная булка R2-D3',
                        type: 'bun',
                        proteins: 44,
                        fat: 26,
                        carbohydrates: 85,
                        calories: 643,
                        price: 988,
                        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                        image_mobile:
                            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                        image_large:
                            'https://code.s3.yandex.net/react/code/bun-01-large.png',
                        __v: 0,
                    },
                ],
                buns: null,
            },
            totalPrice: 988,
        });
    });

    it('should add info about dragged element', () => {
        expect(
            componentReducer(
                {
                    draggedElement: null,
                    cart: '',
                    isReady: true,
                },
                {
                    type: types.DRAG_ELEMENT,
                    data: 'random element',
                    cartData: 'random cart',
                    isReady: false,
                }
            )
        ).toEqual({
            draggedElement: 'random element',
            cart: 'random cart',
            isReady: false,
        });
    });
    // it('should change components in order', () => {
    //     expect(
    //         componentReducer(
    //             {
    //                 order: {
    //                     components: [
    //                         {
    //                             _id: '60666c42cc7b410027a1a9b2',
    //                             name: 'Флюоресцентная булка R2-D3',
    //                             type: 'bun',
    //                             proteins: 44,
    //                             fat: 26,
    //                             carbohydrates: 85,
    //                             calories: 643,
    //                             price: 988,
    //                             image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    //                             image_mobile:
    //                                 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    //                             image_large:
    //                                 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    //                             __v: 0,
    //                         },
    //                     ],
    //                     buns: null,
    //                 },
    //                 totalPrice: 988,
    //             },
    //             {
    //                 type: types.CHANGE_COMPONENTS,
    //                 element: {
    //                     _id: '60666c42cc7b410027a1a9b2',
    //                     name: 'Флюоресцентная булка R2-D3',
    //                     type: 'bun',
    //                     proteins: 44,
    //                     fat: 26,
    //                     carbohydrates: 85,
    //                     calories: 643,
    //                     price: 988,
    //                     image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    //                     image_mobile:
    //                         'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    //                     image_large:
    //                         'https://code.s3.yandex.net/react/code/bun-01-large.png',
    //                     __v: 0,
    //                 },
    //                 index: 0,
    //                 length: 1,
    //             }
    //         )
    //     ).toEqual({
    //         order: {
    //             components: [],
    //             buns: null,
    //         },
    //         totalPrice: 0,
    //     });
    // });
    // it('should swap components in order', () => {
    //     expect(
    //         componentReducer(
    //             {
    //                 order: {
    //                     buns: 'buns',
    //                     components: 'sauces',
    //                 },
    //                 isReady: 'is order ready',
    //             },
    //             {
    //                 type: types.SWAP_COMPONENTS,
    //                 isReady: true,
    //                 data: 'another order of components',
    //             }
    //         )
    //     ).toEqual({
    //         order: {
    //             buns: 'buns',
    //             components: 'another order of components',
    //         },
    //         isReady: true,
    //     });
    // });
});

//  DRAG_ELEMENT,
