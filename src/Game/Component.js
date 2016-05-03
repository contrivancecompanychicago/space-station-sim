// base component for all classes used in imagine
// all state actions must mutate - impure
import Imagine from 'imagine-engine';

let idCounter = new Date().getTime(); //start from a seed based on time

//class statics
export let state = {};
export let engine = new Imagine();

export default class Component {
  constructor(initialState = {}){
    this.state = initialState;
    let className = this.constructor.name;
    if(!this.state.id) this.state.id = idCounter++;
    if(!state[className]) state[className] = {};
    state[this.state.id] = this.state; //attach to state

    engine.register(this);
  }
};
