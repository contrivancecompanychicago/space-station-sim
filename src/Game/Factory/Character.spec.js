import CharacterFactory from 'Game/Factory/Character';

describe('Game/Factory/Character', () => {
  describe('create', () => {
    it('should have a create method', () => {
      expect(CharacterFactory.create).toBeDefined();
    });
    it("should return an object", () => {
      expect(CharacterFactory.create()).toBeDefined();
    });
  });
});
