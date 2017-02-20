// @flow

class Engine{
    updateId: number;
    lastTime: number;
    deltaTime: number;
    objects: Array<Object>;
    constructor(){
        this.lastTime = new Date().getTime();
        this.objects = []
        requestAnimationFrame(this.update);
    }
    update() {
        let dt = new Date().getTime();
        this.deltaTime = (dt - this.lastTime) / 1000;
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
}

export default new Engine();