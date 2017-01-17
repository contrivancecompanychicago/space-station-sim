import keys from 'lodash.keys';

const Grid = {
  'BASIC': {label: 'Basic'},
  'FLOOR': {label: 'Floor', image:require('./Grid/plain.png')},
  'SHOP': {label: 'Shop', image:require('./Grid/plain.png'), tint:'red'},
  'BAR': {label: 'Shop', image:require('./Grid/plain.png'), tint:'green'},
  'WALL': {label: 'Wall', image:require('./Grid/wall.png')},
  'DOCK': {label: 'Dock', image:require('./Grid/dock.png')},
  'BRICKS': {label: 'Bricks', image:require('./Grid/bricks.png')},
  'ROAD': {label: 'Road', image:require('./Grid/road.png')},
  'ROAD_LINE': {label: 'Road1', image:require('./Grid/road_line.png')},
};

export default Grid;

export let Grids = {};
keys(Grid).forEach((key) => {Grids[key]=key;});
