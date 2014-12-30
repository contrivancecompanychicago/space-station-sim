React = require 'react'
Block = require './block.cjsx.js'

module.exports = React.createClass
	render: ->
		blocks = []
		console.log @props
		for w in [1..@props.width]
			for h in [1..@props.height]
				console.log "yolo"
				block = <Block x={w} y={h} />
				blocks.push block
		# 			<Block />
		<div className="grid">
			{blocks}
		</div>

# data = {obj:test}
# React.render(
# 		<Game mydata={data} />,
# 		document.getElementById 'content'
# 		)
