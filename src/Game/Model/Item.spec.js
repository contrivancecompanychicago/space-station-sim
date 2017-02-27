import Item from 'Game/Model/Item';
import {keys} from 'lodash';

import ItemData from 'Game/Data/Item';

let item;
let state;


let dummyItem = {
  position: { x:0, y:0 },
  type: keys(ItemData)[0]
};

describe('Game/Model/Item', () => {
  beforeEach(() => {
    state = {};
    item = new Item(state);
  });
  it('should addItem', () => {
    item.addItem(dummyItem);
    expect(keys(item.state).length).toBe(1);
  });
});
