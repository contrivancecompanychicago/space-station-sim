imagine = require '../bower_components/imagine/imagine.js'
Game = require './Game.coffee'
# $ = require 'jquery-browserify'
# images = require './images.coffee'

window.onload = ->
	window.game = imagine new Game document.getElementById 'container'

	fps = document.getElementById 'fps'
	fps = imagine fps
	fps.addComponent new imagine.FPS()





