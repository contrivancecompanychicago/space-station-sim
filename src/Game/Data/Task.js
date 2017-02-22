// import {keys} from 'lodash';
import DataMap from 'Game/Data/Map'

export type TaskType = 'BUILD'|'PREP'|'COOK'|'SERVE'
export type TaskDataType = {
  label:string
}

const tasks:{[id:TaskType]:TaskDataType} = {
  'BUILD': {label: 'build'},
  'PREP': {label: 'prep'},
  'COOK': {label: 'cook'},
  'SERVE': {label: 'serve'},
};


let TaskMap:DataMap<TaskType, TaskDataType> = new DataMap();


export let Tasks:{[id:TaskType]:TaskType} = {};
Object.keys(tasks).forEach((key) => {
  Tasks[key]=key;
  TaskMap.put(key, Tasks[key])
});


export default TaskMap;