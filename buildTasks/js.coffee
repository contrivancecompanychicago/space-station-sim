gulp = require 'gulp'

_ = require 'lodash'
browserify = require 'browserify'
source = require 'vinyl-source-stream'
coffeeify = require 'coffeeify'
templatify = require 'browserify-underscore-templatify'
imgify = require 'browserify-imgify'
rename = require 'gulp-rename'
path = require 'path'
buffer = require 'vinyl-buffer'
sourcemaps = require 'gulp-sourcemaps'
livereload = require 'gulp-livereload'

t2 = require 'through2'



cacheify = require 'cacheify'
levelup = require 'levelup'
dbCoffee = levelup '', {db: require 'memdown' }
dbTempl = levelup '', {db: require 'memdown' }
dbImg = levelup '', {db: require 'memdown' }
cacheCoffee = cacheify coffeeify, dbCoffee
cacheTempl = cacheify templatify, dbTempl
cacheImg = cacheify imgify, dbImg

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


configureBundler = (bundler) ->
	externals =
		'imagine': './bower_components/imagine/imagine.js'
	_.extend externals, mapFiles "./src/"
	for name of externals
		bundler.require externals[name], expose: name
	bundler.require 'underscore'


gulp.task 'js', ['browserify'],  ->
	# this extra step because browserify piping directly to dest breaks karma
	gulp.src './dist/output.js'
		.pipe rename 'bundle.js'
		.pipe gulp.dest './dist/'
		.pipe livereload()

gulp.task 'browserify', ['bower'], ->

	bundler = browserify
		debug: true
		extensions: ['.js', '.coffee', '.html', '.png'] # needed for remapify

	bundler.transform cacheCoffee
	bundler.transform cacheTempl
	bundler.transform imgify
	configureBundler bundler

	bundler.bundle()
		.on 'file', (file) ->
			process.stdout.write '.'# reporter
			# console.log file, new Date() - t
			# t = new Date()
		.pipe(source('output.js'))

		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
#		.pipe(uglify())
#		.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))

		.pipe gulp.dest('./dist/')
		# .pipe touch '.bundled'


module.exports = configureBundler