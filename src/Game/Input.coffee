class Input
	fns:
		onmousedown: (e) ->
			console.log e
		# onmouseenter: (e) ->
		# 	console.log "onmouseenter"
		# onmouseleave: (e) ->
		# 	console.log "onmouseleave"
		# onmousemove: (e) ->
		# 	console.log "onmousemove"
		# onmouseout: (e) ->
		# 	console.log "onmouseout"
		# onmouseover: (e) ->
		# 	console.log "onmouseover"
		# onmouseup: (e) ->
		# 	console.log "onmouseup"
		# onmousewheel: (e) ->
		# 	console.log "onmousewheel"


	constructor: (@container) ->
		console.log "input"
		console.log @fns
		for key, val of @fns
			# console.log 
			@container[key] = val


	# fns: 
	# 	onMouseDown: (block, e) =>
	# 		# console.log selectionStart
	# 		selectionStart = 
	# 			x: block.props.x
	# 			y: block.props.y
	# 		selectionType = e.button
			
	# 		if selectionType is 1 #middle mouse
	# 			selectionStart = null
	# 		else
	# 			@calcSelection()
	# 	onMouseUp: (block, e) =>
	# 		selectionStart = null
	# 		@processSelection()
	# 	onMouseOver: (block, e) =>
	# 		blockOver = 
	# 			x: block.props.x
	# 			y: block.props.y
	# 		@calcSelection()


module.exports = Input