$ = require 'jquery-browserify'
_ = require 'underscore'
Imagine = require '../../bower_components/imagine/imagine.js'
Grid = require '../grid.coffee'

# view = _.template('<div class="block" />');
# view = require './blockTemplate.js'
view = require './block.html.js'
# console.log test()

class GridBlock
	width: 32
	height: 32

	constructor: (@x, @y, @container) ->
		# console.log @x, @y
		@$el = $ view()
		# console.log @$el
		$(@container).append @$el
		@element = Imagine @$el[0]
		@element.move @x*@width, @y*@height

		@$el.click ->
			console.log "yesy"
			$(@).addClass 'grid_block_plain'



module.exports = GridBlock