// @flow
import config from 'Game/config';
import time from 'Game/time';

import type Character from 'Game/Type/Character';
import type Block from 'Game/Block'

export default function* moveToBlockCenter(char:Character, block:Block):Generator<*,*,*>{

	let target = block.center;

	while((char.position.x != target.x) || (char.position.y != target.y)){

		let amount = time.deltaTime * config.character.speed;
		
		let dir = Math.atan2(target.y - char.position.y, target.x - char.position.x);
		
		let deg = 180/Math.PI*dir

		//right is 0
		//down is 90
		//up is -90
		// left is 180

		switch(deg){
			case 0: char.setFacing(0);break;
			case 90: char.setFacing(1);break;
			case -90: char.setFacing(2);break;
			case 180: char.setFacing(3);break;
		}
		

		let distsq = Math.pow(target.y - char.position.y, 2)+Math.pow(target.x - char.position.x, 2)
		let amountsq = Math.pow(amount, 2)
		if(amountsq > distsq){
			//we're there
			char.position.x = target.x
			char.position.y = target.y
		}else{
			char.position.x += Math.cos(dir)*amount;
			char.position.y += Math.sin(dir)*amount;
		}

		//drag items behind
		char.getItems().forEach((item) => {
			item.position.x -= (item.position.x - char.position.x) /6
			item.position.y -= (item.position.y - char.position.y) /6
		})

		yield;
	}

}
