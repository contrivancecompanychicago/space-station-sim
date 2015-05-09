BlockSelector = require 'Game/UI/BlockSelector'
div = document.createElement 'div'
describe 'Game/UI/BlockSelector', ->


#  it 'should spaz when instantiated', ->
#    expect -> new BlockSelector div
#      .toThrow()
  it 'should be sweet after dep inject', ->
    # todo: inject
    types = require 'Game/Grid/Block/Types'
    BlockSelector.inject
      types: types

    new BlockSelector div

