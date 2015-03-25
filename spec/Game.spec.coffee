describe 'Game', ->
	it 'should have tests', ->
		expect(1).toBe 1
	it 'should exist', ->
		expect(window.Game).toBeDefined()

	it 'should have globalToLocal', ->
		expect(window.Game.globalToLocal).toBeDefined()

	it 'should have localToGlobal', ->
		expect(window.Game.localToGlobal).toBeDefined()
