Util  = require 'Game/Util'
State = require 'Game/State'
Character = require 'Game/Character'
Imagine = require 'imagine'

class Helper extends require 'Singleton'
  add: (data) ->
    unless data.block
      throw new Error 'Block not defined'

    data.id = Util.guid()
    State.characterData[data.id] = data

    new Character data

  init: ->
#		State.characterData.visitor.forEach (data) ->
#    console.log State.characterData
#    for id of State.characterData
#      data = State.characterData[id]
#			Imagine new Character({data})


module.exports = Helper