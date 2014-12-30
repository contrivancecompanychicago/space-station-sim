React = require 'react'
gamedata = require '../gamedata.coffee'

module.exports = React.createClass
	render: ->
		console.log @props
		style = 
			left: @props.x * gamedata.grid.block.width
			top: @props.y * gamedata.grid.block.height
		<div className="block" style={style} />