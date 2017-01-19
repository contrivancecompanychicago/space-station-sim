
import keys from 'lodash.keys';

const Modes:{[id:ModeType]:ModeDataType} = {
  'SELECT': {label: 'select'},
  'GRID': {label: 'grid'},
  'ITEM': {label: 'item'},
  'CHAR': {label: 'char'},
  'TASK': {label: 'task'},
  'OBJECT': {label: 'object'},
};

export default Modes;

export let Mode = {};
keys(Modes).forEach((key) => {Mode[key]=key;});

// export type ModesType = $Keys<typeof Mode>
export type ModeType = 'SELECT'
| 'GRID'
| 'ITEM'
| 'CHAR'
| 'TASK'
| 'OBJECT';

export type ModeDataType = {
  label:string
}


export type ModesType = {
  SELECT:Object,
  GRID:Object,
  ITEM:Object,
  CHAR:Object,
  TASK:Object,
  OBJECT:Object,
}
