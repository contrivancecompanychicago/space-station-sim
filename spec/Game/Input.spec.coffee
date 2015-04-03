
describe 'Game/Input', ->
	beforeEach ->
		@Input = require 'Game/Input'
		@div = document.createElement 'DIV'
		@input = new @Input div

	it 'should be defined', ->
		expect(@Input).toBeDefined()

	describe 'constructor', ->
		describe 'adds Function', ->
			it 'onmousedown', ->
				expect(@div.onmousedown).toBeDefined()
			it 'onmousemove', ->
				expect(@div.onmousemove).toBeDefined()
			it 'onmouseup', ->
				expect(@div.onmouseup).toBeDefined()
			it 'onmousewheel', ->
				expect(@div.onmousewheel).toBeDefined()

	describe 'getLastMouse', ->
		it 'should be defined', ->
			expect(@Input.getLastMouse).toBeDefined()
		describe 'returns', ->
			beforeEach ->
				@out = @Input.getLastMouse()
			it 'an object with x', ->
				expect(@out.x).toBeDefined()
			it 'an object with y', ->
				expect(@out.y).toBeDefined()
	describe 'setLastMouse', ->
		it 'should be defined', ->
			expect(@Input.setLastMouse).toBeDefined()
		it 'should take chrome style events', ->
			@Input.setLastMouse {x: 123, y:456}
			expect(@Input.getLastMouse().x).toBe 123
			expect(@Input.getLastMouse().y).toBe 456
		it 'should take firefox style events', ->
			@Input.setLastMouse {clientX: 456, clientY:789}
			expect(@Input.getLastMouse().x).toBe 456
			expect(@Input.getLastMouse().y).toBe 789
	describe 'getMouseDelta', ->
		it 'should be defined', ->
			expect(@Input.getMouseDelta).toBeDefined()
	describe 'engageMouse', ->
		it 'should be defined', ->
			expect(@Input.engageMouse).toBeDefined()
	describe 'disengageMouse', ->
		it 'should be defined', ->
			expect(@Input.disengageMouse).toBeDefined()
	describe 'moveMouse', ->
		it 'should be defined', ->
			expect(@Input.moveMouse).toBeDefined()
	describe 'calcSelection', ->
		it 'should be defined', ->
			expect(@Input.calcSelection).toBeDefined()
