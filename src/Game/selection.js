// @flow

import type {Selection} from 'Game/Type/Selection'
import Rect from 'Game/Rect'

export default function selection(start:Object, end:Object, button:number):Selection{
	return {
		start: start,
		end: end,
		button: button,
		// rect: new Rect({
		//   t: Math.min(end.y, start.y),
		//   r: Math.max(end.x, start.x),
		//   b: Math.max(end.y, start.y),
		//   l: Math.min(end.x, start.x),
		// })
		rect: new Rect(start, end)
	}
}
