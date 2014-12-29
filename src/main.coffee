Game = require './game.coffee'

window.onload = ->
	window.game = new Game document.getElementById 'container'


