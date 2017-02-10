
import Component from 'Imagine/Component';

import type CharacterManager from './Manager/Character';
import type GridManager from './Manager/Grid';
import type ItemManager from './Manager/Item';
import type LogManager from './Manager/Log';
import type ObjectManager from './Manager/Object';
import type OrderManager from './Manager/Order';
import type PlayerManager from './Manager/Player';
import type TaskManager from './Manager/Task';
import type TimeManager from './Manager/Time';
import type UiManager from './Manager/Ui';
import type ViewManager from './Manager/View';


export default class Manager extends Component{
    characterManager: CharacterManager;
    gridManager: GridManager;
    itemManager: ItemManager;
    logManager: LogManager;
    objectManager: ObjectManager;
    orderManager: OrderManager;
    playerManager: PlayerManager;
    taskManager: TaskManager;
    timeManager: TimeManager;
    uiManager: UiManager;
    viewManager: ViewManager;
    init(){
        this.characterManager = this.getComponent('characterManager');
        this.gridManager = this.getComponent('gridManager');
        this.itemManager = this.getComponent('itemManager');
        this.logManager = this.getComponent('logManager');
        this.objectManager = this.getComponent('objectManager');
        this.orderManager = this.getComponent('orderManager');
        this.playerManager = this.getComponent('playerManager');
        this.taskManager = this.getComponent('taskManager');
        this.timeManager = this.getComponent('timeManager');
        this.uiManager = this.getComponent('uiManager');
        this.viewManager = this.getComponent('viewManager');
    }
}