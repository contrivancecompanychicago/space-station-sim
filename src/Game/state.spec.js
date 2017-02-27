import * as state from 'Game/state';
describe('Game/state', () => {
  describe('default', () => {
    it('should be an object', () =>{
      expect(typeof state.default).toBe('object');
    });
  });

});
