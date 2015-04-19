Character = require 'Game/Character'

describe 'Game/Character', ->
#  beforeEach ->
#    @char = new Character()
  it 'should be defined', ->
    expect Character
      .toBeDefined()

  describe 'constructor', ->
    it 'should throw an error if not given data', ->
      expect -> new Character()
        .toThrow new Error 'Character data is not defined'
    it 'should throw an error if not given a block', ->
      expect -> new Character({})
        .toThrow new Error 'block is not defined'


  describe 'data', ->


  describe 'getBlockPosition', ->
    it 'should throw an error if passed undefined', ->
      char = new Character({block:{x:1,y:2}})
      expect -> char.getBlockPosition()
        .toThrow new Error 'Block is undefined'
