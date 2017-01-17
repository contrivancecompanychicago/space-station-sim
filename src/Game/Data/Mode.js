
import keys from 'lodash.keys';

const Modes = {
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
export type ModesType = 'SELECT'
| 'GRID'
| 'ITEM'
| 'CHAR'
| 'TASK'
| 'OBJECT';
