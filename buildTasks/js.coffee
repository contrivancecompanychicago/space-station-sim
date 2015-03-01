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

	bundler.transform (file) -> # reporter
		process.stdout.write '.'
		t2()

	bundler.transform cacheCoffee
	bundler.transform cacheTempl
	bundler.transform cacheImg

	bundler.bundle()
		# .on 'package', -> console.log "package"
		# .on 'bundle', -> console.log "bundle"
		# .on 'reset', -> console.log "reset"
		# .on 'transform', -> console.log "x"
		# .on('error', (err) ->
		# 	console.log err
		# 	this.emit 'end'
		# )
		# .on 'file', console.log
		.pipe(source('bundle.js'))
		.pipe gulp.dest('./dist/')
		.pipe livereload()
