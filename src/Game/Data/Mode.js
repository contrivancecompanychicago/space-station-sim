
import keys from 'lodash.keys';

const Mode = {
  'SELECT': {label: 'select'},
  'GRID': {label: 'grid'},
  'ITEM': {label: 'item'},
  'CHAR': {label: 'char'},
  'TASK': {label: 'task'},
  'OBJECT': {label: 'object'},
};

export default Mode;

export let Modes = {};
keys(Mode).forEach((key) => {Modes[key]=key;});

// export type ModesType = $Keys<typeof Mode>
export type ModesType = 'SELECT'
| 'GRID'
| 'ITEM'
| 'CHAR'
| 'TASK'
| 'OBJECT';
