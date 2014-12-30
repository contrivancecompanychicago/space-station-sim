$ = require 'jquery-browserify'
Block = require './block.coffee'
React = require 'react'

view = require './grid.html.js'
gamedata = require '../gamedata.coffee'
GridView = require './grid.cjsx.js'
class Grid
	name: 'grid'

	blockDown: null
	blockMouseDown: (block)->
		blockDown = block


	constructor: (@width, @height, @container)->
		# @el = $(view())[0]
		# $(@container).append @el

	start: ->
		# @generate()

		@game = React.render(React.createElement(GridView, gamedata.grid), @container);
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