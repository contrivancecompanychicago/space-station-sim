// @flow

import type {AbilityType} from 'Game/Data/Object/Ability'

export type Objekt = {
  id: string,
  label: string,
  image: string,
  width: number,
  height: number,
  abilities: Array<AbilityType>
};
