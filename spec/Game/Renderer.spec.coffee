Renderer = require 'Game/Renderer'
renderer = Renderer.getInstance()

describe 'Game/Renderer', ->

  it 'should have globalToLocal', ->
    expect(renderer.globalToLocal).toBeDefined()

  it 'should have localToGlobal', ->
    expect(renderer.localToGlobal).toBeDefined()