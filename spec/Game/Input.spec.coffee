
describe 'Game/Input', ->
	beforeEach ->
		@Input = require 'Game/Input'

	it 'should be defined', ->
		expect(@Input).toBeDefined()

	describe 'constructor', ->
		describe 'adds Function', ->
			beforeEach ->
				@div = document.createElement 'DIV'
				@input = new @Input div
			it 'onmousedown', ->
				expect(div.onmousedown).toBeDefined()
			it 'onmousemove', ->
				expect(div.onmousemove).toBeDefined()
			it 'onmouseup', ->
				expect(div.onmouseup).toBeDefined()
			it 'onmousewheel', ->
				expect(div.onmousewheel).toBeDefined()

