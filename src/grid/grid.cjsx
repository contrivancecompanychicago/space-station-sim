React = require 'react'
Block = require './block.cjsx.js'
gamedata = require '../gamedata.coffee'
module.exports = React.createClass
	render: ->
		blocks = []
		# console.log @props
		for w in [1..gamedata.grid.width]
			for h in [1..gamedata.grid.height]
				# @props.onMouseDown()
				selected = false
				if @state?.selection
					s = @state.selection
					if (s.l<=w) and (s.r>=w) and (s.t<=h) and (s.b>=h)
						selected = true
				mapdata = ''
				if @state?.mapdata?[w]?[h]
					mapdata = @state.mapdata[w][h]

				block = <Block fns={@props.fns} 
					mapdata={mapdata}
					selected={selected}
					key={w+"-"+h} 
					x={w} y={h} />

				blocks.push block

		<div className="grid">
			{blocks}
		</div>

# data = {obj:test}
# React.render(
# 		<Game mydata={data} />,
# 		document.getElementById 'content'
# 		)
