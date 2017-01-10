import Item from './Item';
import {keys} from 'lodash';

import types from 'Game/Data/Item';

let item;
let state;


let dummyItem = {
  position: { x:0, y:0 },
  type: keys(types)[0]
};

describe('Game/Manager/Item', () => {
  beforeEach(() => {
    state = {};
    item = new Item(state);
  });
  it('should addItem', () => {
    item.addItem(dummyItem);
    expect(keys(item.state).length).toBe(1);
  });
});
