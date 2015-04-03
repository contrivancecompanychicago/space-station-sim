describe 'Game/Grid', ->
	beforeEach ->
		@Grid = require 'Game/Grid'
		@canvas = document.createElement 'canvas'
		@grid = new @Grid @canvas

	it 'should be defined', ->
		expect(@Grid).toBeDefined()
	# describe 'calcSelection', -> #oops?
	# 	it 'should be defined', ->
	# 		expect(@grid.calcSelection).toBeDefined()