Character = require 'Game/Character'

describe 'Game/Character', ->
#  beforeEach ->
#    @char = new Character()
  it 'should be defined', ->
    expect Character
      .toBeDefined()


  describe 'data', ->

  describe 'getBlockPosition', ->
    it 'should throw an error if passed undefined', ->
      char = new Character()
      expect -> char.getBlockPosition()
        .toThrow new Error 'Block is undefined'