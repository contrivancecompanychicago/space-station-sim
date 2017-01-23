//@flow
export type AbilityType = 'PREP_TABLE'|'DINE_TABLE'|'SERVE_TABLE'|'OVEN'|'FRIDGE'|'SPAWN'|'CHAIR'|'MAKE_COFFEE'

export type AbilityDataType = AbilityType


const Abilities = {
  PREP_TABLE:  'PREP_TABLE',
  DINE_TABLE: 'DINE_TABLE',
  SERVE_TABLE: 'SERVE_TABLE',
  OVEN: 'OVEN',
  FRIDGE: 'FRIDGE',
  SPAWN: 'SPAWN',
  CHAIR: 'CHAIR',
  MAKE_COFFEE: 'MAKE_COFFEE'
}

export default Abilities;

export const Ability:{[id:AbilityType]:AbilityType} = Abilities
