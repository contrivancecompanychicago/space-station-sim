describe 'spectest', ->
	it 'should define spectest', ->
		expect(spectest).toBeDefined()
	it 'should have myfunc', ->
		expect(new spectest().myfunc).toBeDefined()
	it 'should have myfunc return a string', ->
		expect(new spectest().myfunc()).toBe("abc")