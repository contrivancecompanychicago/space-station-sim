import config from 'Game/config';

export default function blockToPoint(block){
  return {
    x: block.x * config.grid.width,
    y: block.y * config.grid.height
  };
}
