class Util

  guidbase = new Date().getTime()
  @guid: ->
    '_'+(guidbase++)



module.exports = Util