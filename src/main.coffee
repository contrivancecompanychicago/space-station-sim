imagine = require '../bower_components/imagine/imagine.js'
Game = require './game.coffee'

window.onload = ->
	window.game = imagine new Game document.getElementById 'container'


