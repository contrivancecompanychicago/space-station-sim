NameGenerator = require './NameGenerator/NameGenerator.coffee'
first = require './NameGenerator/firstname_set.coffee'
last = require './NameGenerator/lastname_set.coffee'

gen = new NameGenerator()
gen.setList 'first', first
gen.setList 'last', last

# console.log first

module.exports = ->
	f = gen.generate 'first'
	l = gen.generate 'last'
	f + ' ' + l