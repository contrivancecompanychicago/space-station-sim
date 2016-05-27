CharHelper = require('Game/Character/Helper')
Game = require 'Game'
game = new Game document.createElement 'div' # injects
charHelper = new CharHelper()
Character = require 'Game/Character'
Imagine = require 'imagine'
_ = require 'underscore'

State = require 'Game/State'

mockCharData = {block:{x:1,y:2}}

describe 'Game/Character', ->

#  it 'should require a character/type component on its object'

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
      char = new Character(mockCharData)
      expect -> char.getBlockPosition()
        .toThrow new Error 'Block is undefined'


  describe 'remove', ->
    it 'should be defined', ->
      expect new Character(mockCharData).remove
        .toBeDefined()
    it 'should call Imagine.destroy on the object', ->
      char = charHelper.add mockCharData
      spyOn Imagine, 'destroy'
      char.remove()
      expect Imagine.destroy
      .toHaveBeenCalled()
    it 'should remove the object from state.characterdata', ->
      char = charHelper.add mockCharData
      len = _.keys(State.characterData).length
      id = char.data.id
      expect State.characterData[id]
      .toBeDefined()
      char.remove()
      expect State.characterData[id]
      .toBe undefined
      expect _.keys(State.characterData).length
      .toBe len - 1