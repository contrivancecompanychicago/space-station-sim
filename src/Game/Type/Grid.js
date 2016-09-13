const Grid = {
  'BASIC': {label: 'Basic'},
  'FLOOR': {label: 'Floor', image:require('./Grid/plain.png')},
  'WALL': {label: 'Wall', image:require('./Grid/wall.png')},
  'DOCK': {label: 'Dock', image:require('./Grid/dock.png')},
};

// console.log(Grid.BASIC.image);

export default Grid;

export let Grids = {
  'BASIC':'BASIC',
  'FLOOR':'FLOOR',
  'WALL':'WALL',
  'DOCK':'DOCK',
};
