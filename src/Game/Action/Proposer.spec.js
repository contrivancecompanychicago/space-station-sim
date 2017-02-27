
import {selection} from 'Game/Model/View';
import Proposer from 'Game/Action/Proposer';
import {keys} from 'lodash';
import Point from 'Game/Point';

import {State} from 'Game/state'

let proposer = new Proposer();
let state;
describe('Game/Action/Proposer', () => {
  describe('Grid', () => {
    beforeEach(() => {
      // state = {ui:{mode:'GRID',grid:'FLOOR'}, view:{}, grid:{}};
      // state.view.selection = selection({x:1, y:1}, {x:100, y:100});
      state = new State();
      state.init();
      state.view.state.selection = selection({x:1, y:1}, {x:100, y:100});
    });
    it('should return a grid object', () => {
      let p = proposer.propose(state);
      expect(p.grid).toBeDefined();
      console.log(p.grid);
      
      expect(typeof p.grid.state['0_0']).toBe('object');
      expect(typeof p.grid.state['3_3']).toBe('object');
    });
    it('should not overwrite existing blocks of same type', () => {
      state.grid.state = {'0_0':'FLOOR'};
      let p = proposer.propose(state);
      expect(p.grid['0_0']).not.toBeDefined();
    });
  });
  describe('object', () => {
    describe('unselected', () => {
      it('should return an object under the mouse', () => {
        state = {UI:{mode:'OBJECT',grid:'FLOOR'}, View:{}, Grid:{}};
        state.View.mousePosition = new Point(0,0);
        let p = proposer.propose(state);
        expect(keys(p.Object).length).toBe(1);

      });
    });
  });
});
