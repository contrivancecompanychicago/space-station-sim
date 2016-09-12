import * as state from 'Game/state';
describe('Game/state', () => {
  describe('default', () => {
    it('should be an object', () =>{
      expect(typeof state.default).toBe('object')
    });
  })

  describe('clear', () => {
    it('should clear default', () => {
      state.default.test = "abc";
      state.clear();
      expect(state.default.test).not.toBeDefined();
    })
  })
})
