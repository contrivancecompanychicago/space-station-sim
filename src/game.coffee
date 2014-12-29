Imagine = require '../bower_components/imagine/imagine.js'
$ = require 'jquery-browserify'

Grid = require './grid.coffee'

gamedata = require './gamedata.coffee'


class Game
	name: "spacesim"
	constructor: (container)->
		Game.container = container
		Imagine new Grid 10, 10, container





module.exports = Game