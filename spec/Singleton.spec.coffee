Singleton = require 'Singleton'
class HelperA extends Singleton
	myfunc: ->
describe 'Singleton', ->
	it 'should be defined', ->
		expect(Singleton).toBeDefined()

	describe 'getInstance', ->
		it 'should be defined', ->
			expect(Singleton.getInstance).toBeDefined()
		it 'should return an instance of itself', ->
			ins = new Singleton()
			expect(ins.constructor.name).toBe Singleton.getInstance().constructor.name

	describe 'extending', ->
		it 'should be done properly', ->
			expect(HelperA.getInstance().myfunc).toBeDefined()
		it 'should not alter base', ->
			expect(Singleton.getInstance().myfunc).toBeUndefined()
