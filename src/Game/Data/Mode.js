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
  'ITEM': {label: 'item'},
  'CHAR': {label: 'char'},
  'TASK': {label: 'task'},
  'OBJECT': {label: 'object'},
};

export default Modes;

export let Mode:{[id:ModeType]:ModeType} = {};
keys(Modes).forEach((key) => {Mode[key]=key;});
