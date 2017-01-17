import keys from 'lodash.keys';

const Grid = {
  'BASIC': {label: 'Basic', weight:1},
  'FLOOR': {label: 'Floor', weight:1, image:require('./Grid/plain.png')},
  'SHOP': {label: 'Shop', weight:2, image:require('./Grid/plain.png'), tint:'red'},
  'BAR': {label: 'Shop', weight:1, image:require('./Grid/plain.png'), tint:'green'},
  'WALL': {label: 'Wall', weight:0, image:require('./Grid/wall.png')},
  'DOCK': {label: 'Dock', weight:1, image:require('./Grid/dock.png')},
  'BRICKS': {label: 'Bricks', weight:0, image:require('./Grid/bricks.png')},
  'ROAD': {label: 'Road', weight:3, image:require('./Grid/road.png')},
  'ROAD_LINE': {label: 'Road1', weight:3, image:require('./Grid/road_line.png')},
};1

export default Grid;

export let Grids = {};
keys(Grid).forEach((key) => {Grids[key]=key;});
