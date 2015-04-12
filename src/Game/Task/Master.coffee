Imagine = require 'imagine'
State = require 'Game/State'


class TaskMaster extends require 'Singleton'

	name: 'taskmaster'
	addTask: (task) ->
		# add to list
		Game.state.taskData.push task
	findTaskForCharacter: (character) ->
		# get character location
		
	getTasks: ->
		State.taskData



	removeTask: (task) ->

	removeTasksFromBlock: (block) ->
		
module.exports = TaskMaster