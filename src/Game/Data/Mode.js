//@flow
import keys from 'lodash.keys';

export type ModeType = 'SELECT'
| 'GRID'
| 'ITEM'
| 'CHAR'
| 'TASK'
| 'PANEL'
| 'OBJECT';

export type ModeDataType = {
  label:string
}

const Modes:{[id:ModeType]:ModeDataType} = {
  'SELECT': {label: 'select', image: require('./Mode/cursor-512.png')},
  'GRID': {label: 'grid', image: require('./Mode/grid.png')},
  'OBJECT': {label: 'object', image: require('./Mode/object.png')},
  'CHAR': {label: 'char', image: require('./Character/char1.png')},
  'PANEL': {label: 'panels', image: require('./Object/test.png')},
  'ITEM': {label: 'item'},
  // 'TASK': {label: 'task'},
};

export default Modes;

export let Mode:{[id:ModeType]:ModeType} = {};
keys(Modes).forEach((key) => {Mode[key]=key;});
