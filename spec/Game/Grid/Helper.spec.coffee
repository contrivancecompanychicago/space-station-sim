GridHelper = require 'Game/Grid/Helper'


describe 'Game/Grid/Helper', ->
  it 'should be singleton', ->
    expect(GridHelper.getInstance).toBeDefined()
    console.log GridHelper

