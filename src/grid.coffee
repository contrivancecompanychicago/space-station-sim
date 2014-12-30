$ = require 'jquery-browserify'
Block = require './grid/block.coffee'

view = require './grid.html.js'

class Grid

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