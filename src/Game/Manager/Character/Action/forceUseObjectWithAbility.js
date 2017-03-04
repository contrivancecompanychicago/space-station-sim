//@flow

import type Character from 'Game/Type/Character'
import type {AbilityType} from 'Game/Data/Object/Ability'
import type Obj from 'Game/Type/Object'
import actions from './index'
import state from 'Game/state'
import type Block from 'Game/Block'




export default function* forceUseObjectWithAbility(char:Character, ability:AbilityType):Generator<*,Obj,*>{
  let shortestPathLength = Infinity
  let shortestPath:Array<Block>
  let shortestPathObject:Obj

  

  let objs = yield *actions.findObjects((o:Obj) => {
    if(o.character) return false;
    if(o.item) return false;
    return o.hasAbility(ability)
  })

  let obj = char.getObject(); //OVERRIDE
  if(obj){
    objs = [obj]
  }

  objs.forEach(o => {
    o.getAccessBlocks().forEach(b => {
      let path = state.grid.getPath(char.position.block, b);
      if(path.length > 0 && path.length<shortestPathLength){
        shortestPathLength = path.length;
        shortestPath = path;
        shortestPathObject = o;
      }
    })
    
  })
  if(shortestPathObject&&shortestPath){
    shortestPathObject.setCharacter(char);
    yield *actions.followPath(char, shortestPath);
    yield *actions.placeItemOnBlock(char, shortestPathObject.block)
    shortestPathObject.removeCharacter();
    return shortestPathObject

  }else{
    throw new Error('cant find path in forceUseObjectWithAbility')
  }


  // obj.setCharacter(char);
  // yield *actions.pathToBlock(char, obj.getAccessBlock());
  // yield *actions.placeItemOnBlock(char, obj.block)
  // obj.removeCharacter();
  // return obj
}
