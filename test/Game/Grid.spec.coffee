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

	it 'should have helper', ->
		expect @grid.helper
			.toBeDefined()
	describe 'getHelpers', ->
		it 'should be defined', ->
			expect @grid.getHelpers
				.toBeDefined()
#		it 'should return an object with item', ->
#			expect @grid.getHelpers().item
#			.toBeDefined()

	describe 'getTypes', ->
		it 'should return an object with block', ->
			expect @grid.getTypes().block
			.toBeDefined()
		it 'should return an object with item', ->
			expect @grid.getTypes().item
			.toBeDefined()
		it 'should return an object with room', ->
			expect @grid.getTypes().room
			.toBeDefined()