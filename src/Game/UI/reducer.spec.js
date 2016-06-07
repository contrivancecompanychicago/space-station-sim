import reducer from 'Game/UI/reducer';

describe('Game/UI/reducer', () => {
  describe('should contain', () => {
    let state = {};
    beforeEach(()=>{
      state = reducer({}, {type:'NOTHING'});
    });
    it('mode', () => { expect(state.mode).toBeDefined();});
    it('grid', () => { expect(state.grid).toBeDefined();});
    it('item', () => { expect(state.item).toBeDefined();});
  });
});
