import { createStore } from 'redux';
import freeze from 'deep-freeze';

import characters from 'reducer/characters';

let action = {type:'NOTHING'};
let state = [];

describe('reducer/characters', function(){

  beforeEach(() => {
    state = [];
    freeze(state);
  })
  it('should be defined', () => {
    expect(characters).toBeDefined();
  });

  it('should return an array', () => {
    let out = characters(state, action);
    expect(Array.isArray(out)).toBe(true);
  });

  describe('ADD_CHARACTER', () => {

    it('should add to the state', () => {
      let char = 'bob';
      let out = characters(state, {type:'ADD_CHARACTER', character: char});
      expect(out[0]).toBe(char);
    });

  });

});
