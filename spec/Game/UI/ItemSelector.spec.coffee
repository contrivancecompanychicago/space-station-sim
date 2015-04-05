Imagine = require 'imagine'


#move somewhere better
eventFire = (el, etype) ->
	if el.fireEvent
		el.fireEvent('on' + etype)
	else
		evObj = document.createEvent('Events')
		evObj.initEvent(etype, true, false)
		el.dispatchEvent(evObj)


describe 'Game/UI/ItemSelector', ->
	beforeEach ->
		@div = document.createElement 'DIV'
		@Sel = require 'Game/UI/ItemSelector'
		@sel = new @Sel @div
		@State = require 'Game/State'

	afterEach ->
		# Imagine.engine.reset()

	it 'should set Game State'#, ->
		# buttons = $(@div).find 'button'
		# for i in [0...buttons.length]
		# 	eventFire buttons[i], 'mousedown'
		# 	eventFire buttons[i], 'mouseup'
		# 	expect(@State.ui.item).toBe buttons[i].value

	it 'should use e.currentTarget ', ->
		ev = new MouseEvent(1)
		expect(ev.currentTarget).toBeDefined()