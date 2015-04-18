
Character = require 'Game/Character'

describe 'Game/Character', ->
#  beforeEach ->
#    @char = new Character()
  it 'should be defined', ->
    expect Character
      .toBeDefined()
'