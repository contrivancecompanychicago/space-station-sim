CharHelper = require 'Game/Character/Helper'
charHelper = CharHelper.getInstance()

_ = require 'underscore'

State = require 'Game/State'

mockCharData = {}

describe 'Game/Character/Helper', ->
  it 'should be defined', ->
    expect(CharHelper).toBeDefined()
  it 'should be singleton', ->
    expect CharHelper.getInstance
      .toBeDefined()

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

    it 'should set an ID', ->
      charHelper.add mockCharData
      expect mockCharData.id
        .toBeDefined()

    it 'should throw an error if not given a block', ->
      delete mockCharData.block
      expect -> charHelper.add mockCharData
        .toThrow new Error 'Block not defined'





