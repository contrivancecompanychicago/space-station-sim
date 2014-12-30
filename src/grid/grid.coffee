$ = require 'jquery-browserify'
Block = require './block.coffee'
React = require 'react'

view = require './grid.html.js'
gamedata = require '../gamedata.coffee'
GridView = require './grid.cjsx.js'
class Grid
	name: 'grid'

	selectionStart = null
	blockOver = null

	state = 
		selection: null

	blocks = {}
	constructor: (@width, @height, @container)->

	calcSelection: ->
		if selectionStart
			state.selection = {}
			if selectionStart.x > blockOver.x
				state.selection.l = blockOver.x
				state.selection.r = selectionStart.x
			else
				state.selection.l = selectionStart.x
				state.selection.r = blockOver.x

			if selectionStart.y > blockOver.y
				state.selection.t = blockOver.y
				state.selection.b = selectionStart.y
			else
				state.selection.t = selectionStart.y
				state.selection.b = blockOver.y

			# console.log state.selection
			@react.setState state
	start: ->

		props =
			fns: 
				onMouseDown: (block, e) =>
					# console.log selectionStart
					selectionStart = 
						x: block.props.x
						y: block.props.y
					# blockOver = selectionStart
					@calcSelection()
				onMouseUp: (block, e) =>
					selectionStart = null
				onMouseOver: (block, e) =>
					blockOver = 
						x: block.props.x
						y: block.props.y
					@calcSelection()



		@react = React.render(React.createElement(GridView, props), @container);

	# update: ->
	# 	coms = Imagine.getComponents 'person'
	# 	data = coms.map (com) -> com.data
	# 	@game.setState

	# generate: ->
	# 	unless @blocks
	# 		@blocks = []
	# 	for w in [1..@width]
	# 		for h in [1..@height]
	# 			@blocks.push new Block(w, h, @el)


module.exports = Grid