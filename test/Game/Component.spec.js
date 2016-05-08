// const Component = require('Game/Component');
import Component, { state, engine } from 'Game/Component';
import { keys } from 'lodash';

class Extend extends Component{
  constructor(){
    super();
  }
  newfunc(){}
};

describe('Game/Component', () => {
  beforeEach(function(){
    keys(state).forEach((key) =>{
      delete state[key];
    });
    engine.reset();
  });
  it('should be defined', () => {
    expect(Component).toBeDefined();
  });
  describe('constructor', () => {

    it('should extend', () => {
      let extended = new Extend();
      expect(state.Extend).toBeDefined();
    });

    it('should enter itself into state', () => {
      let c = new Component();
      expect(state.Component[c.state.id]).toBe(c.state);
    });

    it('should attach an ID', () => {
      let c = new Component();
      expect(c.state.id).toBeDefined();
    });

    it('should register with engine', function(){
      expect(engine.objects.length).toBe(0);
      let c = new Component();
      expect(engine.objects.length).toBe(1);
      // console.log(keys(c));
    });

  });

  describe('destroy', () => {
    it('should exist on instance', () => {
      expect(new Component().destroy).toBeDefined();
    });
    it('should remove from engine', function(){
      expect(engine.objects.length).toBe(0);
      let c = new Component();
      expect(engine.objects.length).toBe(1);
      c.destroy();
      expect(engine.objects.length).toBe(0);
    });
    it('should remove from state', function(){
      let c = new Component();
      let stateid = c.state.id;
      console.log(state);
      expect(state.Component[stateid]).toBeDefined();
      c.destroy();
      expect(state.Component[stateid]).not.toBeDefined();

    });

  });

});
