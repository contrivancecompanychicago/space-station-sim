imagine = require 'imagine'
Game = require 'Game'
require 'Game/config'

window.onload = ->
	window.game = imagine new Game document.getElementById 'container'
#	fps = document.getElementById 'fps'
#	fps = imagine fps
#	fps.addComponent new imagine.FPS()
