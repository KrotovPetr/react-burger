//ответ от сервера по списку ингредиентов
export type TIngredientRequest = {
    success: boolean;
    data: TCard[];
};

export type TCard = {
    //тип под карточку ингредиента
    calories: number;
    name: string;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
};

export type TOrder = {
    //тип под ответ сервера
    createdAt: string;
    ingredients: TCard[];
    name: string;
    number: number;
    owner: {
        createdAt: string;
        name: string;
        email: string;
        updatedAt: string;
    };
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
};

//ответ от сервера на формирование заказа
export type TOrderResponse = {
    orders: TOrderIngredients[];
    success: boolean;
};

//тип под состав заказа
export type TOrderIngredients = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    owner: string;
    updatedAt: string;
    _id: string;
};

//тип под состав заказа
export type TOrderIngredientsNew = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    owner: string;
    updatedAt: string;
    _id: string;
    __v: number;
};

//тип для результатов запросов к серверу
export type TAutorization = {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        name: string;
    };
};

export type TListOfOrders = {
    success: boolean;
    orders: TOrderIngredients[];
    total: number;
    totalToday: number;
};

export type TData = {
    orders: TOrderIngredientsNew[];
    success: boolean;
};
