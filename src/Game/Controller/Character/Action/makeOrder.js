// @flow

import type Character from 'Game/Type/Character'
import type Order from 'Game/Type/Order'
import type Item from 'Game/Type/Item'

import ItemData from 'Game/Data/Item'

/** takes one step in order manufacture */
export default function* makeOrder(char:Character, order:Order):Generator<*,*,*>{
    let item:?Item = order.getItem();
    let wanted = order.type
    debugger;
    // let wanted = ItemData.get(order.type);
    //find what step we are at
    if(item && item.type == wanted){
        //at the right step
        return wanted
    }
    let data = ItemData.get(wanted)
    let reqd  = data.requires.itemType
    
    if(item && item.type == reqd){
        //at the right step
        yield wanted
    }
    wanted = reqd;
    data = ItemData.get(wanted)
    reqd  = data.requires.itemType

    if(item && item.type == reqd){
        //at the right step
        yield wanted
    }
    wanted = reqd;

    data = ItemData.get(wanted)
    reqd = data.requires.itemType
    if(!reqd){
        // console.log('base');
        yield wanted;
    }


    return 'end';
}