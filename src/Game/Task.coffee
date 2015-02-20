master = require 

class Task
	constructor: (@type, @block, @params) ->

	register: ->
		master.addTask this

	# types
	BLOCK: 'block'
	ITEM: 'item'



module.exports = Task
