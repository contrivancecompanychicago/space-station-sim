
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

	describe 'setLastMouse', ->
		it 'should be defined', ->
			expect(@input.setLastMouse).toBeDefined()

