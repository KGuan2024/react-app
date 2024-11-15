import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Filter } from "../../reuseable-components/filters/FilterTree";
import {
  updateExpandedFilters,
  updateSelectedFilters,
} from "../../reuseable-components/filters/filter-utils";

const monstersMockFilters: Filter[] = [
  {
    key: "Beast",
    type: "MonsterCategory",
    children: [
      {
        key: "Mammal",
        type: "MonsterSubcategory",
        children: [
          {
            key: "Dire Wolf",
            type: "Monster",
          },
        ],
      },
      {
        key: "Avian",
        type: "MonsterSubcategory",
        children: [
          {
            key: "Roc",
            type: "Monster",
          },
          {
            key: "Kenku",
            type: "Monster",
          },
        ],
      },
    ],
  },
  {
    key: "Elemental",
    type: "MonsterCategory",
    children: [
      {
        key: "Air Elemental",
        type: "Monster",
      },
      {
        key: "Fire Elemental",
        type: "Monster",
      },
      {
        key: "Water Elemental",
        type: "Monster",
      },
      {
        key: "Earth Elemental",
        type: "Monster",
      },
    ],
  },
  {
    key: "Fey",
    type: "MonsterCategory",
    children: [
      {
        key: "Humanoid",
        type: "MonsterSubcategory",
        children: [
          {
            key: "Hag",
            type: "Monster",
          },
          {
            key: "Satyr",
            type: "Monster",
          },
          {
            key: "Dryad",
            type: "Monster",
          },
        ],
      },
      {
        key: "Animal",
        type: "MonsterSubcategory",
        children: [
          {
            key: "Dandylion",
            type: "Monster",
          },
          {
            key: "Goose Mother",
            type: "Monster",
          },
        ],
      },
      {
        key: "Fungi & Plant",
        type: "MonsterSubcategory",
        children: [
          {
            key: "Blubbering shroom",
            type: "Monster",
          },
        ],
      },
    ],
  },
];

interface FiltersState {
  filters: Filter[];
  reset: () => void;
  updateSelectedFilters: (index: number, parentIndex: number[]) => void;
  updateExpandedFilters: (index: number, indexPath: number[]) => void;
}
export const useMonstersFilterStore = create<FiltersState>()(
  immer((set) => ({
    filters: monstersMockFilters,
    updateSelectedFilters: (index, parentIndexPath) =>
      set((state) => {
        updateSelectedFilters(state.filters, index, parentIndexPath);
      }),
    updateExpandedFilters: (index, parentIndexPath) =>
      set((state) => {
        updateExpandedFilters(state.filters, index, parentIndexPath);
      }),
    reset: () => set({ filters: monstersMockFilters }),
  }))
);
