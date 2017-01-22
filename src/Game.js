//@flow

import Imagine from 'imagine-engine';

require('./Game/style.css');

import managers from 'Game/Manager';
import Renderer from 'Game/Renderer';
import ActionDispatcher from 'Game/Action/Dispatcher';
import Time from 'Game/Manager/Time';

import state from 'Game/state';
import * as time from 'Game/time';
import * as engine from 'Game/engine';

import { keys } from 'lodash';

import type {State} from 'Game/state'

import Obj from 'Game/Type/Object'; //for loading hack
import Grid from 'Game/Type/Grid'; //for loading hack

export default class Game{
  container:HTMLElement
  engine:any;
  state: State;
  manager:Object;
  constructor(container:HTMLElement){

    window.game = this; //bind to window for debug

    this.container = container; //register container

    this.engine = new Imagine(); //spawn engine
    engine.default = this.engine;

    this.state = state;//make initial reference to state global

    this.engine.register(new Renderer(this.state, this.container)); // renderer

    //spawn managers
    this.manager = this.engine.register({type:'manager', game:this}); // parent

    let timeManager = new Time(this.state.Time, this.engine.time); //time manager
    time.default = timeManager;
    this.manager.addComponent(timeManager);

    keys(managers).forEach((key) => { // misc managers with state
      let manager = managers[key];
      // if(!this.state[key])
      //   this.state[key] = {};
      this.manager.addComponent(new manager(this.state[key], this.container));
    });

    // etc
    let dispatcher = new ActionDispatcher(this.state, this.container);
    this.manager.addComponent(dispatcher);

    //HACK LOAD GAME
    let grid = {"11_7":{"type":"TILES2","rotation":0},"12_7":{"type":"TILES2","rotation":0},"13_7":{"type":"TILES2","rotation":0},"14_7":{"type":"TILES2","rotation":0},"15_7":{"type":"TILES2","rotation":0,"object":"15_7"},"11_8":{"type":"TILES2","rotation":0},"12_8":{"type":"TILES2","rotation":0},"13_8":{"type":"TILES2","rotation":0},"14_8":{"type":"TILES2","rotation":0},"15_8":{"type":"TILES2","rotation":0},"11_9":{"type":"TILES2","rotation":0},"12_9":{"type":"TILES2","rotation":0},"13_9":{"type":"TILES2","rotation":0},"14_9":{"type":"TILES2","rotation":0},"15_9":{"type":"TILES2","rotation":0},"11_10":{"type":"TILES2","rotation":0},"12_10":{"type":"TILES2","rotation":0},"13_10":{"type":"TILES2","rotation":0},"14_10":{"type":"TILES2","rotation":0},"15_10":{"type":"TILES2","rotation":0},"11_11":{"type":"TILES2","rotation":0},"12_11":{"type":"TILES2","rotation":0},"13_11":{"type":"TILES2","rotation":0},"14_11":{"type":"TILES2","rotation":0},"15_11":{"type":"TILES2","rotation":0},"11_12":{"type":"TILES2","rotation":0},"12_12":{"type":"TILES2","rotation":0},"13_12":{"type":"TILES2","rotation":0},"14_12":{"type":"TILES2","rotation":0},"15_12":{"type":"TILES2","rotation":0},"16_9":{"type":"GREYWALL","rotation":0},"16_10":{"type":"GREYWALL","rotation":0},"16_11":{"type":"GREYWALL","rotation":0},"16_12":{"type":"GREYWALL","rotation":0},"16_13":{"type":"GREYWALL","rotation":0},"10_13":{"type":"GREYWALL","rotation":0},"11_13":{"type":"GREYWALL","rotation":0},"12_13":{"type":"GREYWALL","rotation":0},"13_13":{"type":"GREYWALL","rotation":0},"14_13":{"type":"GREYWALL","rotation":0},"15_13":{"type":"GREYWALL","rotation":0},"10_6":{"type":"GREYWALL","rotation":0},"10_7":{"type":"GREYWALL","rotation":0},"10_8":{"type":"GREYWALL","rotation":0},"10_9":{"type":"GREYWALL","rotation":0},"10_10":{"type":"GREYWALL","rotation":0},"10_11":{"type":"GREYWALL","rotation":0},"10_12":{"type":"GREYWALL","rotation":0},"11_6":{"type":"GREYWALL","rotation":0},"12_6":{"type":"GREYWALL","rotation":0},"13_6":{"type":"GREYWALL","rotation":0},"14_6":{"type":"GREYWALL","rotation":0},"15_6":{"type":"GREYWALL","rotation":0},"16_6":{"type":"GREYWALL","rotation":0},"17_13":{"type":"GREYWALL","rotation":0},"18_13":{"type":"GREYWALL","rotation":0},"17_6":{"type":"GREYWALL","rotation":0},"18_6":{"type":"GREYWALL","rotation":0},"19_6":{"type":"GREYWALL","rotation":0},"20_6":{"type":"GREYWALL","rotation":0},"21_6":{"type":"GREYWALL2","rotation":0},"21_7":{"type":"GREYWALL2","rotation":0},"21_8":{"type":"GREYWALL2","rotation":0},"21_9":{"type":"GREYWALL2","rotation":0},"21_10":{"type":"GREYWALL2","rotation":0},"21_11":{"type":"GREYWALL2","rotation":0},"21_12":{"type":"GREYWALL2","rotation":0},"21_13":{"type":"GREYWALL2","rotation":0},"21_14":{"type":"FLOOR","rotation":0},"9_14":{"type":"FLOOR","rotation":0},"10_14":{"type":"FLOOR","rotation":0},"11_14":{"type":"FLOOR","rotation":0},"12_14":{"type":"FLOOR","rotation":0},"13_14":{"type":"FLOOR","rotation":0},"14_14":{"type":"FLOOR","rotation":0},"15_14":{"type":"FLOOR","rotation":0},"16_14":{"type":"FLOOR","rotation":0},"17_14":{"type":"FLOOR","rotation":0},"18_14":{"type":"FLOOR","rotation":0},"19_14":{"type":"FLOOR","rotation":0},"20_14":{"type":"FLOOR","rotation":0},"22_14":{"type":"FLOOR","rotation":0},"9_15":{"type":"FLOOR","rotation":0},"10_15":{"type":"FLOOR","rotation":0},"11_15":{"type":"FLOOR","rotation":0},"12_15":{"type":"FLOOR","rotation":0},"13_15":{"type":"FLOOR","rotation":0},"14_15":{"type":"FLOOR","rotation":0},"15_15":{"type":"FLOOR","rotation":0},"16_15":{"type":"FLOOR","rotation":0},"17_15":{"type":"FLOOR","rotation":0},"18_15":{"type":"FLOOR","rotation":0},"19_15":{"type":"FLOOR","rotation":0},"20_15":{"type":"FLOOR","rotation":0},"21_15":{"type":"FLOOR","rotation":0},"22_15":{"type":"FLOOR","rotation":0},"16_7":{"type":"WOODANGLE","rotation":0},"17_7":{"type":"WOODANGLE","rotation":0},"18_7":{"type":"WOODANGLE","rotation":0},"19_7":{"type":"WOODANGLE","rotation":0},"20_7":{"type":"WOODANGLE","rotation":0},"16_8":{"type":"WOODANGLE","rotation":0},"17_8":{"type":"WOODANGLE","rotation":0},"18_8":{"type":"WOODANGLE","rotation":0},"19_8":{"type":"WOODANGLE","rotation":0},"20_8":{"type":"WOODANGLE","rotation":0,"object":"20_8"},"17_9":{"type":"WOODANGLE","rotation":0},"18_9":{"type":"WOODANGLE","rotation":0},"19_9":{"type":"WOODANGLE","rotation":0},"20_9":{"type":"WOODANGLE","rotation":0,"object":"20_9"},"17_10":{"type":"WOODANGLE","rotation":0,"object":"17_10"},"18_10":{"type":"WOODANGLE","rotation":0},"19_10":{"type":"WOODANGLE","rotation":0},"20_10":{"type":"WOODANGLE","rotation":0,"object":"20_10"},"17_11":{"type":"WOODANGLE","rotation":0,"object":"17_11"},"18_11":{"type":"WOODANGLE","rotation":0},"19_11":{"type":"WOODANGLE","rotation":0},"20_11":{"type":"WOODANGLE","rotation":0,"object":"20_11"},"17_12":{"type":"WOODANGLE","rotation":0},"18_12":{"type":"WOODANGLE","rotation":0},"19_12":{"type":"WOODANGLE","rotation":0},"20_12":{"type":"WOODANGLE","rotation":0},"19_13":{"type":"WOODANGLE","rotation":0},"20_13":{"type":"WOODANGLE","rotation":0},"22_6":{"type":"BRICKS","rotation":0},"22_7":{"type":"BRICKS","rotation":0},"22_8":{"type":"BRICKS","rotation":0},"22_9":{"type":"BRICKS","rotation":0},"22_10":{"type":"BRICKS","rotation":0},"22_11":{"type":"BRICKS","rotation":0},"22_12":{"type":"BRICKS","rotation":0},"22_13":{"type":"BRICKS","rotation":0},"23_8":{"type":"BRICKS","rotation":0},"23_9":{"type":"BRICKS","rotation":0},"23_10":{"type":"BRICKS","rotation":0},"23_11":{"type":"BRICKS","rotation":0},"23_12":{"type":"BRICKS","rotation":0},"23_13":{"type":"BRICKS","rotation":0},"24_10":{"type":"BRICKS","rotation":0},"24_11":{"type":"BRICKS","rotation":0},"24_12":{"type":"BRICKS","rotation":0},"24_13":{"type":"BRICKS","rotation":0},"25_12":{"type":"BRICKS","rotation":0},"25_13":{"type":"BRICKS","rotation":0},"26_13":{"type":"BRICKS","rotation":0},"9_6":{"type":"BRICKS","rotation":0},"9_7":{"type":"BRICKS","rotation":0},"9_8":{"type":"BRICKS","rotation":0},"9_9":{"type":"BRICKS","rotation":0},"9_10":{"type":"BRICKS","rotation":0},"9_11":{"type":"BRICKS","rotation":0},"9_12":{"type":"BRICKS","rotation":0},"9_13":{"type":"BRICKS","rotation":0},"8_8":{"type":"BRICKS","rotation":0},"8_9":{"type":"BRICKS","rotation":0},"8_10":{"type":"BRICKS","rotation":0},"8_11":{"type":"BRICKS","rotation":0},"8_12":{"type":"BRICKS","rotation":0},"8_13":{"type":"BRICKS","rotation":0},"7_10":{"type":"BRICKS","rotation":0},"7_11":{"type":"BRICKS","rotation":0},"7_12":{"type":"BRICKS","rotation":0},"7_13":{"type":"BRICKS","rotation":0},"6_12":{"type":"BRICKS","rotation":0},"6_13":{"type":"BRICKS","rotation":0},"5_13":{"type":"BRICKS","rotation":0},"5_14":{"type":"FLOOR","rotation":0},"6_14":{"type":"FLOOR","rotation":0},"7_14":{"type":"FLOOR","rotation":0},"8_14":{"type":"FLOOR","rotation":0},"23_14":{"type":"FLOOR","rotation":0},"24_14":{"type":"FLOOR","rotation":0},"25_14":{"type":"FLOOR","rotation":0},"26_14":{"type":"FLOOR","rotation":0},"5_15":{"type":"FLOOR","rotation":0},"6_15":{"type":"FLOOR","rotation":0},"7_15":{"type":"FLOOR","rotation":0},"8_15":{"type":"FLOOR","rotation":0},"23_15":{"type":"FLOOR","rotation":0},"24_15":{"type":"FLOOR","rotation":0},"25_15":{"type":"FLOOR","rotation":0},"26_15":{"type":"FLOOR","rotation":0},"5_16":{"type":"ROAD","rotation":0},"6_16":{"type":"ROAD","rotation":0},"7_16":{"type":"ROAD","rotation":0},"8_16":{"type":"ROAD","rotation":0},"9_16":{"type":"ROAD","rotation":0},"10_16":{"type":"ROAD","rotation":0},"11_16":{"type":"ROAD","rotation":0},"12_16":{"type":"ROAD","rotation":0},"13_16":{"type":"ROAD","rotation":0},"14_16":{"type":"ROAD","rotation":0},"15_16":{"type":"ROAD","rotation":0},"16_16":{"type":"ROAD","rotation":0},"17_16":{"type":"ROAD","rotation":0},"18_16":{"type":"ROAD","rotation":0},"19_16":{"type":"ROAD","rotation":0},"20_16":{"type":"ROAD","rotation":0},"21_16":{"type":"ROAD","rotation":0},"22_16":{"type":"ROAD","rotation":0},"23_16":{"type":"ROAD","rotation":0},"24_16":{"type":"ROAD","rotation":0},"25_16":{"type":"ROAD","rotation":0},"26_16":{"type":"ROAD","rotation":0},"5_17":{"type":"ROAD_LINE","rotation":0},"6_17":{"type":"ROAD_LINE","rotation":0},"7_17":{"type":"ROAD_LINE","rotation":0},"8_17":{"type":"ROAD_LINE","rotation":0},"9_17":{"type":"ROAD_LINE","rotation":0},"10_17":{"type":"ROAD_LINE","rotation":0},"11_17":{"type":"ROAD_LINE","rotation":0},"12_17":{"type":"ROAD_LINE","rotation":0},"13_17":{"type":"ROAD_LINE","rotation":0},"14_17":{"type":"ROAD_LINE","rotation":0},"15_17":{"type":"ROAD_LINE","rotation":0},"16_17":{"type":"ROAD_LINE","rotation":0},"17_17":{"type":"ROAD_LINE","rotation":0},"18_17":{"type":"ROAD_LINE","rotation":0},"19_17":{"type":"ROAD_LINE","rotation":0},"20_17":{"type":"ROAD_LINE","rotation":0},"21_17":{"type":"ROAD_LINE","rotation":0},"22_17":{"type":"ROAD_LINE","rotation":0},"23_17":{"type":"ROAD_LINE","rotation":0},"24_17":{"type":"ROAD_LINE","rotation":0},"25_17":{"type":"ROAD_LINE","rotation":0},"26_17":{"type":"ROAD_LINE","rotation":0},"5_18":{"type":"ROAD_LINE","rotation":2},"6_18":{"type":"ROAD_LINE","rotation":2},"7_18":{"type":"ROAD_LINE","rotation":2},"8_18":{"type":"ROAD_LINE","rotation":2},"9_18":{"type":"ROAD_LINE","rotation":2},"10_18":{"type":"ROAD_LINE","rotation":2},"11_18":{"type":"ROAD_LINE","rotation":2},"12_18":{"type":"ROAD_LINE","rotation":2},"13_18":{"type":"ROAD_LINE","rotation":2},"14_18":{"type":"ROAD_LINE","rotation":2},"15_18":{"type":"ROAD_LINE","rotation":2},"16_18":{"type":"ROAD_LINE","rotation":2},"17_18":{"type":"ROAD_LINE","rotation":2},"18_18":{"type":"ROAD_LINE","rotation":2},"19_18":{"type":"ROAD_LINE","rotation":2},"20_18":{"type":"ROAD_LINE","rotation":2},"21_18":{"type":"ROAD_LINE","rotation":2},"22_18":{"type":"ROAD_LINE","rotation":2},"23_18":{"type":"ROAD_LINE","rotation":2},"24_18":{"type":"ROAD_LINE","rotation":2},"25_18":{"type":"ROAD_LINE","rotation":2},"26_18":{"type":"ROAD_LINE","rotation":2},"5_19":{"type":"ROAD","rotation":0},"6_19":{"type":"ROAD","rotation":0},"7_19":{"type":"ROAD","rotation":0},"8_19":{"type":"ROAD","rotation":0},"9_19":{"type":"ROAD","rotation":0},"10_19":{"type":"ROAD","rotation":0},"11_19":{"type":"ROAD","rotation":0},"12_19":{"type":"ROAD","rotation":0},"13_19":{"type":"ROAD","rotation":0},"14_19":{"type":"ROAD","rotation":0},"15_19":{"type":"ROAD","rotation":0},"16_19":{"type":"ROAD","rotation":0},"17_19":{"type":"ROAD","rotation":0},"18_19":{"type":"ROAD","rotation":0},"19_19":{"type":"ROAD","rotation":0},"20_19":{"type":"ROAD","rotation":0},"21_19":{"type":"ROAD","rotation":0},"22_19":{"type":"ROAD","rotation":0},"23_19":{"type":"ROAD","rotation":0},"24_19":{"type":"ROAD","rotation":0},"25_19":{"type":"ROAD","rotation":0},"26_19":{"type":"ROAD","rotation":0},"5_20":{"type":"FLOOR","rotation":0},"6_20":{"type":"FLOOR","rotation":0},"7_20":{"type":"FLOOR","rotation":0},"8_20":{"type":"FLOOR","rotation":0},"9_20":{"type":"FLOOR","rotation":0},"10_20":{"type":"FLOOR","rotation":0},"11_20":{"type":"FLOOR","rotation":0},"12_20":{"type":"FLOOR","rotation":0},"13_20":{"type":"FLOOR","rotation":0},"14_20":{"type":"FLOOR","rotation":0},"15_20":{"type":"FLOOR","rotation":0},"16_20":{"type":"FLOOR","rotation":0},"17_20":{"type":"FLOOR","rotation":0},"18_20":{"type":"FLOOR","rotation":0},"19_20":{"type":"FLOOR","rotation":0},"20_20":{"type":"FLOOR","rotation":0},"21_20":{"type":"FLOOR","rotation":0},"22_20":{"type":"FLOOR","rotation":0},"23_20":{"type":"FLOOR","rotation":0},"24_20":{"type":"FLOOR","rotation":0},"25_20":{"type":"FLOOR","rotation":0},"26_20":{"type":"FLOOR","rotation":0},"5_21":{"type":"FLOOR","rotation":0},"6_21":{"type":"FLOOR","rotation":0},"7_21":{"type":"FLOOR","rotation":0},"8_21":{"type":"FLOOR","rotation":0},"9_21":{"type":"FLOOR","rotation":0},"10_21":{"type":"FLOOR","rotation":0},"11_21":{"type":"FLOOR","rotation":0},"12_21":{"type":"FLOOR","rotation":0},"13_21":{"type":"FLOOR","rotation":0},"14_21":{"type":"FLOOR","rotation":0},"15_21":{"type":"FLOOR","rotation":0},"16_21":{"type":"FLOOR","rotation":0},"17_21":{"type":"FLOOR","rotation":0},"18_21":{"type":"FLOOR","rotation":0},"19_21":{"type":"FLOOR","rotation":0},"20_21":{"type":"FLOOR","rotation":0},"21_21":{"type":"FLOOR","rotation":0},"22_21":{"type":"FLOOR","rotation":0},"23_21":{"type":"FLOOR","rotation":0},"24_21":{"type":"FLOOR","rotation":0},"25_21":{"type":"FLOOR","rotation":0},"26_21":{"type":"FLOOR","rotation":0}}
    let parseKey = require('Util/parseKey').default;
    let Block = require('Game/Block').default;

    keys(grid).forEach((key)=>{
        let block = parseKey(key);
        this.manager.getComponent('gridManager').addNode(block.x, block.y, new Grid(grid[key]))
        // console.log(block);
    })
    // FLOWHACK
    let object = {"11_9":{"type":"OVEN","block":{"x":11,"y":9}},"12_9":{"type":"OVEN","block":{"x":12,"y":9}},"14_12":{"type":"FRIDGE","block":{"x":14,"y":12}},"14_10":{"type":"FRIDGE","block":{"x":14,"y":10}},"11_7":{"type":"TABLE3","block":{"x":11,"y":7}},"12_7":{"type":"TABLE3","block":{"x":12,"y":7}},"13_7":{"type":"TABLE3","block":{"x":13,"y":7}},"15_7":{"type":"TABLE4","block":{"x":15,"y":7}},"16_7":{"type":"TABLE4","block":{"x":16,"y":7}},"17_7":{"type":"TABLE4","block":{"x":17,"y":7}},"20_9":{"type":"TABLE5","block":{"x":20,"y":9}},"17_11":{"type":"TABLE5","block":{"x":17,"y":11}},"20_11":{"type":"TABLE5","block":{"x":20,"y":11}},"20_8":{"type":"CHAIR2","block":{"x":20,"y":8}},"20_10":{"type":"CHAIR2","block":{"x":20,"y":10}},"17_10":{"type":"CHAIR2","block":{"x":17,"y":10}}};
    keys(object).forEach((key) => {
      // let block = parseKey(key);
      let obj = object[key];
      obj.block = new Block(obj.block)
      // this.manager.getComponent('objectManager').addObject(new Obj(obj));
      object[key] = new Obj(obj);
    })
    dispatcher.objects(object)

  }

  destroy(){ //mainly for tests
    this.engine.notify('destroy');
  }

}
