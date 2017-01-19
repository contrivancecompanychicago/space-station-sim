//@flow
const Abilities = {
  PREP_TABLE:  'PREP_TABLE',
  DINE_TABLE: 'DINE_TABLE',
  SERVE_TABLE: 'SERVE_TABLE',
  OVEN: 'OVEN',
  FRIDGE: 'FRIDGE',
  SPAWN: 'SPAWN',
  CHAIR: 'CHAIR'
}

export default Abilities;

export const Ability = Abilities

export type AbilityType = 'PREP_TABLE'|'DINE_TABLE'|'SERVE_TABLE'|'OVEN'|'FRIDGE'|'SPAWN'|'CHAIR'
