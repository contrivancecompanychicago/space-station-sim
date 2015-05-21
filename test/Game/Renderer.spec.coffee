Renderer = require 'Game/Renderer'

Game = require 'Game' #injecting
game = new Game document.createElement 'div'
#Renderer.inject
#  helpers: game.helpers
#  types: game.types


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

