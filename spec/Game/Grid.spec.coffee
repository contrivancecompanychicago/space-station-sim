Character = require 'Game/Character'

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
	describe 'constructor', ->
		it 'should inject into character', ->
			spyOn Character, 'inject'
			new @Grid @canvas
			expect Character.inject
			.toHaveBeenCalled()