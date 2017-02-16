// @flow

import type Point from 'Game/Point';
import {defaults, keys} from 'lodash';
import uniqid from 'Util/uniqid';
import namegen from 'Util/namegen'


import type {CharacterType} from 'Game/Data/Character'
import type {Skill} from 'Game/Data/Character/Skill'
import Skills from 'Game/Data/Character/Skill'

import type Item from 'Game/Type/Item'

import config from 'Game/config'


export default class Character{
  id: string;
  type:CharacterType;
  position: Point;
  firstname: string;
  lastname: string;
  action: ?Generator<*,*,*>;
  item: Array<Item>;
  task: string;
  skills: {[id:Skill]:number}
  salary: number;
  status: string;
  constructor(params:{type:CharacterType, position:Point}){
    defaults(this, params);
    if(!this.id) this.id = uniqid();
    if(!this.item) this.item = []
    if(!this.firstname) defaults(this, namegen())
    this.randomiseSkills()
    if(!this.salary) this.calculateSalary();
    this.status = "thinking"
  }
  calculateSalary(){
    this.salary = 500 + Math.floor(Math.random()*500)
  }
  randomiseSkills(){
    this.skills = {}
    keys(Skills).forEach((s:Skill) => {
      this.skills[s] = Math.floor(Math.random()*config.character.skill.max);
    })
  }
  addItem(item:Item){
    this.item.push(item)
  }
  hasItem(item:Item):boolean{
    return this.item.indexOf(item) >-1
  }
  removeItem(item:Item){
    this.item.splice(this.item.indexOf(item), 1);
  }
  getItems():Array<Item>{
    return this.item
  }
  toString():string{
    return this.firstname + ' ' + this.lastname
  }
  setStatus(status:string){
    this.status = status;
  }
}
