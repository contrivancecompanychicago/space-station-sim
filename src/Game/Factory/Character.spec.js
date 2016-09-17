import CharacterFactory from 'Game/Factory/Character';

describe('Game/Factory/Character', () => {
  describe('create', () => {
    it('should have a create method', () => {
      expect(CharacterFactory.create).toBeDefined();
    });
    it("should return an object", () => {
      expect(CharacterFactory.create()).toBeDefined();
    });
    it('should have a position that is instance of Point', () => {
      let c = CharacterFactory.create();
      expect(c.position).toBeDefined();
      expect(c.position.constructor.name).toBe('Point')

    })
  });
});
