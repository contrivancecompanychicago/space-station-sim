import ObjectManager from 'Game/Model/Object';
import {values, keys} from 'lodash';
import types from 'Game/Data/Object';

import Obj from 'Game/Type/Object'
import Item from 'Game/Type/Item'



let state = {};
let objectManager = new ObjectManager(state);

let dummy = {
  block:{x:1, y:1},
  type: keys(types)[0],
  getKey: () => 123
};

describe('Game/Model/Object', () => {
  beforeEach(() => {
    state = {};
    objectManager = new ObjectManager(state);
  });

  describe('addObject', () => {
    it('should add to state', () => {
      objectManager.addObject(dummy);
      expect(values(state).indexOf(dummy) > -1).toBe(true);

    });
  });

  describe('getObjectsWithAbility', () => {
    it('should find objects with types with ability', () => {
      objectManager.addObject(new Obj({block:{x:10,y:10}, type:'OVEN'}))
      objectManager.addObject(new Obj({block:{x:0,y:0}, type:'FRIDGE'}))
      let objs = objectManager.getObjectsWithAbility('FRIDGE')
      expect(objs.length).toBe(1)
    })

  })

  describe('getObjectsWithItemType', () => {
    it('should get items', () => {
      let obj1 = new Obj({block:{x:10,y:10}, type: 'OVEN'})
      let obj2 = new Obj({block:{x:15,y:15}, type: 'TABLE'})
      let item = new Item({position:{x:0,y:0}, type:'TEST'})
      obj2.item = item;
      objectManager.addObject(obj1)
      objectManager.addObject(obj2)
      let objs = objectManager.getObjectsWithItemType('TEST');
      expect(objs.length).toBe(1)

    })
  })

});
