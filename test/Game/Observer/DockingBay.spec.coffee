DockingBay = require 'Game/Observer/DockingBay'
dockingBay = new DockingBay()
describe 'Game/Observer/DockingBay', ->
  it 'should be defined', ->
    expect DockingBay
      .toBeDefined()
  it 'should have a name', ->
    expect dockingBay.name
      .toBeDefined()

  describe 'spawn', ->
    it 'should be defined', ->
      expect dockingBay.spawn
        .toBeDefined()


