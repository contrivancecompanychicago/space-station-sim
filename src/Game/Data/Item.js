//@flow
/*
Items are easily movable entities that only have a position
*/
import DataMap from 'Game/Data/Map'
import {keys} from 'lodash';

export type ItemType = 'TEST'|'BASE'|'PIZZAUNCOOKED'|'PIZZA'|'PIZZADONE'|'COFFEE'|'COFFEEDONE'

export type ItemDataType = {
  label:string,
  image:any
}

const Items:{[id:ItemType]:ItemDataType} = {
  'TEST': {label: 'test item', image: require('./Item/pizza.png')},
  'BASE': {label: 'ingredients', image: require('./Item/pizzabase.png')},
  'PIZZAUNCOOKED': {label: 'ingredients', image: require('./Item/pizzauncooked.png')},
  'PIZZA': {label: 'ingredients', image: require('./Item/pizza.png')},
  'PIZZADONE': {label: 'ingredients', image: require('./Item/pizza.png')},
  'COFFEE': {label: 'ingredients', image: require('./Item/coffee.png')},
  'COFFEEDONE': {label: 'ingredients', image: require('./Item/coffee_empty.png')},
};

// export default Items;
const ItemMap:DataMap<ItemType, ItemDataType> = new DataMap();

export let Item:{[id:ItemType]:ItemType} = {};
keys(Items).forEach((key) => {
  Item[key]=key;
  ItemMap.put(key, Items[key])
});

export default ItemMap
