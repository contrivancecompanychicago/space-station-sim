gameClass = require 'Game'
div = document.createElement 'DIV'
game = new gameClass(div)

config = require 'Game/config'

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

	describe 'makeCanvas', ->
		it 'should be defined', ->
			expect(game.makeCanvas).toBeDefined()
		it 'should return a canvas', ->
			expect(game.makeCanvas().tagName.toLowerCase()).toBe 'canvas'
		it 'should take a style object', ->
			canvas = game.makeCanvas()
			expect(canvas.style).toBeDefined()
			expect(canvas.width).toBe(config.canvas.width)
			expect(canvas.style.border).toBe(config.canvas.style.border)


	describe 'createUI', ->
		it 'should append a ui div'
		

	describe 'state', ->
		it 'should not be called from window.Game'#, ->
			# expect(gameClass.state()).toThrow new Error 'Dont use Game.state'
			# spyOn gameClass, 'state'
			# g = new gameClass(div)
			# expect(gameClass.state).not.toHaveBeenCalled()


	# it 'should have a long test', (cb)->
	# 	# window.requestAnimationFrame(cb)
	# 	setTimeout ->
	# 		cb()
	# 	, 2000
	# # 	cb()

