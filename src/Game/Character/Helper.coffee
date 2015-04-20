Util  = require 'Game/Util'
State = require 'Game/State'
Character = require 'Game/Character'
Imagine = require 'imagine'

class Helper extends require 'Singleton'
  add: (data) ->
    unless data.block
      throw new Error 'Block not defined'

    unless data.needs
      @makeNeeds data

    data.id = Util.guid()
    State.characterData[data.id] = data

    Imagine new Character data

  # takes optional chardata basically for testing
  init: (charsData)->
    unless charsData
      charsData = State.characterData

    for id of charsData
      data = charsData[id]
      Imagine new Character data


  makeNeeds: (data) ->
    data.needs =
      # energy: Math.random()
      fun: Math.random()
      # hunger: Math.random()
      shop: Math.random()
      medical: Math.random()
      repair: Math.random()


module.exports = Helper