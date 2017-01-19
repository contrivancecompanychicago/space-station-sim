import keys from 'lodash.keys';

export type TaskType = 'BUILD'
export type TaskDataType = {
  label:string
}

const Task:{[id:TaskType]:TaskDataType} = {
  'BUILD': {label: 'build'},
};

export default Task;

export let Tasks = {};
keys(Task).forEach((key) => {Tasks[key]=key;});
