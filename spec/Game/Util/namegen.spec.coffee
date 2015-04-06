namegen = require 'Game/Util/namegen'
describe 'Game/Util/namegen', ->
	beforeEach ->

	it 'shuld be defined', ->
		expect(namegen).toBeDefined()
	it 'should output an array with 2 params', ->
		out = namegen()
		expect(typeof out).toBe 'object'
		expect(out.length).toBe 2

	for [1..2]
		it 'should have strings', ->
			out = namegen()
			expect(typeof out[0]).toBe 'string'
			expect(typeof out[1]).toBe 'string'
			expect(out[0].length).toBeGreaterThan 1
			expect(out[0].length).toBeLessThan 12
			expect(out[1].length).toBeGreaterThan 1
			expect(out[1].length).toBeLessThan 12

