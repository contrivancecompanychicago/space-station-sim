
describe 'Game/Input', ->
	beforeEach ->
		@Input = require 'Game/Input'
		@div = document.createElement 'DIV'
		spyOn @div, "addEventListener"
		@input = new @Input @div

	it 'should be defined', ->
		expect(@Input).toBeDefined()

	describe 'constructor', ->
		describe 'event listeners', ->
			beforeEach ->
				@eventArgs = @div.addEventListener.calls.allArgs()
			it 'should call addEventListener', ->
				expect(@div.addEventListener).toHaveBeenCalled()
			it 'should add mousemove', ->
				arg = @eventArgs.filter (a) -> a[0] is 'mousemove'
				expect(arg.length).toBe(1);
			it 'should add mouseup', ->
				arg = @eventArgs.filter (a) -> a[0] is 'mouseup'
				expect(arg.length).toBe(1);
			it 'should add mousedown', ->
				arg = @eventArgs.filter (a) -> a[0] is 'mousedown'
				expect(arg.length).toBe(1);
			it 'should add mousewheel', ->
				arg = @eventArgs.filter (a) -> a[0] is 'mousewheel'
				expect(arg.length).toBe(1);
				

		# describe 'adds Function', ->
		# 	it 'onmousedown', ->
		# 		expect(@div.onmousedown).toBeDefined()
		# 	it 'onmousemove', ->
		# 		expect(@div.onmousemove).toBeDefined()
		# 	it 'onmouseup', ->
		# 		expect(@div.onmouseup).toBeDefined()
		# 	it 'onmousewheel', ->
		# 		console.log 'todo: firefox mousewheel'
		# 		if navigator.userAgent.indexOf('Firefox') is -1
		# 			expect(@div.onmousewheel).toBeDefined()

	describe 'getLastMouse', ->
		it 'should be defined', ->
			expect(@Input.getLastMouse).toBeDefined()
		describe 'returns', ->
			beforeEach ->
				@out = @Input.getLastMouse()
			it 'an object with x', ->
				expect(@out.x).toBeDefined()
			it 'an object with y', ->
				expect(@out.y).toBeDefined()
	describe 'setLastMouse', ->
		it 'should be defined', ->
			expect(@Input.setLastMouse).toBeDefined()
		it 'should take chrome style events', ->
			@Input.setLastMouse {x: 123, y:456}
			expect(@Input.getLastMouse().x).toBe 123
			expect(@Input.getLastMouse().y).toBe 456
		it 'should take firefox style events', ->
			@Input.setLastMouse {clientX: 456, clientY:789}
			expect(@Input.getLastMouse().x).toBe 456
			expect(@Input.getLastMouse().y).toBe 789
	describe 'getMouseDelta', ->
		it 'should be defined', ->
			expect(@Input.getMouseDelta).toBeDefined()
	describe 'engageMouse', ->
		it 'should be defined', ->
			expect(@Input.engageMouse).toBeDefined()
	describe 'disengageMouse', ->
		it 'should be defined', ->
			expect(@Input.disengageMouse).toBeDefined()
	describe 'moveMouse', ->
		it 'should be defined', ->
			expect(@Input.moveMouse).toBeDefined()
	describe 'calcSelection', ->
		it 'should be defined', ->
			expect(@Input.calcSelection).toBeDefined()
