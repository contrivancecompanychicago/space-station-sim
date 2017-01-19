import keys from 'lodash.keys';

export type GridType =
  'BASIC'|
  'FLOOR'|
  'TILES1'|
  'TILES2'|
  'SHOP'|
  'BAR'|
  'WALL'|
  'DOCK'|
  'BRICKS'|
  'ROAD'|
  'ROAD_LINE'

export type GridDataType = {
  label:string,
  weight:number
}

const Gridz:{[id:GridType]:GridDataType} = {
  'BASIC': {label: 'Basic', weight:1},
  'FLOOR': {label: 'Floor', weight:1, image:require('./Grid/plain.png')},
  'TILES1': {label: 'Tiles', weight:1, image:require('./Grid/bw_tiles.png')},
  'TILES2': {label: 'Tiles', weight:1, image:require('./Grid/browntiles.png')},
  'SHOP': {label: 'Shop', weight:2, image:require('./Grid/plain.png'), tint:'red'},
  'BAR': {label: 'Shop', weight:1, image:require('./Grid/plain.png'), tint:'green'},
  'WALL': {label: 'Wall', weight:0, image:require('./Grid/wall.png')},
  'DOCK': {label: 'Dock', weight:1, image:require('./Grid/dock.png')},
  'BRICKS': {label: 'Bricks', weight:0, image:require('./Grid/bricks.png')},
  'ROAD': {label: 'Road', weight:3, image:require('./Grid/road.png')},
  'ROAD_LINE': {label: 'Road1', weight:3, image:require('./Grid/road_line.png')},
};

export default Gridz;

export let Grid:{[id:GridType]:GridType} = {};
keys(Gridz).forEach((key) => {Grid[key]=key;});
