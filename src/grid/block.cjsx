React = require 'react'
gamedata = require '../gamedata.coffee'

module.exports = React.createClass
	render: ->
		# console.log @props
		# cx = React.addons.classSet
		# classes = cx({
		# 	block: true
		# 	selected: @props.selected
		# 	})
		# classname = 'block'
		classes = ['block']
		if @props.selected
			classes.push 'selected'
		classes = classes.join ' '
		style = 
			left: @props.x * gamedata.grid.block.width
			top: @props.y * gamedata.grid.block.height
		<div 
			onMouseDown={ (e) => @props.fns.onMouseDown @, e } 
			onMouseUp={ (e) => @props.fns.onMouseUp @, e } 
			onMouseOver={ (e) => @props.fns.onMouseOver @, e } 
			className={classes} 
			style={style} />