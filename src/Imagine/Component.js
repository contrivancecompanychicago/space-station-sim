//@flow

export default class Component {
  type:string;
  getComponent(componentName:string):Component|any{};
  addComponent:Function;
}
