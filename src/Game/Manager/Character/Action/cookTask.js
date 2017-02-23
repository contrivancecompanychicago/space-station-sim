// @flow
import type Character from 'Game/Type/Character';
import type Task from 'Game/Type/Task';
import type Obj from 'Game/Type/Object'
import Ability from 'Game/Data/Object/Ability'

import actions from './index'
export default function* cookTask(char:Character, task:Task):Generator<*,*,*>{
    //obtain ingredients
    yield *actions.forceUseObjectWithAbility(char, Ability.FRIDGE);
    
}