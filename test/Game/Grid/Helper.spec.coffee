GridHelper = require 'Game/Grid/Helper'
gridHelper = GridHelper.getInstance()


point = {x: 1, y: 2}

describe 'Game/Grid/Helper', ->
  it 'should be singleton', ->
    expect(GridHelper.getInstance).toBeDefined()
  describe 'blockAtPoint', ->
    it 'should be defined', ->
      expect gridHelper.blockAtPoint
        .toBeDefined()
    it 'should return a x/y object', ->
      result = gridHelper.blockAtPoint(point)
      expect result.x
        .toBeDefined()
      expect result.y
        .toBeDefined()
  describe 'blockToString', ->
    it 'should be defined', ->
      expect gridHelper.blockToString
        .toBeDefined()
    it 'should return a string', ->
      expect typeof gridHelper.blockToString(point)
        .toBe 'string'

  describe 'stringToBlock', ->
    it 'should be defined', ->
      expect gridHelper.stringToBlock
        .toBeDefined()
    it 'should return a point', ->
      result = gridHelper.stringToBlock('g1_2')
      expect result.x
        .toBeDefined()
      expect result.y
        .toBeDefined()
  describe 'addBlock', ->
    it 'should not error', ->
      gridHelper.addBlock {x:1, y:2}

  describe 'removeBlock', ->
    it 'should not error', ->
      gridHelper.removeBlock {x:1, y:2}

#  describe 'adjacentBlocks', ->
#    it 'should not error', ->
#      gridHelper.adjacentBlocks {x:1, y:2}

  describe 'randomBlock', ->
    it 'should not error', ->
      gridHelper.randomBlock()

