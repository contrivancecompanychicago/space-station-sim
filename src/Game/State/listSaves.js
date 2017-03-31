// @flow
import {keys} from 'lodash'
import config from 'Game/config'

// import demo1 from './demo1'
// import demo2 from './demo2'
// import demo3 from './demo3'

// import small from './saves/small'
// import large from './saves/large'

// let ctx = require.context('./saves', false, /.js/);
// console.log('context is ', ctx);
// debugger;

export default function listSaves(){

	localStorage['save_livios'] = JSON.stringify(require('./saves/livios'))

	// let keys = ctx.keys();
	// keys.forEach((k) => {
	// 	localStorage[config.save.prefix+k] = JSON.stringify(ctx(k))
	// })

	// localStorage['save_demo3'] = JSON.stringify(demo3)

	return Object.keys(localStorage).filter((k) => {
		return k.indexOf(config.save.prefix) === 0
	}).map((k)=>{
		return k.substr(config.save.prefix.length)
	})
}