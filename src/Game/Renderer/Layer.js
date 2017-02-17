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

    this.context.translate(centerX, centerY)
    this.context.rotate(rotation);
    this.context.drawImage(image, 
      0, 0, 
      image.width, image.height, 
      -width/2, -height/2, 
      width, height);
    this.context.rotate(-rotation);
    this.context.translate(-centerX, -centerY)
  }

  drawCircle(center:{x:number, y:number}, width:number, strokeStyle:string = 'white'){
    
    this.context.strokeStyle = strokeStyle;
    this.context.beginPath();
    this.context.arc(center.x, center.y, width, 0, Math.PI * 2);
    this.context.stroke();
  }

  /////CONTEXT GETTERS AND SETTERS (for easier test mocking)
  drawImage(){
    this.context.drawImage( ...arguments);
  }
  strokeRect(){
    this.context.strokeRect( ...arguments);
  }
  strokeStyle(style:?string):string{
    if(style) this.context.strokeStyle = style
    return this.context.strokeStyle;
  }
  lineWidth(style:?number):number{
    if(style) this.context.lineWidth = style
    return this.context.lineWidth;
  }
  shadowColor(style:?string):string{
    if(style) this.context.shadowColor = style
    return this.context.shadowColor;
  }
  shadowBlur(style:?number):number{
    if(style!== undefined) this.context.shadowBlur = style
    return this.context.shadowBlur;
  }

}
