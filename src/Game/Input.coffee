Imagine = require 'imagine'
Vic = require 'victor'
gridhelper = require 'Game/Grid/Helper'

config = require 'Game/config'

State = require 'Game/State'


# singleton whatever
class Input
	# mousePosition: {x:0, y:0}
	@states: 
		blank: -1
		selecting: 0
		moving: 1
		deselecting: 2

	state: @states.blank

	constructor: (@container) ->
		Input.instance = @
		Imagine.addEvent @container, 'mousemove', @fns.onmousemove
		Imagine.addEvent @container, 'mouseup', @fns.onmouseup
		Imagine.addEvent @container, 'mousedown', @fns.onmousedown
		Imagine.addEvent @container, 'mousewheel', @fns.onmousewheel
		Imagine.addEvent @container, 'DOMMouseScroll', @fns.onmousewheel

	fns:
		onmousedown: (e) =>
			@engageMouse e
		onmousemove: (e) =>
			@moveMouse e
		onmouseup: (e) =>
			@disengageMouse e
		onmousewheel: (e) ->
			startMouse = Vic.fromObject Game.globalToLocal {x: e.x, y: e.y}
			# console.log startMouse
			if e.wheelDelta
				d =  e.wheelDelta
			else
				d = -e.detail

			if d > 0
				if State.view.scale < config.view.scale.max
					State.view.scale += config.view.scale.step
			else
				if State.view.scale > config.view.scale.min
					State.view.scale -= config.view.scale.step

			# console.log "new scale ", State.view.scale
			endMouse = Vic.fromObject Game.globalToLocal {x: e.x, y: e.y}
			# console.log endMouse
			offset = Vic.fromObject State.view.offset

			diff = endMouse.subtract startMouse
			offset.add diff

			State.view.offset = offset

			
			Imagine.notify 'viewStateChanged'

	startEvent = null

	lastMouse = {x:0, y:0}
	@setLastMouse: (e) ->
		lastMouse = @mouseEventPosition e

	@getLastMouse: -> lastMouse

	@getMouseDelta: (e)->
		e = @mouseEventPosition e
		if lastMouse
			x: lastMouse.x - e.x
			y: lastMouse.y - e.y
		else
			{x:0, y:0} #init


	@engageMouse: (e) ->
		@setLastMouse e
		startEvent = e
		@state = e.button

	@disengageMouse: (e) =>
		Game.grid.selection = null

		if (@state is @states.selecting) or (@state is @states.deselecting)
			sel = @calcSelection()
			for x in [sel.l..sel.r]
				for y in [sel.t..sel.b]
					if @state is @states.selecting
						gridhelper.addBlock {x, y}
					if @state is @states.deselecting
						gridhelper.removeBlock {x, y}
			Imagine.notify 'gridStateChanged'

			
		@state = @states.blank
		
		
	@mouseEventPosition: (e) ->
		x: e.x or e.clientX
		y: e.y or e.clientY

	@moveMouse: (e) =>
		delta = @getMouseDelta e
		switch @state
			when @states.selecting
				Game.grid.selection = @calcSelection()
				# Imagine.notify 'gridStateChanged'
				Game.grid.requireRender()
			when @states.deselecting
				Game.grid.selection = @calcSelection()
				# Imagine.notify 'gridStateChanged'
				Game.grid.requireRender()
			when @states.moving
				# todo: zoom correct move
				State.view.offset.x -= delta.x / State.view.scale
				State.view.offset.y -= delta.y / State.view.scale
				Imagine.notify 'viewStateChanged'
		@setLastMouse e

	

	@calcSelection: ->
		pt1 = gridhelper.blockAtPoint @mouseEventPosition startEvent
		pt2 = gridhelper.blockAtPoint lastMouse
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

	@objectUnderMouse = null
	findObjectUnderMouse: ->
		@objectUnderMouse = null #clear it
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



module.exports = Input