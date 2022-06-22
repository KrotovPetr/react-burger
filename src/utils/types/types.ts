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
