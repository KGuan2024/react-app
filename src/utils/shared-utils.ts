import { ReactComponent as strengthIcon } from "../assets/icons/hand-back-fist.svg";
import { ReactComponent as conIcon } from "../assets/icons/heart-pulse.svg";
import { ReactComponent as dexIcon } from "../assets/icons/bullseye.svg";
import { ReactComponent as intIcon } from "../assets/icons/book-open.svg";
import { ReactComponent as wisdomIcon } from "../assets/icons/eye.svg";
import { ReactComponent as charismaIcon } from "../assets/icons/masks-theater.svg";

import { ReactComponent as d4Icon } from "../assets/icons/dice-d4.svg";
import { ReactComponent as d6Icon } from "../assets/icons/dice-d6.svg";
import { ReactComponent as d8Icon } from "../assets/icons/dice-d8.svg";
import { ReactComponent as d10Icon } from "../assets/icons/dice-d10.svg";
import { ReactComponent as d12Icon } from "../assets/icons/dice-d12.svg";
import { ReactComponent as d20Icon } from "../assets/icons/dice-d20.svg";
import { Dice, Stats } from "../constants/consts";

export function getStatsIcons(stat: Stats) {
  switch (stat) {
    case Stats.Strength:
      return strengthIcon;
    case Stats.Con:
      return conIcon;
    case Stats.Dex:
      return dexIcon;
    case Stats.Int:
      return intIcon;
    case Stats.Wisdom:
      return wisdomIcon;
    case Stats.Charisma:
      return charismaIcon;
    default:
  }
}

export function getDiceIcons(dice: Dice) {
  switch (dice) {
    case Dice.D4:
      return d4Icon;
    case Dice.D6:
      return d6Icon;
    case Dice.D8:
      return d8Icon;
    case Dice.D10:
      return d10Icon;
    case Dice.D12:
      return d12Icon;
    case Dice.D20:
      return d20Icon;
    default:
  }
}
