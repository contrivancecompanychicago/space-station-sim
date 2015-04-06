Imagine = require 'imagine'




describe 'Game/UI/ItemSelector', ->
	beforeEach ->
		@div = document.createElement 'DIV'
		@Sel = require 'Game/UI/ItemSelector'
		@sel = new @Sel @div
		@State = require 'Game/State'

	afterEach ->
		# Imagine.engine.reset()

	it 'should set Game State', ->
		buttons = $(@div).find 'button'
		for i in [0...buttons.length]
			$(buttons[i]).trigger 'click'
			expect(@State.ui.item).toBe buttons[i].value

	it 'should use e.currentTarget ', ->
		ev = new MouseEvent(1)
		expect(ev.currentTarget).toBeDefined()