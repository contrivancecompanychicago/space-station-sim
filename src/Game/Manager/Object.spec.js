import ObjectManager from 'Game/Manager/Object';
import {values} from 'lodash';

let state = {};
let objectManager = new ObjectManager(state);

describe('Game/Manager/Object', () => {
  beforeEach(() => {
    state = {};
    objectManager = new ObjectManager(state);
  });

  describe('addObject', () => {
    it('should add to state', () => {
      let obj = {block:{x:1, y:1}};
      objectManager.addObject(obj);
      expect(values(state).indexOf(obj) > -1).toBe(true);

    });
  });

});
