import Character from './Character';

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
});
