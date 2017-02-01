// @flow
import {keys, defaults, values} from 'lodash';


import Point from 'Game/Point'
import config from 'Game/config';
import actions from 'Game/Manager/Character/Action';
import Character from 'Game/Type/Character';
import Component from 'Imagine/Component';

import type TaskManager from 'Game/Manager/Task';
import type {CharacterState} from 'Game/state'


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
      this._hireableChars = []
      for(let i =0; i<3; i++){
        this._hireableChars.push(this.makeHireableChar())
      }
    }
    return this._hireableChars
  }

  makeHireableChar():Character {
    let char = new Character({type:'WORKER', position:new Point(0,0)});
    return char
  }

}
