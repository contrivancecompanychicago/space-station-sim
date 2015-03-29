game = require 'Game'

describe 'Game', ->

	it 'should have tests', ->
		expect(1).toBe 1
	it 'should exist', ->
		expect(game).toBeDefined()

	it 'should have globalToLocal', ->
		expect(game.globalToLocal).toBeDefined()

	it 'should have localToGlobal', ->
		expect(game.localToGlobal).toBeDefined()

	it 'should have a long test', (cb)->
		# window.requestAnimationFrame(cb)
		setTimeout ->
			cb()
		, 2000
	# 	cb()

