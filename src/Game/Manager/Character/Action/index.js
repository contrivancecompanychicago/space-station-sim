
// @flow
import cook from './cook';
import make from './make';
import serveOrder from './serveOrder';
import serveFood from './serveFood';
import serveDrink from './serveDrink';
import cookPizza from './cookPizza';
import makeCoffee from './makeCoffee';
import customer from './customer';
import findObject from './findObject';
import findObjects from './findObjects';
import idle from './idle';
import moveToBlock from './moveToBlock';
import moveToBlockCenter from './moveToBlockCenter'
import pathToBlock from './pathToBlock';
import pathToObject from './pathToObject'
import pathToObjectWithAbility from './pathToObjectWithAbility'
import placeItemOnBlock from './placeItemOnBlock'
import placeItemOnEmptyTable from './placeItemOnEmptyTable'
import task from './task';
import waiter from './waiter';
import wander from './wander';
import wandertoAdjacentTile from './wanderToAdjacentTile';
import forceUseObjectWithAbility from './forceUseObjectWithAbility';
import followPath from './followPath';
import worker from './worker';
import shortestPathToObject from './shortestPathToObject';



export default {
  make,
  cook,
  serveOrder,
  serveFood,
  serveDrink,
  cookPizza,
  makeCoffee,
  customer,
  findObject,
  findObjects,
  idle,
  moveToBlock,
  moveToBlockCenter,
  pathToBlock,
  pathToObject,
  pathToObjectWithAbility,
  placeItemOnBlock,
  placeItemOnEmptyTable,
  task,
  waiter,
  wander,
  wandertoAdjacentTile,
  forceUseObjectWithAbility,
  followPath,
  worker,
  shortestPathToObject,
};
