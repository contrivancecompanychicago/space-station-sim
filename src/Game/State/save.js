//@flow

import state from 'Game/state';
import {keys} from 'lodash';
import config from 'Game/config';

import fs from 'fs';
import path from 'path';

export default function save(savename:string){

	let out = {
		grid: state.grid.save(),
		object: state.object.save(),
		character: state.character.save(),
		item: state.item.save(),
		order: state.order.save()
	}

	localStorage[config.save.prefix+savename] = JSON.stringify(out)

	// NOTE fs is false for web due to webpack externals setup
	if(fs){
		// let path = require('path')
		// let filename = path.join(__dirname, config.save.prefix+savename+'.js')
		let filename = 'saves/'+savename+'.js'
		console.log('wrote', filename);
		// console.log(__dirname, config.save, filename)
		fs.writeFileSync(
			filename,
			JSON.stringify(out)
			);
	}

}