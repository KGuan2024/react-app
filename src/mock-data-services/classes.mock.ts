import { ArmorTypes } from "../constants/consts";

export const mockClassesData = [
  {
    id: "Barbarian",
    name: "Barbarian",
    description:
      "Powerful fighters who are prone to raging in the battlefield. Wields heavy axes and has a hearty constitution, making them hit hard while also being hard to take down. Aggressive, but usually lacking in braincells",

    proficiencies: [
      {
        name: "Armor",
        value: [ArmorTypes.light, ArmorTypes.medium, ArmorTypes.shields],
      },
    ],
  },
];
