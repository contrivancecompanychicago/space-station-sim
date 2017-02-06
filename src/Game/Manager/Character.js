// @flow
import {keys, defaults, values} from 'lodash';


import Point from 'Game/Point'
import config from 'Game/config';
import actions from 'Game/Manager/Character/Action';
import Character from 'Game/Type/Character';
import Component from 'Imagine/Component';

import type TaskManager from 'Game/Manager/Task';
import type {CharacterState} from 'Game/state'
import type Obj from 'Game/Type/Object'

import {getObjectManager} from 'Game/engine'

import Ability from 'Game/Data/Object/Ability'

import * as engine from 'Game/engine'


export default class CharacterManager extends Component{
  // type:string;
  state: CharacterState;
  taskManager:TaskManager;
  constructor(state:CharacterState){
    super();
    this.type = 'characterManager';
    this.state = state;
  }

  addChar(char:Character){
    this.state[char.id] = char;
  }

  removeCharacter(char:Character){
    delete this.state[char.id]
  }


  getClosestCharacterToPoint(p:{x:number, y:number}, min:?number):?Character{
    if(!min){
      min = Infinity
    } else{
      min = Math.pow(min, 2);
    }
    let closestDist = min;
    let closest:Character;
    values(this.state).forEach((c:Character) => {
      let diff = {
        x: c.position.x - p.x,
        y: c.position.y - p.y,
      }
      let dist = Math.pow(diff.x, 2) + Math.pow(diff.y, 2);
      if(dist<closestDist){
        closestDist = dist;
        closest = c
      }
    })
    return closest;
  }

  update(){
    keys(this.state).forEach((key) => {
      let char = this.state[key];
      if(!char.action){
        this.newAction(char);
      }
      if(char.action.next().done){ ///CALLS NEXT HERE
        this.newAction(char);
      }
    });
    this.spawnUpdate()
  }

  hireCharacter(char:Character){
    engine.getPlayerManager().spendMoney(char.salary)
    this.spawnCharacter(char);
    this.generateHireableChars();
  }

  spawnCharacter(char:Character){
    let objectManager = getObjectManager();
    let spawnPoints = objectManager.getObjectsWithAbility(Ability.SPAWN)
    if(spawnPoints.length>0){
      let pt = spawnPoints[Math.floor(Math.random()*spawnPoints.length)];
      char.position = pt.block.center;
      this.addChar(char)
    }else{
      console.log("NO PLACE TO SPAWN");
    }
  }

  spawnUpdate(){
    //spawn;
    let objectManager = getObjectManager();
    let spawnPoints = objectManager.getObjectsWithAbility(Ability.SPAWN)
    spawnPoints.forEach((sp) => {
      if(Math.random()<0.0004){
        // console.log(sp)
        let char = new Character({position:sp.block.center, type:'CUSTOMER'})
        // console.log(this)
        this.addChar(char);
      }
    })

  }

  newAction(char:Character){
    if(!this.taskManager){
      this.taskManager = (this.getComponent('taskManager'):any);
    }
    let task = this.taskManager.getUnassignedTask();
    if(task){
      this.taskManager.assignTask(task.id, char.id);
      char.task = task.id;
      char.action = actions.task(char);
      return;
    }
    //

    switch(char.type){
      case 'COOK':
        char.action = actions.cook(char);
        break;
      case 'WAITER':
        char.action = actions.waiter(char);
        break;
      case 'CUSTOMER':
        char.action = actions.customer(char);
        break;
      default:
        char.action = actions.wander(char);
    }
  }

  getChar(id:string):Character{
    return this.state[id];
  }

  _hireableChars: Array<Character>
  getHireableChars():Array<Character> {
    if(!this._hireableChars){
      this.generateHireableChars();
    }
    return this._hireableChars
  }
  generateHireableChars(){
    this._hireableChars = []
    for(let i =0; i<3; i++){
      this._hireableChars.push(this.makeHireableChar())
    }

  }

  makeHireableChar():Character {
    let char = new Character({type:'WORKER', position:new Point(0,0)});
    return char
  }

}
