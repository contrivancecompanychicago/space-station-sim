Util = require 'Game/Util'


describe 'Game/Util', ->
  it 'shuld be defiend', ->
    expect Util
      .toBeDefined()

  describe 'guid', ->
    it 'should be defined', ->
      expect Util.guid
        .toBeDefined()
    it 'should return something', ->
      expect Util.guid()
        .toBeDefined()
    it 'should return something different each time', ->
      id1 = Util.guid()
      id2 = Util.guid()
      expect id1
        .not.toBe id2
    it 'should return a string', ->
      expect typeof Util.guid()
        .toBe 'string'
  describe 'global/local', ->
    it 'should have globalToLocal', ->
      expect(Util.globalToLocal).toBeDefined()

    it 'should have localToGlobal', ->
      expect(Util.localToGlobal).toBeDefined()