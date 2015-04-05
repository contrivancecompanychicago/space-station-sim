describe 'Game/UI/ItemSelector', ->
	beforeEach ->
		# @div = document.createElement 'DIV'
		# @Sel = require 'Game/UI/ItemSelector'
		# @sel = new @Sel @div

	afterEach ->
		# Imagine.engine.reset()

	# it 'should be defined', ->
	# 	expect(@Sel).toBeDefined()
	it 'should not throw an error when clicked'#, ->
		# sel = new @Sel(document.createElement('DIV'))
	it 'should use e.currentTarget ', ->
		ev = new MouseEvent(1)
		expect(ev.currentTarget).toBeDefined()
