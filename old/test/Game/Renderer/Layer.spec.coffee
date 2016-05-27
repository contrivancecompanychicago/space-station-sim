Layer = require 'Game/Renderer/Layer'
div = null
layer = null

describe 'Game/Renderer/Layer', ->
  it 'should be defined', ->
    expect Layer
      .toBeDefined()

  describe 'constructor', ->
    beforeEach ->
      div = document.createElement 'div'
      layer = new Layer div

    it 'should add a canvas to its container', ->
      expect div.innerHTML
        .not.toBe ''

    it 'should set container', ->
      expect layer.container
        .toBe div
    it 'should set canvas', ->
      expect layer.canvas
        .toBeDefined()