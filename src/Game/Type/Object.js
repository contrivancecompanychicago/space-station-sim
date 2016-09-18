/*
Objects are permanent(ish) fixtures attached to blocks
*/
const Object = {
  'TEST': {label: 'Test', image:require('./Object/test.png')},
};

export let Objects = {};
keys(Object).forEach((key) => {Objects[key]=key;});
