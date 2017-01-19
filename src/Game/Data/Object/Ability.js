//@flow
const Abilities = {
  PREP_TABLE:  'PREP_TABLE',
  DINE_TABLE: 'DINE_TABLE',
  SERVE_TABLE: 'SERVE_TABLE',
  OVEN: 'OVEN',
  FRIDGE: 'FRIDGE',
  SPAWN: 'SPAWN',
}

export default Abilities;

export type AbilityType = 'PREP_TABLE'|'DINE_TABLE'|'SERVE_TABLE'|'OVEN'|'FRIDGE'|'SPAWN'
