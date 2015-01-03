imagine = require '../bower_components/imagine/imagine.js'
Game = require './Game.coffee'
# $ = require 'jquery-browserify'
# images = require './images.coffee'

window.onload = ->
	window.game = imagine new Game document.getElementById 'container'
	# console.log imagine
	# console.log document
	# console.log document.getElementById
	fps = document.getElementById 'fps'
	fps = imagine fps
	fps.addComponent new imagine.FPS()
		# .addComponent new imagine.FPS()

	# console.log images['grid/block/plain.png']
	# $('body').append images['grid/block/plain.png']




