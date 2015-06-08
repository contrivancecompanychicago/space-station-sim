Imagine = require 'imagine'
State = require 'Game/State'


class TaskHelper extends require 'Singleton'

	name: 'taskmaster'
#	init: ->
#		State.taskData.forEach (task) ->
#			new Task task
	addTask: (task) ->
		# add to list
		State.taskData.push task
	findTaskForCharacter: (character) ->
		# get character location
		
	getTasks: ->
		State.taskData



	removeTask: (task) ->
		

	removeTasksFromBlock: (block) ->
		
module.exports = TaskHelper