$ = require 'jquery-browserify'
_ = require 'underscore'
Imagine = require '../../bower_components/imagine/imagine.js'
Grid = require '../grid.coffee'

view = _.template('<div class="block" />');

class GridBlock
	width: 32
	height: 32

	constructor: (@x, @y, @container) ->
		# console.log @x, @y
		@$el = $ view()
		# console.log @$el
		console.log $(@container).append @$el
		@element = Imagine @$el[0]
		@element.move @x*@width, @y*@height



module.exports = GridBlock