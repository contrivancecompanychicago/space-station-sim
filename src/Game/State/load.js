//@flow
import data from './demo2'

import Grid from 'Game/Type/Grid'
import Obj from 'Game/Type/Object'
import Character from 'Game/Type/Character'
import {keys} from 'lodash'

export default function loadGame(engine:any){

  let dispatcher = engine.getComponent('actionDispatcher')

  let grid = data.Grid

  let parseKey = require('Util/parseKey').default;
  let Block = require('Game/Block').default;

  keys(grid).forEach((key)=>{
      let block = parseKey(key);
      engine.getComponent('gridManager').addNode(block.x, block.y, new Grid(grid[key]))
      // console.log(block);
  })

  let object = data.Object;
  keys(object).forEach((key) => {
    // let block = parseKey(key);
    let obj = object[key];

    obj.block = new Block(obj.block)
    obj.character = null; //HACK: fixing data in demo mode
    // this.manager.getComponent('objectManager').addObject(new Obj(obj));
    object[key] = new Obj(obj);
  })
  dispatcher.objects(object)

  let chars = [
    {x:11, y:8, type:'COOK'},
    {x:18, y:8, type:'WAITER'},
    {x:18, y:12, type:'CUSTOMER'},
  ]
  chars.forEach((c)=> {
    // console.log("ding");
    let pos = new Block({x:c.x, y:c.y}).center;
    engine.getComponent('characterManager')
      .addChar(new Character({position: pos, type: c.type}));

  })

}
