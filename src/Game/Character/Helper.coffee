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

  # takes optional chardata basically for testing
  init: (charsData)->
    unless charsData
      charsData = State.characterData

#		State.characterData.visitor.forEach (data) ->
    for id of charsData
#      console.log charsData, id
      data = charsData[id]
      Imagine new Character data


module.exports = Helper