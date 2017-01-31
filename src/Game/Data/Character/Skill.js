//@flow

export type Skill = 'EXPERIENCE'
  | 'COOKING'
  | 'SERVING'
  | 'MANAGEMENT'
  | 'INTELLIGENCE'
  | 'TRUST'
  | 'HEALTH'
  | 'MOTIVATION'

// export type SkillData = {
//   EXPERIENCE: number,
//   COOKING: number,
//   SERVING: number,
//   MANAGEMENT: number,
//   INTELLIGENCE: number,
//   TRUST: number,
//   HEALTH: number,
//   MOTIVATION: number,
// }

export type SkillData = {
  label: string,
}

const skills:{[id:Skill]: SkillData} = {
  'EXPERIENCE': { label: 'experience'},
  'COOKING': { label: 'cooking'},
  'SERVING': { label: 'serving'},
  'MANAGEMENT': { label: 'management'},
  'INTELLIGENCE': { label: 'intelligence'},
  'TRUST': { label: 'trust'},
  'HEALTH': { label: 'health'},
  'MOTIVATION': { label: 'motivation'},
}

export default skills
