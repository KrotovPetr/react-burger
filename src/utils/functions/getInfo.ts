import { TCard } from '../types/types';

export const getInfo = (id: string, ingredients: TCard[]): number => {
    // console.log('id ' + id);
    // console.log('ingr ' + ingredients);

    let index: number = -1;
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i]['_id'] === id) {
            index = i;
        }
    }
    // console.log(index);
    return index;
};
