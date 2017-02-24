// @flow

import time from 'Game/time'

class Engine{
    updateId: number;
    lastTime: number;
    deltaTime: number;
    objects: Array<Object>;
    constructor(){
        // FLOWHACK
        this.update = this.update.bind(this)
        this.lastTime = new Date().getTime();
        this.objects = []
    }
    update() {
        let dt = new Date().getTime();
        this.deltaTime = (dt - this.lastTime) / 1000;
        time.deltaTime = this.deltaTime //HACK
        this.lastTime = dt;
        requestAnimationFrame(this.update.bind(this));
        this.updateObjects();
    }
    register(obj:Object){
        this.objects.push(obj);
    }
    updateObjects(){
        // let times = {}
        this.objects.forEach(o => {
            // console.log(o.constructor.name)
            // debugger;
            // let start = new Date().getTime();
            o.update({deltaTime:this.deltaTime});
            // times[o.constructor.name] = new Date().getTime() - start;
        });
        // console.log(times);
        
    }
    start(){
        requestAnimationFrame(this.update);
    }
}

export default new Engine();