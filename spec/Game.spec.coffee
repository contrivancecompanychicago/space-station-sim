gameClass = require 'Game'

describe 'Game', ->

	div = document.createElement 'DIV'

	it 'should have tests', ->
		expect(1).toBe 1
	it 'should exist', ->
		expect(gameClass).toBeDefined()

	it 'should have globalToLocal', ->
		expect(gameClass.globalToLocal).toBeDefined()

	it 'should have localToGlobal', ->
		expect(gameClass.localToGlobal).toBeDefined()

	it 'should throw an error if instantiated without a container', ->
		expect(-> new gameClass()).toThrow new Error 'Game container not defined'

	it 'should expose instance after being instantiated', ->
		

	# it 'should have a long test', (cb)->
	# 	# window.requestAnimationFrame(cb)
	# 	setTimeout ->
	# 		cb()
	# 	, 2000
	# # 	cb()

