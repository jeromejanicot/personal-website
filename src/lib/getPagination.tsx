import { SlugItemType } from '../types/types';

export function paginateData(data: SlugItemType[], perPage: number): any[][] {
    const sourceLength = data.length;
    const arraysAmount = Math.ceil(data.length / perPage);
    const paginatedArray = Array(arraysAmount);
    for (let j = 0; j < arraysAmount; j++) {
        paginatedArray[j] = [];
    }

    let arrayIndex = 0;
    for (let i = 0; i < sourceLength; i += perPage) {
        paginatedArray[arrayIndex] = data.slice(i, i + perPage);
        arrayIndex++;
    }
    return paginatedArray;
}
