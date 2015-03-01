gulp = require 'gulp'

browserify = require 'browserify'
source = require 'vinyl-source-stream'

coffeeify = require 'coffeeify'
templatify = require 'browserify-underscore-templatify'
imgify = require './imgify.coffee'

remapify = require 'remapify'

path = require 'path'

t2 = require 'through2'

livereload = require 'gulp-livereload'

cacheify = require 'cacheify'
levelup = require 'levelup'
dbCoffee = levelup '', {db: require 'memdown' }
dbTempl = levelup '', {db: require 'memdown' }
dbImg = levelup '', {db: require 'memdown' }
cacheCoffee = cacheify coffeeify, dbCoffee
cacheTempl = cacheify templatify(), dbTempl
cacheImg = cacheify imgify(), dbImg

gulp.task 'js', ['bower'], ->
	opts = 
		entries: [ './src/main.coffee' ]
		debug: true
		extensions: ['.js', '.coffee', '.html', '.png'] # needed for remapify
		aliases: [
			{
				src: '**/*.coffee'
				cwd: path.join process.cwd(), 'src'
			}
			{
				src: '**/*.js'
				expose: 'bower'
				cwd: path.join process.cwd(), 'bower_components'
			}
		]

	bundler = browserify opts

	bundler.plugin remapify, opts.aliases

	bundler.transform cacheCoffee
	bundler.transform cacheTempl
	bundler.transform imgify()

	t = new Date()

	bundler.bundle()
		.on 'file', (file) ->
			process.stdout.write '.'# reporter
			# console.log file, new Date() - t
			# t = new Date()
		.pipe(source('bundle.js'))
		.pipe gulp.dest('./dist/')
		.pipe livereload()
