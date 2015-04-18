gulp = require 'gulp'

browserify = require 'browserify'
source = require 'vinyl-source-stream'

coffeeify = require 'coffeeify'
templatify = require 'browserify-underscore-templatify'
imgify = require './imgify.coffee'

remapify = require 'remapify'
aliasify = require 'aliasify'
rename = require 'gulp-rename'
path = require 'path'

t2 = require 'through2'

_ = require 'lodash'

livereload = require 'gulp-livereload'

cacheify = require 'cacheify'
levelup = require 'levelup'
dbCoffee = levelup '', {db: require 'memdown' }
dbTempl = levelup '', {db: require 'memdown' }
dbImg = levelup '', {db: require 'memdown' }
cacheCoffee = cacheify coffeeify, dbCoffee
cacheTempl = cacheify templatify(), dbTempl
cacheImg = cacheify imgify(), dbImg

# touch = require 'gulp-touch'

mapFiles = (base, prefix) ->
	out = {}
	files = require('glob').sync "#{base}**/*.coffee"
	files.forEach (file)->
		alias = file.substr base.length
		alias = alias.substr 0, alias.length - path.extname(file).length
		if prefix then alias = prefix + alias
		out[alias] = file
	out

gulp.task 'js', ['browserify'],  ->
	# this extra step because browserify piping directly to dest breaks karma
	gulp.src './dist/output.js'
		.pipe rename 'bundle.js'
		.pipe gulp.dest './dist/'
		.pipe livereload()

gulp.task 'browserify', ['bower'], ->
	opts = 
		# entries: [ './src/Game.coffee' ]
		debug: true
		extensions: ['.js', '.coffee', '.html', '.png'] # needed for remapify

	bundler = browserify opts

	bundler.transform cacheCoffee
	bundler.transform cacheTempl
	bundler.transform imgify()

	externals =
		'imagine': './bower_components/imagine/imagine.js'
	_.extend externals, mapFiles "./src/"

	for name of externals
		bundler.require externals[name], expose: name

	bundler.require 'underscore'

	t = new Date()

	bundler.bundle()
		.on 'file', (file) ->
			process.stdout.write '.'# reporter
			# console.log file, new Date() - t
			# t = new Date()
		.pipe(source('output.js'))
		.pipe gulp.dest('./dist/')
		# .pipe touch '.bundled'
