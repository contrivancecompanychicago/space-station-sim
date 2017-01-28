
import keys from 'lodash.keys';

export type SpeedType =
  'STOP'|
  'SLOW'|
  'NORMAL'|
  'FAST'

export type SpeedDataType = {
  label: string,
  speed: number
}

const Speed:{[id:SpeedType]:SpeedDataType} = {
  'STOP': {label: 'stop', speed:0},
  'SLOW': {label: 'slow', speed:0.5},
  'NORMAL': {label: 'normal', speed: 1},
  'FAST': {label: 'fast', speed: 4},
};

export default Speed;

export let Speeds:{[id:SpeedType]:SpeedType} = {};
keys(Speed).forEach((key) => {Speeds[key]=key;});
