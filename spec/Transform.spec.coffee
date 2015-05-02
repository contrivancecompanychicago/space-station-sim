Transform = require 'Transform'
transform = new Transform()
describe 'transform', ->
  it 'shuoold be named transform', ->
    expect transform.name
      .toBe 'transform'
  describe 'x', ->
    it 'should be defined', ->
#      console.log('yolo')