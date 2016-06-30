import Item from './Item';
import {keys} from 'lodash';

let item;
let state;
describe('Game/Manager/Item', () => {
  beforeEach(() => {
    state = {};
    item = new Item(state);
  });
  it('should addItem', () => {
    item.addItem({x:0, y:1}, "test");
    expect(keys(item.state).length).toBe(1);
  });
});
