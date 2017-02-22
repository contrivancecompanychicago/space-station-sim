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
        this.objects.forEach(o => {
            o.update({deltaTime:this.deltaTime});
        });
    }
    start(){
        requestAnimationFrame(this.update);
    }
}

export default new Engine();