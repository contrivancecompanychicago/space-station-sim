// @flow

import { values, extend, keys } from 'lodash'
import Obj from 'Game/Type/Object'
import type Block from 'Game/Block'
import state from 'Game/state'
import ObjectData from 'Game/Data/Object'
import type {AbilityType } from 'Game/Data/Object/Ability'
import type {ItemType } from 'Game/Data/Item'

import parseKey from 'Util/parseKey';
import makeKey from 'Util/makeKey';



export type ObjectState = {
  [id: string]: Obj
}

export default class ObjectModel {
  state: ObjectState;
  constructor(s: ObjectState = {}) {
    this.state = s;
  }
  addObject(obj: Obj) {
    //todo: check overlaps
    //todo: valid/verify/factory
    // obj = Factory.create(obj);
    this.state[obj.getKey()] = obj;

  }
  deleteObject(obj: Obj) {
    delete this.state[obj.getKey()];
  }
  getObject(key: string) {
    return this.state[key]
  }
  getObjectAtBlock(block: Block):?Obj{
    if(this.state[block.key])
      return this.state[block.key];

    //check overlapping
    let grid = state.grid.getNode(block.x, block.y)
    if(grid) {
      if (grid.object) {
        return this.state[grid.object];
      }
    }

  }
  getObjects(): Array<Obj> {
    return values(this.state);
  }
  getObjectsOfType(type: string): Array<Obj> {
    return values(this.state).filter((o) => { return o.type === type })
  }
  getObjectsWithAbility(ability: AbilityType): Array<Obj> {
    return values(this.state).filter((o) => {
      let type = ObjectData.get(o.type)
      if (type.abilities.indexOf(ability) > -1) return true
    })
  }

  getObjectsWithItemType(type: ItemType): Array<Obj> {
    return values(this.state).filter((o) => {
      if (o.item) {
        if (o.item.type === type) return true
      }
    })
  }

  mergeState(objects: ObjectState) {
    extend(state.object.state, objects)
    keys(objects).forEach((key) => {
      let obj = objects[key];

      let type = ObjectData.get(obj.type)

      let coord = parseKey(key)
      for (let x = 0; x < type.width; x++) {
        for (let y = 0; y < type.height; y++) {
          let gridkey = makeKey(coord.x + x, coord.y + y)
          if (state.grid.state[gridkey])
            state.grid.state[gridkey].object = key;
        }
      }
    })
  }

}
