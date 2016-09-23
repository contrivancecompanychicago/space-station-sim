import ObjectManager from 'Game/Manager/Object';
import {values, keys} from 'lodash';
import types from 'Game/Type/Object';

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

});
