
import keys from 'lodash.keys';

const Speed = {
  'SLOW': {label: 'slow', speed:0.5},
  'NORMAL': {label: 'normal', speed: 1},
  'FAST': {label: 'fast', speed: 2},
};

export default Speed;

export let Speeds = {};
keys(Speed).forEach((key) => {Speeds[key]=key;});
