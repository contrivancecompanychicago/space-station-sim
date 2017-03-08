import ObjectModel from 'Game/Model/Object';
import {values, keys} from 'lodash';
import types from 'Game/Data/Object';

import Obj from 'Game/Type/Object'
import Item from 'Game/Type/Item'
import Block from 'Game/Block'



let state = {};
let objectModel = new ObjectModel(state);

let dummy = {
  block: new Block({x:1, y:1}),
  type: keys(types)[0],
  getKey: () => 123
};

describe('Game/Model/Object', () => {
  beforeEach(() => {
    state = {};
    objectModel = new ObjectModel(state);
  });

  describe('addObject', () => {
    it('should add to state', () => {
      objectModel.addObject(dummy);
      expect(values(state).indexOf(dummy) > -1).toBe(true);

    });
  });

  describe('getObjectsWithAbility', () => {
    it('should find objects with types with ability', () => {
      objectModel.addObject(new Obj({block:new Block({x:10,y:10}), type:'OVEN'}))
      objectModel.addObject(new Obj({block:new Block({x:0,y:0}), type:'FRIDGE'}))
      let objs = objectModel.getObjectsWithAbility('FRIDGE')
      expect(objs.length).toBe(1)
    })

  })

  describe('getObjectsWithItemType', () => {
    it('should get items', () => {
      let obj1 = new Obj({block:new Block({x:10,y:10}), type: 'OVEN'})
      let obj2 = new Obj({block:new Block({x:15,y:15}), type: 'TABLE'})
      let item = new Item({position:{x:0,y:0}, type:'TEST'})
      obj2.item = item;
      objectModel.addObject(obj1)
      objectModel.addObject(obj2)
      let objs = objectModel.getObjectsWithItemType('TEST');
      expect(objs.length).toBe(1)

    })
  })

});
