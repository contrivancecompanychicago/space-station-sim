
import actions from './index'
import state from 'Game/state'
import {Tasks} from 'Game/Data/Task'
export default function* worker(char:Character):Generator<*,*,*>{

    if(char.hasTaskType(Tasks.SERVEDRINK)){}
}