CharHelper = require 'Game/Character/Helper'
charHelper = CharHelper.getInstance()

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
      mockCharData = {}
    it 'should be defined', ->
      expect charHelper.add
        .toBeDefined()
    it 'should add something to state.characterData', ->
      datalen = State.characterData.length
      charHelper.add mockCharData

      expect State.characterData.length
        .toBe datalen + 1

    it 'should throw an error if not given a block', ->





