import create from "zustand";
import { FilterType } from "../../types/types";

const useStore = create<FilterType>((set) => ({
  page: 0,
  perPage: 5,
  date: true,
  filters: [],
  addTags: (id) =>
    set((state) => ({
      filters: { ...state.filters, id },
    })),
  rmTags: (id) =>
    set((state) => ({
      filters: {
        ...state.filters.filter((tag) => (tag !== id ? tag : "")),
      },
    })),
  setDate: (input: boolean) =>
    set(() => ({
      date: input,
    })),
  setPage: (page: number) => set(() => ({ page: page })),
  increasePage: () => set((state) => ({ page: state.page + 1 })),
  decreasePage: () => set((state) => ({ page: state.page - 1 })),
  setPerPage: (perPage: number) => set(() => ({ perPage: perPage })),
}));

export { useStore };
