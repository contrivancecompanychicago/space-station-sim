$ = require 'jquery-browserify'
_ = require 'underscore'
Imagine = require '../../bower_components/imagine/imagine.js'
Grid = require '../grid.coffee'

view = _.template('<div class="block" />');

class GridBlock

	constructor: (@x, @y, @container) ->
		# console.log @x, @y
		@$el = $ view()
		# console.log @$el
		console.log $(@container).append @$el
		@element = Imagine @$el[0]
		@element.move @x, @y



module.exports = GridBlock