//@flow
import keys from 'lodash.keys';

export type GridType =
  // 'BASIC'|
  'FLOOR'|
  'TILES1'|
  'TILES2'|
  'SHOP'|
  'BAR'|
  'WALL'|
  'DOCK'|
  'BRICKS'|
  'ROAD'|
  'ROAD_LINE'|
  'CARPET'|
  'CARPETH'|
  'GREYFLOOR'|
  'GREYFLOOR2'|
  'REDFLOOR'|
  'REDFLOOR2'|
  'WOODANGLE'|
  'WOOD'|
  'GREYWALL'|
  'GREYWALL2'|
  'REDWALL'|
  'REDWALL2'

export type GridDataType = {
  label:string,
  weight:number,
  image:any,
}

const Gridz:{[id:GridType]:GridDataType} = {
  // 'BASIC': {label: 'Basic', weight:1},
  'FLOOR': {label: 'Floor', weight:1, image:require('./Grid/plain.png')},
  'TILES1': {label: 'Tiles', weight:1, image:require('./Grid/bw_tiles.png')},
  'TILES2': {label: 'Tiles', weight:1, image:require('./Grid/browntiles.png')},
  'SHOP': {label: 'Shop', weight:2, image:require('./Grid/plain.png'), tint:'red'},
  'BAR': {label: 'Shop', weight:1, image:require('./Grid/plain.png'), tint:'green'},
  'WALL': {label: 'Wall', weight:0, image:require('./Grid/wall.png')},
  'DOCK': {label: 'Dock', weight:1, image:require('./Grid/dock.png')},
  'BRICKS': {label: 'Bricks', weight:0, image:require('./Grid/bricks.png')},
  'ROAD': {label: 'Road', weight:20, image:require('./Grid/road.png')},
  'ROAD_LINE': {label: 'Road1', weight:3, image:require('./Grid/road_line.png')},
  'CARPET': {label: 'Floor', weight:1, image:require('./Grid/carpet.png')},
  'CARPETH': {label: 'Floor', weight:1, image:require('./Grid/carpethighlight.png')},
  'GREYFLOOR': {label: 'Floor', weight:1, image:require('./Grid/greyfloor.png')},
  'GREYFLOOR2': {label: 'Floor', weight:1, image:require('./Grid/greyfloor2.png')},
  'REDFLOOR': {label: 'Floor', weight:1, image:require('./Grid/redfloor1.png')},
  'REDFLOOR2': {label: 'Floor', weight:1, image:require('./Grid/redfloor2.png')},
  'WOODANGLE': {label: 'Floor', weight:1, image:require('./Grid/woodanglefloor.png')},
  'WOOD': {label: 'Floor', weight:1, image:require('./Grid/woodstraightfloor.png')},
  'GREYWALL': {label: 'Wall', weight:0, image:require('./Grid/greywall.png')},
  'GREYWALL2': {label: 'Wall', weight:0, image:require('./Grid/greywall2.png')},
  'GREYWALLCORNER': {label: 'Wall', weight:0, image:require('./Grid/greywallcorner.png')},
  'REDWALL': {label: 'Wall', weight:0, image:require('./Grid/redwall1.png')},
  'REDWALL2': {label: 'Wall', weight:0, image:require('./Grid/redwall2.png')},
};

export default Gridz;

export let Grid:{[id:GridType]:GridType} = {};
keys(Gridz).forEach((key) => {Grid[key]=key;});
