// @flow

import type {PlayerState} from 'Game/state'

import Manager from 'Game/Manager'


export default class PlayerManager extends Manager{
    type:string
    state: PlayerState
    constructor(state:PlayerState){
        super();
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