Renderer = require 'Game/Grid/Block/Renderer'
renderer = new Renderer()

describe 'Game/Grid/Block/Renderer', ->
  it 'should be defined', ->
    expect typeof Renderer
      .toBe 'function'

  describe 'render', ->
    it 'should be defined', ->
      expect renderer.render
        .toBeDefined