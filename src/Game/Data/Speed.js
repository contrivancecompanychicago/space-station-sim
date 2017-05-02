
import {keys} from 'lodash';

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
  'FAST': {label: 'fast', speed: 5},
  'FASTER': {label: 'fast', speed: 10},
  'TURBO': {label: 'turbo', speed: 20},
};

export default Speed;

export let Speeds:{[id:SpeedType]:SpeedType} = {};
keys(Speed).forEach((key) => {Speeds[key]=key;});
