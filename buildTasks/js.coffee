gulp = require 'gulp'

browserify = require 'browserify'
source = require 'vinyl-source-stream'

coffeeify = require 'coffeeify'

templatify = require 'browserify-underscore-templatify'

_ = require 'underscore'

glob = require 'glob'

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
		dir = path.join process.cwd(), alias.cwd
		['**/*.coffee', '**/*.js'].forEach (pattern) ->
			pattern = path.join dir, pattern
			glob.sync(pattern).forEach (file)->
				alias = path.relative dir, file
				alias = alias.substr 0, alias.length - path.extname(alias).length
				alias = alias.replace /\\+/g, '/'
				file = path.normalize file
				aliasMap[alias] = file


	opts.builtins  = _.defaults require('browserify/lib/builtins'), aliasMap

	bundler = browserify opts
	bundler.transform coffeeify
	bundler.transform templatify()
	# bundler.transform imgify()


	bundler.bundle()
		.pipe(source('bundle.js'))
		.pipe gulp.dest('./dist/')