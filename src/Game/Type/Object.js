/*
Objects are permanent(ish) fixtures attached to blocks
*/
import keys from 'lodash.keys';
const Objekt = {
  'TEST': {label: 'Test', image:require('./Object/test.png'), width:1, height:1},
  'BED': {label: 'Bed', image:require('./Object/bed.png'), width:1, height:2},
  'DOCK': {label: 'Dock', image:require('./Object/dockspot.png'), width:2, height:2},
};
export default Objekt;

export let Objects = {};
keys(Objekt).forEach((key) => {Objects[key]=key;});
