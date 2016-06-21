import config from 'Game/config';

export default function blockToPoint(block){
  return {
    x: Math.floor(block.x / config.grid.width),
    y: Math.floor(block.y / config.grid.height)
  };
}
