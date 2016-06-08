import { createStore } from 'redux';
import UI from 'Game/UI';
import reducer from 'Game/UI/reducer';
import reactDOM from 'react-dom';

export default class UIManager{
  constructor(state, container){
    if(!container) throw new Error('I need a container to render in');
    this.container = container;
  }
  start(){
    this.store = createStore(reducer);
    this.store.subscribe(this.render);
    render();
  }
  render(){
    reactDOM.render(UI, this.container);
  }
}
