
State = require 'Game/State'
Imagine = require 'imagine'
gridhelper = require('Game/Grid/Helper').getInstance()
charHelper = require('Game/Character/Helper').getInstance()

class DockingBay
  name: 'dockmanager'
  constructor: ->
  update: ->
    if State #todo: state not available in first frame?
      for key of State.itemData
        data = State.itemData[key]
        if data.type is "dockingbay"
          if data.ship
            if data.waitingFor <=0 #everyone on board!
              data.ship = false
              data.timeTilDock = 4 + (50*Math.random())
              Imagine.notify 'itemStateChanged'
          else
            unless data.timeTilDock
              data.timeTilDock = 1 + (5*Math.random())
            data.timeTilDock -= Imagine.time.deltaTime * State.timeScale
            if data.timeTilDock <=0
              @spawn key

  spawn: (key) ->
    data = State.itemData[key]

    data.ship = true
    block = gridhelper.stringToBlock key

    num = 1 + Math.floor(Math.random()*4)
    for [1..num]
      char = Imagine charHelper.add({block}) #todo: remove imagine?
      char.data.dock = block
    data.waitingFor = num
    Imagine.notify 'itemStateChanged'


module.exports = DockingBay