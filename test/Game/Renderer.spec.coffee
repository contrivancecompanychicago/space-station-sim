Renderer = require 'Game/Renderer'
renderer = null
div = null

describe 'Game/Renderer', ->
  beforeEach ->
    div = document.createElement 'div'
    renderer = new Renderer div
  it 'should be defined', ->
    expect Renderer
      .toBeDefined()

  describe 'constructor', ->
    it 'should make a gridlayer', ->
      expect renderer.gridLayer.constructor.name
        .toBe 'Layer'

