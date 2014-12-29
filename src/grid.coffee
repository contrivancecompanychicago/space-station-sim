$ = require 'jquery-browserify'
Block = require './grid/block.coffee'

class Grid

	constructor: (@width, @height, @container)->

	start: ->
		@generate()


	generate: ->
		unless @blocks
			@blocks = []
		for w in [1..@width]
			for h in [1..@height]
				@blocks.push new Block(w, h, @container)


module.exports = Grid