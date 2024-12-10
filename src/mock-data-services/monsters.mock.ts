import { hasChildren } from "../reuseable-components/filters/filter-utils";
import {
  Filter,
  SelectedState,
} from "../reuseable-components/filters/FilterTree";

export enum Size {
  small = "Small",
  medium = "Medium",
  large = "Large",
  huge = "Huge",
}

export interface Monster {
  name: string;
  category: string;
  subcategory: string;
  subtype?: string;
  size: Size;
}

interface FlatMonsterFilters {
  category: string[];
  subcategory: string[];
  subtype: string[];
  size: string[];
}

export const mockMonstersData = [
  {
    name: "Dire Wolf",
    category: "Beast",
    subcategory: "Mammal",
    subtype: "Wolves",
    size: Size.medium,
  },
  {
    name: "Grey Wolf",
    category: "Beast",
    subcategory: "Mammal",
    subtype: "Wolves",
    size: Size.medium,
  },
  {
    name: "Brown Bear",
    category: "Beast",
    subcategory: "Mammal",
    subtype: "Bears",
    size: Size.medium,
  },
  {
    name: "Kenku",
    category: "Beast",
    subcategory: "Avian",
    size: Size.medium,
  },
  {
    name: "Roc",
    category: "Beast",
    subcategory: "Avian",
    size: Size.huge,
  },
  {
    name: "Air Elemental",
    category: "Elemental",
    subcategory: "Air",
    size: Size.medium,
  },
  {
    name: "Storm Giant",
    category: "Elemental",
    subcategory: "Air",
    size: Size.medium,
  },
  {
    name: "Fire Elemental",
    category: "Elemental",
    subcategory: "Fire",
    size: Size.medium,
  },
  {
    name: "Phoenix",
    category: "Elemental",
    subcategory: "Fire",
    size: Size.large,
  },
  {
    name: "Earth Elemental",
    category: "Elemental",
    subcategory: "Earth",
    size: Size.medium,
  },
  {
    name: "Golem",
    category: "Elemental",
    subcategory: "Earth",
    size: Size.large,
  },
  {
    name: "Water Elemental",
    category: "Elemental",
    subcategory: "Water",
    size: Size.medium,
  },
  {
    name: "Water Weird",
    category: "Elemental",
    subcategory: "Water",
    size: Size.large,
  },
  {
    name: "Sea Hag",
    category: "Fey",
    subcategory: "Humanoid",
    subtype: "Hags",
    size: Size.medium,
  },
  {
    name: "Dusk Hag",
    category: "Fey",
    subcategory: "Humanoid",
    subtype: "Hags",
    size: Size.medium,
  },
  {
    name: "Swamp Hag",
    category: "Fey",
    subcategory: "Humanoid",
    subtype: "Hags",
    size: Size.medium,
  },
  {
    name: "Dryad",
    category: "Fey",
    subcategory: "Humanoid",
    subtype: "Dryad",
    size: Size.medium,
  },
  {
    name: "Conclave Dryad",
    category: "Fey",
    subcategory: "Humanoid",
    subtype: "Dryad",
    size: Size.medium,
  },
  {
    name: "Deadbark Dryad",
    category: "Fey",
    subcategory: "Humanoid",
    subtype: "Dryad",
    size: Size.medium,
  },
  {
    name: "Dandylion",
    category: "Fey",
    subcategory: "Animal",
    size: Size.large,
  },
  {
    name: "Goose Mother",
    category: "Fey",
    subcategory: "Animal",
    size: Size.huge,
  },
];

// business logic that would belong in the backend (if we had one)

export function getFilteredMonsters(filters: Filter[]) {
  // in real life this would be an api but unfortunately we have to use this instead
  let flatFilters: FlatMonsterFilters = {
    category: [],
    subcategory: [],
    subtype: [],
    size: [],
  };
  filters.forEach((filter) => {
    // we aint applying the top level ones if those are selected/deselected
    setFlatFilterStructure(filter.children || [], flatFilters);
  });
  const filteredMonsters: Monster[] = filterMonsters(flatFilters, [
    ...mockMonstersData,
  ]);
  return filteredMonsters;
}

function filterMonsters(flatFilters: FlatMonsterFilters, monsters: Monster[]) {
  return monsters.filter((monster) => {
    const noCategoryFilters =
      !flatFilters.category.length &&
      !flatFilters.subcategory.length &&
      !flatFilters.subtype.length;
    const categoryMatch =
      noCategoryFilters || flatFilters.category.includes(monster.category);
    const subcategoryMatch =
      noCategoryFilters ||
      flatFilters.subcategory.includes(monster.subcategory);
    const subtypeMatch =
      noCategoryFilters ||
      (monster.subtype && flatFilters.subtype.includes(monster.subtype));

    const sizeMatch =
      !flatFilters.size.length || flatFilters.size.includes(monster.size);

    return (subcategoryMatch || subtypeMatch) && sizeMatch;
  });
}

function setFlatFilterStructure(
  filters: Filter[],
  flatFilters: FlatMonsterFilters
) {
  filters.forEach((filter) => {
    if (
      filter.selectedState === SelectedState.All ||
      (!hasChildren(filter) && filter.selectedState)
    ) {
      addFlatFilter(filter, flatFilters);
      setFlatFilterStructure(filter.children || [], flatFilters);
    } else if (
      filter.children &&
      (filter.selectedState as SelectedState) === SelectedState.Some
    ) {
      setFlatFilterStructure(filter.children, flatFilters);
    }
  });
}

function addFlatFilter(filter: Filter, flatFilters: FlatMonsterFilters) {
  switch (filter.type) {
    case "MonsterCategory":
      flatFilters.category.push(filter.key);
      break;
    case "MonsterSubcategory":
      flatFilters.subcategory.push(filter.key);
      break;
    case "Monster":
      flatFilters.subtype.push(filter.key);
      break;
    case "Size":
      flatFilters.size.push(filter.key);
      break;

    default:
  }
}
