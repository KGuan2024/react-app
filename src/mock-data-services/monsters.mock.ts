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
    subtype: "Hag",
    size: Size.medium,
  },
  {
    name: "Dusk Hag",
    category: "Fey",
    subcategory: "Humanoid",
    subtype: "Hag",
    size: Size.medium,
  },
  {
    name: "Swamp Hag",
    category: "Fey",
    subcategory: "Humanoid",
    subtype: "Hag",
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
