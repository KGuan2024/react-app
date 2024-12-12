import { ArmorTypes, Stats, WeaponTypes } from "../constants/consts";

export interface Proficiency {
  name: string;
  values: string[];
}
export interface ClassSkills {
  name: string;
  description: string;
  level: number;
}
export interface ClassDetail {
  id: string;
  name: string;
  description: string;
  image?: string;
  proficiencies: Proficiency[];
  classSkills: ClassSkills[];
}
export const mockClassesData: ClassDetail[] = [
  {
    id: "Barbarian",
    name: "Barbarian",
    description:
      "Powerful fighters who are prone to raging in the battlefield. Wields heavy axes and has a hearty constitution, making them hit hard while also being hard to take down. Aggressive, but usually lacking in braincells",

    proficiencies: [
      {
        name: "Armor",
        values: [ArmorTypes.light, ArmorTypes.medium, ArmorTypes.shields],
      },
      {
        name: "Weapons",
        values: [WeaponTypes.simple, WeaponTypes.martial],
      },
      {
        name: "savingThrows",
        values: [Stats.Strength, Stats.Con],
      },
    ],
    image: "barbarian.jpg",
    classSkills: [
      {
        name: "Rage",
        description: "Become angy and do more damage while taking less too",
        level: 1,
      },
      {
        name: "Unarmored Defense",
        description:
          "Still defensive while wearing no armor. Somehow this works",
        level: 1,
      },
      {
        name: "Danger Sense",
        description:
          "If you can see something you can dodge it, even if you have the dexterity of a sloth",
        level: 2,
      },
      {
        name: "Reckless attack",
        description: "More damage to me but also more damage to you :3",
        level: 2,
      },
      {
        name: "Extra attack",
        description: "Hit you once. Hit you again",
        level: 5,
      },
      { name: "Fast movement", description: "Gotta go fast", level: 5 },
      {
        name: "Brutal Critical",
        description: "Crits hit extra hard",
        level: 9,
      },
      { name: "Relentless Rage", description: "Death? Whats that?", level: 9 },
      {
        name: "Persistent Rage",
        description: "Stay angry until you lose consciousness",
        level: 15,
      },
      {
        name: "Indomitable Might",
        description: "Take my strong hand",
        level: 18,
      },
      {
        name: "Primal Champion",
        description: "Extra strong and extra beefy",
        level: 20,
      },
    ],
  },

  {
    id: "Rogue",
    name: "Rogue",
    description:
      "Resourceful and stealthy, rogues may be physically weak but that doesn't stop them from stabbing you in the back. Or at the very least stealing anything that isn't nailed down",

    proficiencies: [
      {
        name: "Armor",
        values: [ArmorTypes.light],
      },
      {
        name: "Weapons",
        values: [
          WeaponTypes.simple,
          WeaponTypes.crossbows,
          WeaponTypes.longswords,
          WeaponTypes.rapiers,
          WeaponTypes.shortswords,
        ],
      },
      {
        name: "savingThrows",
        values: [Stats.Dex, Stats.Int],
      },
    ],
    image: "rogue.jpg",
    classSkills: [
      {
        name: "Expertise",
        description: "You are extra good at things",
        level: 1,
      },
      {
        name: "Sneak Attack",
        description: "Sneak in a bit of extra damage each round",
        level: 1,
      },
      {
        name: "Thieves cant",
        description: "Special code just for you (and other thieves)",
        level: 1,
      },
      {
        name: "Cunning Action",
        description:
          "Fight like a coward by becoming better at running away and hiding",
        level: 2,
      },
      {
        name: "Uncanny Dodge",
        description: "Nah that totally didn't hit me",
        level: 5,
      },
      {
        name: "Evasion",
        description: "Damage? Never heard of it",
        level: 7,
      },
      {
        name: "Reliable Talent",
        description: "You're good at everything",
        level: 11,
      },
      {
        name: "Blindsense",
        description: "You can see the unseeable",
        level: 14,
      },
      {
        name: "Slippery Mind",
        description: "Galaxy brain achieved",
        level: 15,
      },
      {
        name: "Elusive",
        description: "Never have the lower hand in battle",
        level: 18,
      },
      {
        name: "Stroke of Luck",
        description: "Never miss an attack",
        level: 20,
      },
    ],
  },
  {
    id: "Bard",
    name: "Bard",
    description: "Flute go brrr",

    proficiencies: [
      {
        name: "Armor",
        values: [ArmorTypes.light],
      },
      {
        name: "Weapons",
        values: [
          WeaponTypes.simple,
          WeaponTypes.crossbows,
          WeaponTypes.longswords,
          WeaponTypes.rapiers,
          WeaponTypes.shortswords,
        ],
      },
      {
        name: "savingThrows",
        values: [Stats.Dex, Stats.Charisma],
      },
    ],
    image: "bard.jpg",
    classSkills: [
      {
        name: "Bardic Inspiration",
        description: "Inspire your allies via a pep talk or some sick tunes",
        level: 1,
      },
      {
        name: "Jack of All Trades",
        description: "Become slightly better at everything",
        level: 1,
      },
      {
        name: "Song of Rest",
        description:
          "Allies heal more during resting thanks to your amsr background music",
        level: 1,
      },
      {
        name: "Expertise",
        description: "You are extra good at things",
        level: 2,
      },
      {
        name: "Font of Inspiration",
        description: "After resting you can inspire your allies once more",
        level: 5,
      },
      {
        name: "Countercharm",
        description: `"Anyway, here's wonderwall." Start a musical performance to protect your party from mind influencing effects`,
        level: 6,
      },
      {
        name: "Magical Secrets",
        description: "Gain some nifty new spells. And again at level 14 and 18",
        level: 10,
      },
      {
        name: "Superior Inspiration",
        description: "Restock your inspiration if you start battle without any",
        level: 20,
      },
    ],
  },
];

export function getClassDetails(id: string) {
  return mockClassesData.find((classData) => classData.id === id);
}
