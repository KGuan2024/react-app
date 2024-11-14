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
      break;
    case Stats.Con:
      return conIcon;
      break;
    case Stats.Dex:
      return dexIcon;
      break;
    case Stats.Int:
      return intIcon;
      break;
    case Stats.Wisdom:
      return wisdomIcon;
      break;
    case Stats.Charisma:
      return charismaIcon;
      break;
    default:
  }
}

export function getDiceIcons(dice: Dice) {
  switch (dice) {
    case Dice.D4:
      return d4Icon;
      break;
    case Dice.D6:
      return d6Icon;
      break;
    case Dice.D8:
      return d8Icon;
      break;
    case Dice.D10:
      return d10Icon;
      break;
    case Dice.D12:
      return d12Icon;
      break;
    case Dice.D20:
      return d20Icon;
      break;
    default:
  }
}
