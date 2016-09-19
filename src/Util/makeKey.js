import config from 'Game/config';
export default function makeKey(x, y){
  if(config.env==='dev'){
    if(typeof x !== 'number') throw new Error('makeKey x not a number');
    if(typeof y !== 'number') throw new Error('makeKey y not a number');
  }
  return `${x}_${y}`;
}
