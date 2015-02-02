Imagine = require 'bower/imagine/imagine'
Vic = require 'victor'

states = 
	blank: -1
	selecting: 0
	moving: 1
	deselecting: 2



class Input
	# mousePosition: {x:0, y:0}
	fns:
		onmousedown: (e) =>
			engageMouse e
		# onmouseenter: (e) ->
		# 	console.log "onmouseenter"
		# onmouseleave: (e) ->
		# 	console.log "onmouseleave"
		onmousemove: (e) =>
			moveMouse e
		# onmouseout: (e) ->
		# 	console.log "onmouseout"
		# onmouseover: (e) ->
		# 	console.log "onmouseover"
		onmouseup: (e) =>
			disengageMouse e
		onmousewheel: (e) ->
			# console.log e
			startMouse = Vic.fromObject Game.globalToLocal {x: e.x, y: e.y}
			# console.log startMouse
			if e.wheelDelta > 0
				if Game.state.view.scale < Game.state.view._scale.max
					Game.state.view.scale += Game.state.view._scale.step
			else
				if Game.state.view.scale > Game.state.view._scale.min
					Game.state.view.scale -= Game.state.view._scale.step

			# console.log "new scale ", Game.state.view.scale
			endMouse = Vic.fromObject Game.globalToLocal {x: e.x, y: e.y}
			# console.log endMouse
			offset = Vic.fromObject Game.state.view.offset

			diff = endMouse.subtract startMouse
			offset.add diff

			Game.state.view.offset = offset

			
			Imagine.notify 'viewStateChanged'

	startEvent = null

	lastMouse = {x:0, y:0}
	setLastMouse = (e) ->
		lastMouse = 
			x: e.x
			y: e.y

	getMouseDelta = (e)->
		if lastMouse
			x: lastMouse.x - e.x
			y: lastMouse.y - e.y
		else
			{x:0, y:0} #init


	engageMouse = (e) =>
		setLastMouse e
		startEvent = e
		@state = e.button

	disengageMouse = (e) =>
		Game.grid.selection = null

		if (@state is states.selecting) or (@state is states.deselecting)
			sel = calcSelection()
			for x in [sel.l..sel.r]
				for y in [sel.t..sel.b]
					if @state is states.selecting
						Game.grid.addBlock {x, y}
					if @state is states.deselecting
						Game.grid.removeBlock {x, y}
			Imagine.notify 'gridStateChanged'

			
		@state = states.blank
		
		
		

	moveMouse = (e) =>
		# console.log @mousePosition
		# @mousePosition = {x:e.x, y:e.y}
		# console.log @mousePosition
		delta = getMouseDelta e
		switch @state
			when states.selecting
				Game.grid.selection = calcSelection()
				# Imagine.notify 'gridStateChanged'
				Game.grid.requireRender()
			when states.deselecting
				Game.grid.selection = calcSelection()
				# Imagine.notify 'gridStateChanged'
				Game.grid.requireRender()
			when states.moving
				# todo: zoom correct move
				Game.state.view.offset.x -= delta.x
				Game.state.view.offset.y -= delta.y
				Imagine.notify 'viewStateChanged'
		setLastMouse e
	state: states.blank

	calcSelection = ->
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
		for key, val of @fns
			@container[key] = val

	@objectUnderMouse = null
	findObjectUnderMouse: ->
		@objectUnderMouse = null #clear it
		#get mouse position
		# console.log lastMouse
		#search characters
		alpha = Game.character.context.getImageData(lastMouse.x, lastMouse.y, 1, 1).data[3]
		unless alpha
			# def not over anything
			return

		chars = Imagine.getComponents 'character'
		mousePos = Vic.fromObject Game.globalToLocal lastMouse
		chars.forEach (char) =>
			if char.pos.clone().subtract(mousePos).length() < 30
				@objectUnderMouse = char
				return



	update: ->
		@findObjectUnderMouse()
		# switch @state
		# 	when states.moving




module.exports = Input