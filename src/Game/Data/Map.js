// @flow
// export default class Map<K, V> {
//   store: { [k:K]: V };
//   keys:Array<K>
//   constructor(store: { [k:K]: V }) { 
//       this.store = store;
//       this.keys = Object.keys(store)
//     }
//   get(k: K): ?V { return this.store[k]; }
//   each(func:Function){
//     this.keys.forEach((key, index) => {
//         let value = this.get(key);
        
//     })
//   }
// }

// declare var readOnlyMapOfB: ReadOnlyMap<string, B>;
// // ok: B is a subtype of A, and V is a covariant type param.
// var readOnlyMapOfA: ReadOnlyMap<string, A> = readOnlyMapOfB;


//https://flowtype.org/docs/classes.html

export default class DataMap<K, V> {

    store: { [k:K]: V };
    keys: Array<K>;

    constructor() { 
        this.keys = []
        this.store = {};
    }

    get(k: K): V { 
        // assume store[K] is always set
        return this.store[k]; 
    }

    put(k: K, v: V): void { 
        this.store[k] = v;
        this.keys.push(k);//dont bother checking duplicates
        // this only to be used for hardcoded data
    }

    each(func:(key:K, value:V, index:number) => void){
        this.keys.forEach((key, index) => {
            let value = this.get(key);
            func(key, value, index);
        })
    }

}


// // @flow
// function caller(func:(a:number) => void){
//     var a:number = 123;
//     func(a);
// }
// function callee(a:number){

// }
// caller(callee); // should throw a flow error 
// // because function signatures dont match
