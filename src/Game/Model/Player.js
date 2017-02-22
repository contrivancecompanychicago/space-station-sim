// @flow

export type PlayerState = {
  money: number
}

export default class PlayerModel{
    type:string
    state: PlayerState
    constructor(){
        this.state = {money:10000};
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