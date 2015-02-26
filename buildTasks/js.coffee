gulp = require 'gulp'

browserify = require 'browserify'
source = require 'vinyl-source-stream'

coffeeify = require 'coffeeify'

templatify = require 'browserify-underscore-templatify'

_ = require 'underscore'


path = require 'path'

gulp.task 'js', ->
	opts = 
		entries: [ './src/main.coffee' ]
		debug: true

	aliases = [
			{
				cwd: 'src'
				# base: 'Game'
			}
			{
				cwd: 'bower_components'
				base: 'bower'
			}
		]

	aliasMap = {}
	aliases.forEach (alias) ->
		console.log path.join process.cwd(), alias.cwd


	opts.builtins  = _.defaults require('browserify/lib/builtins'), aliasMap

	bundler = browserify opts
	bundler.transform coffeeify
	bundler.transform templatify()
	# bundler.transform imgify()


	bundler.bundle()
		.pipe(source('bundle.js'))
		.pipe gulp.dest('./dist/')