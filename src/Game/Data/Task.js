// @flow
import {keys} from 'lodash';
import DataMap from 'Game/Data/Map'

export type TaskType = 'BUILD'
  |'GREET'
  |'TAKEORDER'
  |'MAKEDRINK'
  |'MAKE'
  |'PREP'
  |'COOK'
  |'SERVEFOOD'
export type TaskDataType = {
  label:string
}

const tasks:{[id:TaskType]:TaskDataType} = {
  // 'BUILD': {label: 'build'},
  'MAKE': {label: 'make food'},
  'COOK': {label: 'cook'},
  'PREP': {label: 'prep food'},
  'SERVEFOOD': {label: 'serve food'},
  'MAKEDRINK': {label: 'make drink'},
  'TAKEORDER': {label: 'take orders'},
  'GREET': {label: 'greet and seat'}
};


let TaskMap:DataMap<TaskType, TaskDataType> = new DataMap();


export let Tasks:{[id:TaskType]:TaskType} = {
  MAKE:'MAKE',
  COOK:'COOK',
  PREP:'PREP',
  SERVEFOOD:'SERVEFOOD',
  MAKEDRINK:'MAKEDRINK',
  TAKEORDER:'TAKEORDER',
  GREET:'GREET',
};
keys(tasks).forEach((key:TaskType) => {
  // Tasks[key]=key;
  TaskMap.put(key, tasks[key])
});


export default TaskMap;