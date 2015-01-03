states = 
	blank: -1
	selecting: 0
	moving: 1
	deselecting: 2



class Input
	fns:
		onmousedown: (e) =>
			engageMouse e
			# console.log e
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


	engageMouse = (e) =>
		setLastMouse e
		# console.log e
		# if e.button is 1
		# 	state = states.moving
		startEvent = e
		@state = e.button

	disengageMouse = (e) =>
		# console.log @
		if @state is states.selecting
			sel = calcSelection()
			# console.log sel
			for x in [sel.l..sel.r]
				for y in [sel.t..sel.b]
					# pos = Game.grid.blockAtPoint e
					Game.grid.addBlock 'wall', {x, y}

			# Game.render()
		Game.grid.selection = null
		Game.grid.requireRender()
		@state = states.blank

	moveMouse = (e) =>
		# console.log @state
		delta = getMouseDelta e
		# console.log delta

		switch @state
			when states.selecting
				# console.log @
				Game.grid.selection = calcSelection()
				Game.render()
			when states.moving
				# console.log startEvent
				# console.log delta
				Game.state.view.offset.x -= delta.x
				Game.state.view.offset.y -= delta.y
				Game.render()

		setLastMouse e

	state: states.blank

	calcSelection = ->
		# console.log startEvent, lastMouse
		pt1 = Game.grid.blockAtPoint startEvent
		pt2 = Game.grid.blockAtPoint lastMouse
		selection = {}
		if pt1.x > pt2.x
			selection.l = pt2.x
			selection.r = pt1.x
		else
			selection.l = pt1.x
			selection.r = pt2.x

		if pt1.y > pt2.y
			selection.t = pt2.y
			selection.b = pt1.y
		else
			selection.t = pt1.y
			selection.b = pt2.y
		selection

	constructor: (@container) ->
		# console.log "input"
		# console.log @fns
		for key, val of @fns
			# console.log 
			@container[key] = val


	update: ->

		# switch @state
		# 	when states.moving




module.exports = Input