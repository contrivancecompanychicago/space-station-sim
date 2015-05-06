

test = require 'spectest'
_ = require 'underscore'

describe 'spectest', ->
  it 'should work', ->
    expect 1
      .toBe 1
  it 'should have name', ->
    expect test.name
      .toBeDefined()
    expect test.name
      .toBe "abc"
  it 'should bring in libraries', ->
    expect _
      .toBeDefined()

  it 'should bring in exposed requires', ->
    conf = require 'Game/config'
    expect conf
      .toBeDefined()

