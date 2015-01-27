imagine = require 'bower\\imagine\\imagine'
Game = require './Game.coffee'
# $ = require 'jquery-browserify'
# images = require './images.coffee'

require 'Game\\config'

window.onload = ->
	window.game = imagine new Game document.getElementById 'container'

	fps = document.getElementById 'fps'
	fps = imagine fps
	fps.addComponent new imagine.FPS()





