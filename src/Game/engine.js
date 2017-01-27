// @flow
import Imagine from 'imagine-engine'

import type CharacterManager from 'Game/Manager/Character'
import type GridManager from 'Game/Manager/Grid'
import type ItemManager from 'Game/Manager/Item'
import type ObjectManager from 'Game/Manager/Object'
import type OrderManager from 'Game/Manager/Order'
import type TaskManager from 'Game/Manager/Task'
import type TimeManager from 'Game/Manager/Time'
import type ViewManager from 'Game/Manager/View'
import type LogManager from 'Game/Manager/Log'

let engine = new Imagine();

export default engine;

//EXPANDED THIS WAY FOR EASIER TYPING

let _characterManager;
export function getCharacterManager():CharacterManager{
  if(!_characterManager) _characterManager = engine.getComponent('characterManager')
  return _characterManager
}
let _gridManager;
export function getGridManager():GridManager{
  if(!_gridManager) _gridManager = engine.getComponent('gridManager')
  return _gridManager
}
let _itemManager;
export function getItemManager():ItemManager{
  if(!_itemManager) _itemManager = engine.getComponent('itemManager')
  return _itemManager
}
let _objectManager;
export function getObjectManager():ObjectManager{
  if(!_objectManager) _objectManager = engine.getComponent('objectManager')
  return _objectManager
}
let _orderManager;
export function getOrderManager():OrderManager{
  if(!_orderManager) _orderManager = engine.getComponent('orderManager')
  return _orderManager
}
let _taskManager;
export function getTaskManager():TaskManager{
  if(!_taskManager) _taskManager = engine.getComponent('taskManager')
  return _taskManager
}
let _timeManager;
export function getTimeManager():TimeManager{
  if(!_timeManager) _timeManager = engine.getComponent('timeManager')
  return _timeManager
}
let _viewManager;
export function getViewManager():ViewManager{
  if(!_viewManager) _viewManager = engine.getComponent('viewManager')
  return _viewManager
}

let _logManager;
export function getLogManager():LogManager{
  if(!_logManager) _logManager = engine.getComponent('logManager')
  return _logManager
}
