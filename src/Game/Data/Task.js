import keys from 'lodash.keys';

const Task = {
  'BUILD': {label: 'build'},
};

export default Task;

export let Tasks = {};
keys(Task).forEach((key) => {Tasks[key]=key;});
