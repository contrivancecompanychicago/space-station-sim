$ = require 'jquery-browserify'
_ = require 'underscore'
Imagine = require '../../bower_components/imagine/imagine.js'

# view = _.template('<div class="block" />');
# view = require './blockTemplate.js'
view = require './block.html.js'
# console.log test()

gamedata = require '../gamedata.coffee'

class GridBlock
	width: gamedata.grid.block.width
	height: gamedata.grid.block.height

	constructor: (@x, @y, @container) ->
		# console.log @x, @y
		grid = Imagine.getComponent 'grid'
		# console.log grid
		@$el = $ view()
		# console.log @$el
		$(@container).append @$el
		@element = Imagine @$el[0]
		@element.setPosition @x*@width, @y*@height

		@$el.mousedown =>
			$(@).addClass 'grid_block_plain'
			# console.log grid
			grid.blockMouseDown @



module.exports = GridBlock