import Imagine from 'imagine-engine';
import CharacterModel from 'Game/Model/Character';
import Character from 'Game/Type/Character';

let state;
let character;

describe('Game/Model/Character', () => {
  beforeEach(() => {
    character = new CharacterModel();
  });
  describe('addChar', () => {
    it('should add to state', () => {
      let char = {id: 'myId'};
      character.addChar(char);
      expect(character.state.myId).toBeDefined();
    });
    it('should make missing ids', () => {
      let char = new Character({name: 'billy'});
      character.addChar(char);
      expect(char.id).toBeDefined();
      expect(character.state[char.id]).toBeDefined();
      expect(character.state[char.id]).toBe(char);
    });
  });
  describe('update', () => {
    xit('should be black like my soul', () => { //TODO: fix
      let engine = new Imagine();
      spyOn(character, 'update').and.callThrough();
      engine.register(character);
      engine.update();
      expect(character.update).toHaveBeenCalled();
      engine.reset();
    });
  });

});
