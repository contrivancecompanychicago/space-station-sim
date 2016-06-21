const Grid = {
  'BASIC': {label: 'Basic'},
  'FLOOR': {label: 'Floor', image:require('./Grid/plain.png')},
  'WALL': {label: 'Wall', image:require('./Grid/wall.png')},
};

// console.log(Grid.BASIC.image);

export default Grid;

export let Grids = {
  'BASIC':'BASIC',
  'FLOOR':'FLOOR',
  'WALL':'WALL',
};
