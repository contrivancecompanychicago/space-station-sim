import Imagine from 'imagine-engine';
import CharacterManager from 'Game/Manager/Character';
import Character from 'Game/Type/Character';

let state;
let character;

describe('Game/Manager/Character', () => {
  beforeEach(() => {
    state = {};
    character = new CharacterManager(state);
  });
  describe('addChar', () => {
    it('should add to state', () => {
      let char = {id: 'myId'};
      character.addChar(char);
      expect(state.myId).toBeDefined();
    });
    it('should make missing ids', () => {
      let char = new Character({name: 'billy'});
      character.addChar(char);
      expect(char.id).toBeDefined();
      expect(state[char.id]).toBeDefined();
      expect(state[char.id]).toBe(char);
    });
  });
  describe('update', () => {
    it('should be black like my soul', () => {
      let engine = new Imagine();
      spyOn(character, 'update').and.callThrough();
      engine.register(character);
      engine.update();
      expect(character.update).toHaveBeenCalled();
      engine.reset();
    });
  });
  describe('states', () => {
    it('should bind properly',  () => {
      const Test = {
        test: {
          myfunc: function() {
            expect(this.working).toBe(true);
          }
        }
      };
      spyOn(Test.test, 'myfunc').and.callThrough();
      class TestClass{
        call(){
          this.working = true;
          let f = Test.test.myfunc.bind(this);
          f();
        }
      }
      let test = new TestClass();
      test.call();
      expect(Test.test.myfunc).toHaveBeenCalled();
    });
  });
});
