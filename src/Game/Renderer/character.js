//@flow


import type {State} from 'Game/state'
import type Layer from 'Game/Renderer/Layer'

import type Character from 'Game/Type/Character'

import CharData from 'Game/Data/Character';

// let i:any = require('../Data/Character/char1.png')

export default function renderCharacter(state:State, layer:Layer) {
	state.character.getChars().forEach((char) => {
		renderSingleCharacter(char, state, layer);
	});
}

export function renderSingleCharacter(char:Character, state:State, layer:Layer){
		
		const o = char.position.screen
		let type = CharData.get(char.type);

		
		let animType;
		if(char.movedThisFrame){
			animType = type.walk
		}else{
			animType = type.stand
		}
		let anim;

		switch(char.getFacing()){
			case 0: anim = animType.right; break;
			case 1: anim = animType.down; break;
			case 2: anim = animType.up; break;
			case 3: anim = animType.left; break;
		}
		

		// FLOWHACK fix image flow
		let i = type.image;

		if(anim) i = anim.currentImage();

		let w = 32*state.view.state.scale
		let h = 32*state.view.state.scale
		let x = o.x - w/2;
		let y = o.y - h//2;
		if(state.ui.state.selected.indexOf(char) >-1){
			// 	//hack clean this up it goes somewhere else im sure
			layer.shadowColor('yellow')
			layer.shadowBlur(10);
		}
		layer.drawImage(i, 0, 0, i.width, i.height, x, y, w, h)
		layer.shadowBlur(0);

}