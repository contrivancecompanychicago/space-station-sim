import {selection} from 'Game/Manager/View';
import Proposer from 'Game/Action/Proposer';
let proposer = new Proposer();
let state;
describe('Game/Action/Proposer', () => {
  describe('Grid', () => {
    beforeEach(() => {
      state = {UI:{mode:'GRID',grid:'FLOOR'}, View:{}};
      state.View.selection = selection({x:1, y:1}, {x:100, y:100});
    });
    it('should return a grid object', () => {
      let p = proposer.propose(state);
      expect(p.Grid).toBeDefined();
      // console.log(p);
      expect(p.Grid['0_0']).toBe('FLOOR');
      expect(p.Grid['3_3']).toBe('FLOOR');
    });
    it('should not overwrite existing blocks of same type', () => {
      state.Grid = {'0_0':'FLOOR'};
      let p = proposer.propose(state);
      expect(p.Grid['0_0']).not.toBeDefined();
    });
  });
});
