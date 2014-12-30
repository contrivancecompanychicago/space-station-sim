$ = require 'jquery-browserify'
Block = require './block.coffee'

view = require './grid.html.js'

class Grid
	name: 'grid'

	blockDown: null
	blockMouseDown: (block)->
		console.log block


	constructor: (@width, @height, @container)->
		@el = $(view())[0]
		$(@container).append @el

	start: ->
		@generate()



	generate: ->
		unless @blocks
			@blocks = []
		for w in [1..@width]
			for h in [1..@height]
				@blocks.push new Block(w, h, @el)


module.exports = Grid