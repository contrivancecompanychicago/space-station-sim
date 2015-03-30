gameClass = require 'Game'
div = document.createElement 'DIV'
game = new gameClass(div)

describe 'Game', ->

	beforeEach ->
		gameClass = require 'Game'
		div = document.createElement 'DIV'
		game = new gameClass(div)
	afterEach ->
		game.destroy()


	

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

	it 'should expose instance after being instantiated', (cb)->
		g = new gameClass(div)
		expect(gameClass.instance).toBe(g)
		cb()

	describe 'destroy', ->
		it 'should be defined', ->
			g = new gameClass(div)
			expect(g.destroy).toBeDefined()
			# console.log g.destroy
			expect(typeof g.destroy).toBe 'function'
		it 'should clear the div', ->
			g = new gameClass(div)
			g.destroy()
			expect(div.innerHTML).toBe ''
		it 'should clear its instance variable', ->
			g = new gameClass(div)
			g.destroy()
			expect(gameClass.instance).toBeUndefined()


		it 'should *arrogantly* kill everything in imagine', ->
			g = new gameClass(div)
			g.destroy()
			imagine = require 'imagine'
			expect(imagine.objects.length).toBe 0


		

	# it 'should have a long test', (cb)->
	# 	# window.requestAnimationFrame(cb)
	# 	setTimeout ->
	# 		cb()
	# 	, 2000
	# # 	cb()

