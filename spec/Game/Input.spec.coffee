
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

	describe 'lastMouse', ->
		it 'should be defined', ->
			expect(@Input.lastMouse).toBeDefined()
	describe 'setLastMouse', ->
		it 'should be defined', ->
			expect(@Input.setLastMouse).toBeDefined()
		it 'should take chrome style events', ->
			@Input.setLastMouse {x: 123, y:456}
			expect(@Input.lastMouse.x).toBe 123
			expect(@Input.lastMouse.y).toBe 456
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

