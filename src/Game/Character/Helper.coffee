Util  = require 'Game/Util'
State = require 'Game/State'
Character = require 'Game/Character'
class Helper extends require 'Singleton'
  add: (data) ->
    unless data.block
      throw new Error 'Block not defined'

    data.id = Util.guid()
    State.characterData[data.id] = data

    new Character data


module.exports = Helper