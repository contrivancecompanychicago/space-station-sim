Game = require 'Game'
new Game document.createElement 'div'
CharHelper = require 'Game/Character/Helper'

charHelper = new CharHelper()
Character = require 'Game/Character'
_ = require 'underscore'

Imagine = require 'imagine'

State = require 'Game/State'

stateHelper = require('Game/State/Helper').getInstance()

mockCharData = {}

describe 'Game/Character/Helper', ->
  beforeEach ->
    stateHelper.newGame()
  afterEach ->
    Imagine.engine.reset()
  it 'should be defined', ->
    expect(CharHelper).toBeDefined()

  describe 'constructor', ->
    it 'should inject into character', ->
      spyOn Character, 'inject'
      new CharHelper()
      expect Character.inject
        .toHaveBeenCalled()

  describe 'add', ->
    beforeEach ->
      mockCharData =
        block: {x: 1, y: 2}


    it 'should be defined', ->
      expect charHelper.add
        .toBeDefined()
    it 'should add something to state.characterData', ->
      datalen = _.keys(State.characterData).length
      charHelper.add mockCharData

      expect _.keys(State.characterData).length
        .toBe datalen + 1

    it 'should return a Character object', ->
      char = charHelper.add mockCharData
      expect typeof char
        .toBe 'object'
      expect char.name
        .toBe 'character'

    describe 'needs', ->
      beforeEach ->
        charHelper.add mockCharData

      it 'should set needs', ->
        expect mockCharData.needs
        .toBeDefined()
      it 'should set fun', ->
        expect mockCharData.needs.fun
        .toBeDefined()
      it 'should set shop', ->
        expect mockCharData.needs.shop
        .toBeDefined()

    it 'should set an ID', ->
      charHelper.add mockCharData
      expect mockCharData.id
        .toBeDefined()

    it 'should throw an error if not given a block', ->
      delete mockCharData.block
      expect -> charHelper.add mockCharData
        .toThrow new Error 'Block not defined'



  describe 'init', ->
    it 'should be defined', ->
      expect charHelper.init
        .toBeDefined()

    it 'should call character constructor for each item in characterData', ->
      len = Imagine.objects.length
      charHelper.init test: {block: {x: 1, y: 2}}
      expect Imagine.objects.length
        .toBe len + 1
#      expect Character.prototype.constructor
#        .toHaveBeenCalled()


