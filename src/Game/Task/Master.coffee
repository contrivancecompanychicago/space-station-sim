Imagine = require 'bower/imagine/imagine.js'

class TaskMaster

	name: 'taskmaster'
	addTask: (task) ->
		# add to list
		Game.state.taskData.push task
	findTaskForCharacter: (character) ->


	removeTask: (task) ->

	removeTasksFromBlock: (block) ->
		
module.exports = Imagine new TaskMaster()