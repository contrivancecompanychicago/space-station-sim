
export type ItemState = {
    [id: string]: Item
}

export default class ItemModel {
    state: ItemState;
    constructor(state: ItemState) {
        this.state = state;
    }

    addItem(item: Item) {
        this.state[item.id] = item;
    }
    removeItem(item: Item) {
        delete this.state[item.id];
    }
}