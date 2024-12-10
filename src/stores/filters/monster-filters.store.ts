import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Filter } from "../../reuseable-components/filters/FilterTree";
import {
  updateExpandedFilters,
  updateSelectedFilters,
} from "../../reuseable-components/filters/filter-utils";
import { Size } from "../../mock-data-services/monsters.mock";

const monstersMockFilters: Filter[] = [
  {
    key: "Monster Type",
    type: "MonsterType",
    children: [
      {
        key: "Beast",
        type: "MonsterCategory",
        children: [
          {
            key: "Mammal",
            type: "MonsterSubcategory",
            children: [
              {
                key: "Wolves",
                type: "Monster",
              },
            ],
          },
          {
            key: "Avian",
            type: "MonsterSubcategory",
            // children: [
            //   {
            //     key: "Roc",
            //     type: "Monster",
            //   },
            //   {
            //     key: "Kenku",
            //     type: "Monster",
            //   },
            // ],
          },
        ],
      },
      {
        key: "Elemental",
        type: "MonsterCategory",
        children: [
          {
            key: "Air",
            type: "MonsterSubcategory",
          },
          {
            key: "Fire",
            type: "MonsterSubcategory",
          },
          {
            key: "Water",
            type: "MonsterSubcategory",
          },
          {
            key: "Earth",
            type: "MonsterSubcategory",
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
                key: "Hags",
                type: "MonsterType",
              },
              {
                key: "Satyr",
                type: "Monster",
              },
              {
                key: "Dryad",
                type: "MonsterType",
              },
            ],
          },
          {
            key: "Animal",
            type: "MonsterSubcategory",
            // children: [
            //   {
            //     key: "Dandylion",
            //     type: "Monster",
            //   },
            //   {
            //     key: "Goose Mother",
            //     type: "Monster",
            //   },
            // ],
          },
        ],
      },
    ],
  },
  {
    key: "Size",
    type: "SizeCategory",
    children: [
      {
        key: Size.small,
        type: "Size",
      },
      {
        key: Size.medium,
        type: "Size",
      },
      {
        key: Size.large,
        type: "Size",
      },
      {
        key: Size.huge,
        type: "Size",
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
