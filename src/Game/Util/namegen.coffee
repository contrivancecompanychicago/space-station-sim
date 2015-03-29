NameGenerator = require 'Game/Util/NameGenerator/NameGenerator'
first = require 'Game/Util/NameGenerator/firstname_set'
last = require 'Game/Util/NameGenerator/lastname_set'

gen = new NameGenerator()
gen.setList 'first', first
gen.setList 'last', last

# console.log first

module.exports = ->
	[
		gen.generate 'first'
		gen.generate 'last'
	]
