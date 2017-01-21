// @flow
import {keys, defaults} from 'lodash';
import type Character from 'Game/Type/Character'
import type Item from 'Game/Type/Item'
export default class Order{
  customer: Character;
  item: ?Item;
  constructor(params:{customer:Character}){
    defaults(this, params);
  }
}
