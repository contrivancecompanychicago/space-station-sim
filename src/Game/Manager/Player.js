// @flow

import type {PlayerState} from 'Game/state'
export default class PlayerManager{
    type:string
    state: PlayerState
    constructor(state:PlayerState){
        this.type = 'playerManager';
        this.state = state;
    }

    spendMoney(amount:number):boolean{
        if(this.state.money>amount){
            this.state.money -= amount
            return true;
        }
        return false;
    }
    addMoney(amount:number){
        this.state.money += amount
    }

}