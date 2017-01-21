//@flow
import keys from 'lodash.keys';

export type ModeType = 'SELECT'
| 'GRID'
| 'ITEM'
| 'CHAR'
| 'TASK'
| 'OBJECT';

export type ModeDataType = {
  label:string
}

const Modes:{[id:ModeType]:ModeDataType} = {
  'SELECT': {label: 'select'},
  'GRID': {label: 'grid'},
  'OBJECT': {label: 'object'},
  'CHAR': {label: 'char'},
  'ITEM': {label: 'item'},
  // 'TASK': {label: 'task'},
};

export default Modes;

export let Mode:{[id:ModeType]:ModeType} = {};
keys(Modes).forEach((key) => {Mode[key]=key;});
