import global from 'global';
import Imagine from 'imagine-engine';
import { keys } from 'lodash';
import { createStore } from 'redux';
import reducer from 'reducer';

export default class Game {
  constructor(div){
    div.appendChild(document.createElement('div'));
    keys(global).forEach((key) => { delete global[key]; }); //clean globals
    // global.engine = new Imagine();
    global.store = createStore(reducer);
  }

};
