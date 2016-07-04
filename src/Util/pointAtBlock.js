import pointToBlock from './pointToBlock';
export default function pointAtBlock (point, target){
  let block = pointToBlock(point);
  return (block.x === target.x && block.y === target.y);
}
