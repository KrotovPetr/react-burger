import { TCard } from '../types/types';

export const getOrderPrice = (
    element: string[],
    ingredients: TCard[]
): number => {
    let price: number = 0;
    // console.log(element);
    // console.log(1 + ' ' + element);
    for (let j = 0; j < element.length; j++) {
        for (let i = 0; i < ingredients.length; i++) {
            if (element[j] === ingredients[i]['_id']) {
                price += ingredients[i].price;
                break;
            }
        }
    }

    return price;
};
