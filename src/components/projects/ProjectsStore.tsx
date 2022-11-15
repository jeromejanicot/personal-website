import create from "zustand";
import { FilterType } from "../../types/types";

const useStore = create<FilterType>((set) => ({
  page: 0,
  perPage: 5,
  date: true,
  web: false,
  engineering: false,
  design: false,
  setTags: (id: keyof FilterType ) =>
    set((state) => ({
      [id]: !state[id],
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
