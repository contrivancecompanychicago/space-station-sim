# master = require 

class Task
	constructor: (@type, @block, @params) ->

	register: ->
		# find depends
		#make depends
		# master.addTask this

	# Depends

	# types
	BLOCK: 'block'
	ITEM: 'item'



module.exports = Task
