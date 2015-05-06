State = require 'Game/State'
stateHelper = require('Game/State/Helper').getInstance()
stateHelper.newGame()

describe 'Game/State', ->
  it 'should be defined', ->
    expect State
      .toBeDefined()
  it 'should have characterData defined', ->
    expect State.characterData
      .toBeDefined()


