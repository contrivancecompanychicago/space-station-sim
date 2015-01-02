states = 
	blank: undefined
	selecting: 0
	moving: 1
	deselecting: 2



class Input
	fns:
		onmousedown: (e) =>
			engageMouse e
		# onmouseenter: (e) ->
		# 	console.log "onmouseenter"
		# onmouseleave: (e) ->
		# 	console.log "onmouseleave"
		onmousemove: (e) =>
			# console.log "onmousemove"
			moveMouse e
		# onmouseout: (e) ->
		# 	console.log "onmouseout"
		# onmouseover: (e) ->
		# 	console.log "onmouseover"
		onmouseup: (e) =>
			disengageMouse e
		# onmousewheel: (e) ->
		# 	console.log "onmousewheel"

	startEvent = null

	lastMouse = null
	setLastMouse = (e) ->
		lastMouse = 
			x: e.x
			y: e.y

	getMouseDelta = (e)->
		# console.log lastMouse.x, e.x
		if lastMouse
			x: lastMouse.x - e.x
			y: lastMouse.y - e.y
		else
			{x:0, y:0} #init


	engageMouse = (e) ->
		setLastMouse e
		console.log e
		# if e.button is 1
		# 	state = states.moving
		startEvent = e
		@state = e.button

	disengageMouse = (e) ->
		@state = states.blank

	moveMouse = (e) ->
		# console.log @state
		delta = getMouseDelta e
		console.log delta
		setLastMouse e

	state: states.blank

	constructor: (@container) ->
		console.log "input"
		console.log @fns
		for key, val of @fns
			# console.log 
			@container[key] = val


	update: ->

		# switch @state
		# 	when states.moving



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