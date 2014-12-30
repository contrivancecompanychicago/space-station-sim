Imagine = require '../bower_components/imagine/imagine.js'
$ = require 'jquery-browserify'

Grid = require './grid/grid.coffee'

gamedata = require './gamedata.coffee'


class Game
	name: "spacesim"
	constructor: (container)->
		Game.container = container
		Imagine new Grid gamedata.grid.width, gamedata.grid.height, container





module.exports = Game