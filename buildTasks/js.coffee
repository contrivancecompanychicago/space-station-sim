gulp = require 'gulp'

browserify = require 'browserify'
source = require 'vinyl-source-stream'

coffeeify = require 'coffeeify'
templatify = require 'browserify-underscore-templatify'
imgify = require './imgify.coffee'

remapify = require 'remapify'

path = require 'path'

t2 = require 'through2'

gulp.task 'js', ->
	opts = 
		entries: [ './src/test.coffee' ]
		debug: true
		extensions: ['.js', '.coffee', '.html', '.png'] # needed for remapify

	bundler = browserify opts

	bundler.plugin remapify, [
		{
			src: '**/*.coffee'
			# expose: 'testing'
			cwd: path.join process.cwd(), 'src'
			# filter: console.log
		}
	]

	# bundler.transform (file) ->
	# 	console.log "transformer reading", file
	# 	t2 (data, enc, cb) ->
	# 		# console.log String data
	# 		@push data
	# 		cb()

	bundler.transform coffeeify
	bundler.transform templatify()
	bundler.transform imgify()

	bundler.bundle()
		# .on('error', (err) ->
		# 	console.log err
		# 	this.emit 'end'
		# )
		# .on 'file', console.log
		.pipe(source('bundle.js'))
		.pipe gulp.dest('./dist/')
