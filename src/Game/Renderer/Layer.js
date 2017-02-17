//@flow

// mock this whole motherfucker for testing

export default class Layer {
  container:HTMLElement;
  canvas:HTMLCanvasElement;
  context:Object;
  constructor(container:HTMLElement){
    this.container = container;
    this.canvas = document.createElement('canvas');
    // FLOWHACK //whats up with this
    this.context = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
  }
  clear(){
    this.context.closePath();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  resetContextStyle() {
    this.context.lineWidth = 1;
    this.context.fillStyle = 'black';
  }
  resize(w:number, h:number){
    this.canvas.width = w;
    this.canvas.height = h;
  }
  drawDemo() {
    this.context.beginPath();
    this.context.rect(0, 0, this.canvas.width/2, this.canvas.height/2);
    this.context.fillStyle = "blue";
    this.context.fill();
    this.context.beginPath();
    this.context.rect(this.canvas.width/2, this.canvas.height/2, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "green";
    this.context.fill();
  }
  drawLine(from:{x:number, y:number}, to:{x:number, y:number}){
    this.context.beginPath();
    this.context.moveTo(from.x, from.y);
    this.context.lineTo(to.x, to.y);
    this.context.stroke();
  }

  setAlpha(alpha:number){
    this.context.globalAlpha = alpha
  }
  getAlpha():number{
    return this.context.globalAlpha
  }

  drawImageRotated(image:any, centerX:number, centerY:number, width:number, height:number, rotation:number){

    layer.context.translate(centerX, centerY)
    layer.context.rotate(rotation);
    layer.context.drawImage(i, 0, 0, i.width, i.height, -width/2, -height/2, width, height);
    layer.context.rotate(-rotation);
    layer.context.translate(-centerX, -centerY)
  }

}
