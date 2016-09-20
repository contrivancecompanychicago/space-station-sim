/*
Objects are permanent(ish) fixtures attached to blocks
*/
import keys from 'lodash.keys';
const Objekt = {
  'TEST': {label: 'Test', image:require('./Object/test.png')},
};
export default Objekt;

export let Objects = {};
keys(Objekt).forEach((key) => {Objects[key]=key;});
