
import keys from 'lodash.keys';

export type SpeedType =
  'SLOW'|
  'NORMAL'|
  'FAST'

export type SpeedDataType = {
  label: string,
  speed: number
}

const Speed:{[id:SpeedType]:SpeedDataType} = {
  'SLOW': {label: 'slow', speed:0.5},
  'NORMAL': {label: 'normal', speed: 1},
  'FAST': {label: 'fast', speed: 2},
};

export default Speed;

export let Speeds:{[id:SpeedType]:SpeedType} = {};
keys(Speed).forEach((key) => {Speeds[key]=key;});
