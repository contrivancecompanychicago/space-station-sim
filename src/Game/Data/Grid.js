//@flow
import {keys} from 'lodash';

import DataMap from 'Game/Data/Map'
export type GridType = string;
  // 'BASIC'|
  // 'FLOOR'|
  // 'TILES1'|
  // 'TILES2'|
  // 'SHOP'|
  // 'BAR'|
  // 'WALL'|
  // 'DOCK'|
  // 'BRICKS'|
  // 'ROAD'|
  // 'ROAD_LINE'|
  // 'CARPET'|
  // 'CARPETH'|
  // 'GREYFLOOR'|
  // 'GREYFLOOR2'|
  // 'REDFLOOR'|
  // 'REDFLOOR2'|
  // 'WOODANGLE'|
  // 'WOOD'|
  // 'GREYWALL'|
  // 'GREYWALL2'|
  // 'GREYWALLCORNER'|
  // 'GREYWALLCORNER2'|
  // 'REDWALL'|
  // 'REDWALL2'|
  // 'WALLTEST'|
  // 'WALLTESTCORNER'|
  // 'WALLTESTVERT'|
  // 'FOODTRUCKTR'|
  // 'FOODTRUCKTM'|
  // 'FOODTRUCKTL'|
  // 'FOODTRUCKMR'|
  // 'FOODTRUCKML'|
  // 'FOODTRUCKBR'|
  // 'FOODTRUCKBM'|
  // 'FOODTRUCKBL'


export type GridDataType = {
  label:string,
  weight:number,
  image:any,
  link?:{ //if walls link to nearby walls
    above:any,
    below:any,
    left:any,
    right:any,
  }
}

const Gridz:{[id:GridType]:GridDataType} = {
  // 'BASIC': {label: 'Basic', weight:1},
  'FLOOR': {label: 'Floor', weight:1, image:require('./Grid/plain.png')},
  'TILES1': {label: 'Tiles', weight:1, image:require('./Grid/bw_tiles.png')},
  'TILES2': {label: 'Tiles', weight:1, image:require('./Grid/browntiles.png')},
  // 'SHOP': {label: 'Shop', weight:2, image:require('./Grid/plain.png'), tint:'red'},
  // 'BAR': {label: 'Shop', weight:1, image:require('./Grid/plain.png'), tint:'green'},
  // 'WALL': {label: 'Wall', weight:0, image:require('./Grid/wall.png')},
  // 'DOCK': {label: 'Dock', weight:1, image:require('./Grid/dock.png')},
  // 'BRICKS': {label: 'Bricks', weight:0, image:require('./Grid/bricks.png')},
  'ROAD': {label: 'Road', weight:20, image:require('./Grid/road.png')},
  'ROAD_LINE': {label: 'Road1', weight:3, image:require('./Grid/road_line.png')},
  'CARPET': {label: 'Floor', weight:1, image:require('./Grid/carpet.png')},
  'CARPETH': {label: 'Floor', weight:1, image:require('./Grid/carpethighlight.png')},
  // 'GREYFLOOR': {label: 'Floor', weight:1, image:require('./Grid/greyfloor.png')},
  // 'GREYFLOOR2': {label: 'Floor', weight:1, image:require('./Grid/greyfloor2.png')},
  // 'REDFLOOR': {label: 'Floor', weight:1, image:require('./Grid/redfloor1.png')},
  // 'REDFLOOR2': {label: 'Floor', weight:1, image:require('./Grid/redfloor2.png')},
  'WOODANGLE': {label: 'Floor', weight:1, image:require('./Grid/woodanglefloor.png')},
  'WOOD': {label: 'Floor', weight:1, image:require('./Grid/woodstraightfloor.png')},
  // 'GREYWALL': {label: 'Wall', weight:0, image:require('./Grid/greywall.png')},
  // 'GREYWALL2': {label: 'Wall', weight:0, image:require('./Grid/greywall2.png')},
  // 'GREYWALLCORNER': {label: 'Wall', weight:0, image:require('./Grid/greywallcorner.png')},
  // 'GREYWALLCORNER2': {label: 'Wall', weight:0, image:require('./Grid/greywallcorner2.png')},
  // 'REDWALL': {label: 'Wall', weight:0, image:require('./Grid/redwall1.png')},
  // 'REDWALL2': {label: 'Wall', weight:0, image:require('./Grid/redwall2.png')},
  'WALLTEST': {label: 'WallTest', weight:0, image:require('./Grid/walltest.png'),
    link:{
      above: require('./Grid/walltest_above.png'),
      below: require('./Grid/walltest_below.png'),
      left: require('./Grid/walltest_left.png'),
      right: require('./Grid/walltest_right.png'),
    }},
  'FLATROOF': {label: 'Roof', weight:0, image:require('./Grid/flatroof.png')},
  // 'WALLTESTCORNER': {label: 'WallTest', weight:0, image:require('./Grid/walltestcorner.png')},
  // 'WALLTESTVERT': {label: 'WallTest', weight:0, image:require('./Grid/walltestvert.png')},
  // 'FOODTRUCKTR': {label: 'Food Truck tr', weight: 0, image:require('./Grid/foodtruck/tr.png')},
  // 'FOODTRUCKTM': {label: 'Food Truck tm', weight: 0, image:require('./Grid/foodtruck/tm.png')},
  // 'FOODTRUCKTL': {label: 'Food Truck tl', weight: 0, image:require('./Grid/foodtruck/tl.png')},
  // 'FOODTRUCKMR': {label: 'Food Truck mr', weight: 0, image:require('./Grid/foodtruck/mr.png')},
  // 'FOODTRUCKML': {label: 'Food Truck ml', weight: 0, image:require('./Grid/foodtruck/ml.png')},
  // 'FOODTRUCKBR': {label: 'Food Truck br', weight: 0, image:require('./Grid/foodtruck/br.png')},
  // 'FOODTRUCKBM': {label: 'Food Truck bm', weight: 0, image:require('./Grid/foodtruck/bm.png')},
  // 'FOODTRUCKBL': {label: 'Food Truck bl', weight: 0, image:require('./Grid/foodtruck/bl.png')},
  // 'FOODTRUCKTR2': {label: 'Food Truck tr2', weight: 0, image:require('./Grid/foodtruck/tr2.png')},
  // 'FOODTRUCKMR2': {label: 'Food Truck mr2', weight: 0, image:require('./Grid/foodtruck/mr2.png')},
  // 'FOODTRUCKBR2': {label: 'Food Truck br2', weight: 0, image:require('./Grid/foodtruck/br2.png')},
};

// export default Gridz;
const GridMap:DataMap<GridType, GridDataType> = new DataMap();

export let Grid:{[id:GridType]:GridType} = {};
keys(Gridz).forEach((key) => {
  Grid[key]=key;
  GridMap.put(key, Gridz[key]);
});

export default GridMap;