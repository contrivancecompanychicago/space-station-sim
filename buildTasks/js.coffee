gulp = require 'gulp'

browserify = require 'browserify'
source = require 'vinyl-source-stream'

coffeeify = require 'coffeeify'
templatify = require 'browserify-underscore-templatify'
imgify = require './imgify.coffee'

remapify = require 'remapify'

_ = require 'underscore'
glob = require 'glob'
path = require 'path'

t2 = require 'through2'

gulp.task 'js', ->
	opts = 
		entries: [ './src/test.coffee' ]
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
		{ cwd, base, file } = alias
		dir = path.join process.cwd(), cwd
		['**/*.coffee', '**/*.js'].forEach (pattern) ->
			pattern = path.join dir, pattern
			glob.sync(pattern).forEach (file)->
				alias = path.relative dir, file
				alias = path.join base, alias if base
				alias = './' + alias.substr 0, alias.length - path.extname(alias).length
				alias = alias.replace /\\+/g, '/'
				# file = path.normalize file
				aliasMap[alias] = file

	# console.log aliasMap
	opts.commondir = true
	opts.builtins  = _.defaults require('browserify/lib/builtins'), aliasMap

	# console.log opts

	bundler = browserify opts

	bundler.transform (file) ->
		console.log "transformer reading", file
		t2 (data, enc, cb) ->
			console.log String data
			@push data
			cb()

	bundler.transform coffeeify
	bundler.transform templatify()
	# bundler.transform imgify()


	bundler.bundle()
		.on('error', (err) ->
			console.log err
			this.emit 'end'
		)
		.on 'file', console.log
		.pipe(source('bundle.js'))
		.pipe gulp.dest('./dist/')
