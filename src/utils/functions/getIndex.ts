import { TCard } from '../types/types';

export const getIndex = (array: TCard[], url: string): number => {
    let index: number = -1;

    for (let i: number = 0; i < array.length; i++) {
        // console.log(info[i]['_id']);
        if (array[i]['_id'] === url.split('/')[2]) {
            index = i;
            break;
        }
    }

    return index;
};
