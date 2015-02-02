

class Helper
	blockAtPoint: (point)->
		# console.log "looking up block"
		point = Game.globalToLocal point
		# x: Math.floor (point.x - Game.state.view.offset.x) / (gbw * Game.state.view.scale)
		# y: Math.floor (point.y - Game.state.view.offset.y) / (gbh * Game.state.view.scale)
		x: Math.floor point.x / gbw
		y: Math.floor point.y / gbh

	blockToString: (pos) ->
		'g'+pos.x+'_'+pos.y
	stringToBlock: (str) ->
		ar = str.substr(1).split '_'
		out = {x: parseInt(ar[0]), y: parseInt(ar[1])}
		# debugger
		out 