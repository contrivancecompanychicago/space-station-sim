// @flow

import time from 'Game/time'

export class Engine{
	updateId: number;
	lastTime: number;
	deltaTime: number;
	objects: Array<Object>;
	constructor(){
		// FLOWHACK
		this.update = this.update.bind(this)
		this.objects = []
	}
	update() {
		let dt = new Date().getTime();
		this.deltaTime = (dt - this.lastTime) / 1000;
		// time.deltaTime = this.deltaTime //HACK
		this.lastTime = dt;
		this.updateId = requestAnimationFrame(this.update.bind(this));
		this.updateObjects();
	}
	register(obj:Object){
		this.objects.push(obj);
	}
	fastForward(deltaTime:number){ //for testing
		this.deltaTime = deltaTime/1000;
		this.updateObjects();
	}
	updateObjects(){
		//COMMENTED CODE IS FOR OPTIONAL TIMING BENCHMARKING USES
		// let times = {}
		this.objects.forEach(o => {
			// let start = new Date().getTime();
			o.update({deltaTime:this.deltaTime});
			// times[o.constructor.name] = new Date().getTime() - start;
		});
		// console.log(times);
		
	}
	start(){
		if(!this.updateId){
			this.lastTime = new Date().getTime();
			// this.updateId = requestAnimationFrame(this.update);
			this.update();
		}
	}

	stop(){
		cancelAnimationFrame(this.updateId)
	}
}

export default new Engine();