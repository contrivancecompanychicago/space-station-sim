
import Character from './Character';

import Item from 'Game/Type/Item'
import Point from 'Game/Point'

describe('Game/Type/Character', () => {
  it('should fill in the ID', () => {
    let c = new Character({});
    expect(c.id).toBeDefined();
  });
  it('should copy over firstname lastname', () => {
    let c = new Character({firstname:"James", lastname:"Smith"});
    expect(c.firstname).toBe('James');
    expect(c.lastname).toBe('Smith');
  });

  describe('items',() => {
    it('should add', () => {
      let c = new Character();
      let item = new Item({position:new Point(1,2), type:'PIZZA'})
      c.addItem(item)
      expect(c.item.length).toBe(1);

    })
    it('should remove from list', () => {
      let c = new Character();
      let item1 = new Item({position:new Point(1,2), type:'PIZZA'})
      let item2 = new Item({position:new Point(3,4), type:'TEST'})
      let item3 = new Item({position:new Point(5,6), type:'COFFEE'})
      c.addItem(item1)
      c.addItem(item2)
      c.addItem(item3)
      expect(c.item.length).toBe(3);
      c.removeItem(item2);
      expect(c.item.length).toBe(2);
      expect(c.item[0]).toBe(item1);
      expect(c.item[1]).toBe(item3);
    })
    it('should wipe', () => {
      let c = new Character();
      let item1 = new Item({position:new Point(1,2), type:'PIZZA'})
      let item2 = new Item({position:new Point(3,4), type:'TEST'})
      let item3 = new Item({position:new Point(5,6), type:'COFFEE'})
      c.item.forEach((item) => {
        c.removeItem(item)
      })
      expect(c.item.length).toBe(0)

    })
  })
});
