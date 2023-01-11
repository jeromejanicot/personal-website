import { useMemo, useEffect } from 'react';
import { paginateData } from './getPagination';
import { SlugItemType, Filters } from '../types/types';

export function checkboxClean() {
    let checkbox = document.getElementsByTagName('input');
    for (let elem of checkbox) {
        if (elem.type === 'checkbox') {
            elem.checked = false;
        }
    }
}

export function dateSorter(
    sourceArray: SlugItemType[],
    date: boolean,
): SlugItemType[] {
    if (date) {
        return [
            ...sourceArray.sort(
                (article1, article2) => article2.data.date - article1.data.date,
            ),
        ];
    } else {
        return [
            ...sourceArray.sort(
                (article1, article2) => article1.data.date - article2.data.date,
            ),
        ];
    }
}

export const useFilter = (
    allItems: SlugItemType[],
    date: boolean,
    filters: Filters[],
    perPage: number,
    setPageData: (arg: any) => void,
    setLength: (arg: number) => void,
) => {
    const memoFilterSorted = useMemo(
        () =>
            allItems.filter((project) =>
                filters.every((filter) => project.data.tags.includes(filter)),
            ),
        [allItems, filters],
    );

    const memoDateSorted = useMemo(
        () => dateSorter(memoFilterSorted, date),
        [memoFilterSorted, date],
    );

    const memoPages = useMemo(
        () => Math.ceil(memoFilterSorted.length / perPage),
        [memoFilterSorted, perPage],
    );

    useEffect(() => {
        window.addEventListener('beforeunload', checkboxClean);
        setPageData(paginateData(memoDateSorted, perPage));
        setLength(memoPages);
    }, [memoDateSorted, perPage, memoPages]);
};
