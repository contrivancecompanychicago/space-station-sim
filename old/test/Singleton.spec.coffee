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
			expect(HelperA.getInstance().constructor.name).toBe("HelperA")
		it 'should not alter base', ->
			expect(Singleton.getInstance().myfunc).toBeUndefined()
			ins = new Singleton()
			new HelperA()
			expect(ins.constructor.name).toBe Singleton.getInstance().constructor.name

	describe 'constructor', ->
		describe '@instance', ->
			it 'should set', ->
				delete Singleton.instance
				new Singleton()
				expect Singleton.instance
					.toBeDefined()
			it 'should set on descendants', ->
				delete Singleton.instance
				delete HelperA.instance
				new HelperA()
				expect HelperA.instance
					.toBeDefined()
				expect Singleton.instance
					.not.toBeDefined()


