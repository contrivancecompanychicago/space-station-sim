import ObjectManager from 'Game/Manager/Object';
import {values, keys} from 'lodash';
import types from 'Game/Data/Object';

import Obj from 'Game/Type/Object'

let state = {};
let objectManager = new ObjectManager(state);

let dummy = {
  block:{x:1, y:1},
  type: keys(types)[0]
};

describe('Game/Manager/Object', () => {
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

});
