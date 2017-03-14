//@flow
/*
Items are easily movable entities that only have a position
*/
import DataMap from 'Game/Data/Map'
import {keys} from 'lodash';
import type {TaskType} from 'Game/Data/Task'
import type {AbilityType} from 'Game/Data/Object/Ability'

export type ItemType = 'TEST'|'BASE'|'PIZZAUNCOOKED'|'PIZZA'|'PIZZADONE'|'COFFEE'|'COFFEEDONE'

export type ItemRequires = {
  objectAbility?: AbilityType,
  leaveAtObjectAbility?: AbilityType,
  itemType?: ItemType,
  characterTaskType?: TaskType
}
export type ItemDataType = {
  label:string,
  image:any,
  requires: ItemRequires,
}

const Items:{[id:ItemType]:ItemDataType} = {
  'TEST': {
    label: 'test item', 
    requires:{},
    image: require('./Item/pizza.png')
  },
  'BASE': {
    label: 'ingredients', 
    requires:{
      objectAbility: 'FRIDGE',
      characterTaskType: 'MAKE'
    },
    image: require('./Item/pizzabase.png')
  },
  'PIZZAUNCOOKED': {
    label: 'ingredients', 
    requires:{
      itemType: 'BASE',
      objectAbility: 'PREP_TABLE',
      characterTaskType: 'MAKE'
    },
    image: require('./Item/pizzauncooked.png')
  },
  'PIZZA': {
    label: 'ingredients', 
    requires:{
      itemType: 'PIZZAUNCOOKED',
      objectAbility: 'OVEN',
      leaveAtObjectAbility: 'SERVE_TABLE',
      characterTaskType: 'COOK'
    },
    image: require('./Item/pizza.png')
  },
  // 'PIZZADONE': {
  //   label: 'ingredients', 
  //   requires:{},
  //   image: require('./Item/pizza.png')
  // },
  'COFFEE': {
    label: 'ingredients', 
    requires:{
      objectAbility: 'MAKE_COFFEE',
      characterTaskType: 'SERVE_DRINK'
    },
    image: require('./Item/coffee.png')
  },
  // 'COFFEEDONE': {
  //   label: 'ingredients', 
  //   requires:{
  //   },
  //   image: require('./Item/coffee_empty.png')
  // },
};

// export default Items;
const ItemMap:DataMap<ItemType, ItemDataType> = new DataMap();

export let Item:{[id:ItemType]:ItemType} = {};
keys(Items).forEach((key) => {
  Item[key]=key;
  ItemMap.put(key, Items[key])
});

export default ItemMap
