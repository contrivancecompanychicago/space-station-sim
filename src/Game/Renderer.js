

export default class Renderer{
  constructor(container){
    //make canvas
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.id = "canv";
    this.container.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");

    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
  }
  resize() {
    // this.canvas.height = this.canvas.clientHeight;
    // this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.draw();
  }
  draw() {
    this.context.beginPath();
    this.context.rect(0, 0, this.canvas.width/2, this.canvas.height/2);
    this.context.fillStyle = "blue";
    this.context.fill();
    this.context.beginPath();
    this.context.rect(this.canvas.width/2, this.canvas.height/2, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "blue";
    this.context.fill();
  }
}
