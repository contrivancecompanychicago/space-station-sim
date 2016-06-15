

export default class Renderer{
  constructor(container){
    //make canvas
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    // this.context = canvas.

    this.context.beginPath();
    this.context.rect(20, 20, 150, 100);
    this.context.fillStyle = "red";
    this.context.fill();
  }
}
