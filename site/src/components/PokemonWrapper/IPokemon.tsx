import { IAbility } from "./IAbility";

export interface IPokemon {
  name?: string;
  img: string;
  abilities: IAbility[];
  totalHealth: number;
  currentHealth: number;
  dead: boolean;
  attacked: boolean;
}
