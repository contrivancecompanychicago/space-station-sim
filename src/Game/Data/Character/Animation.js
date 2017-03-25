
// @flow

type Image = {src:string}


//global framerate todo make per character
let frameRoller = 0;
setInterval(() => {frameRoller++}, 100)

export default class Animation{
	frames: Array<Image>
	frame: number;
	constructor(frames:Array<any>){
		this.frames = frames;
		this.frame = 0;
	}
	// nextFrame(){
	// 	this.frame++
	// 	if(this.frame >= this.frames.length){
	// 		this.frame = 0;
	// 	}
	// }
	currentImage():Image{
		let f = frameRoller % this.frames.length;
		return this.frames[f]
	}

}