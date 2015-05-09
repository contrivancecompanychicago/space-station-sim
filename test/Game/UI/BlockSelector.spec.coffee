BlockSelector = require 'Game/UI/BlockSelector'
fdescribe 'Game/UI/BlockSelector', ->


  it 'should spaz when instantiated', ->
    expect -> new BlockSelector()
      .toThrow()
  it 'should be sweet after dep inject', ->
    # todo: inject
    new BlockSelector()

