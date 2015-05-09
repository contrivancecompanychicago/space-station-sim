_ = require 'underscore'
bower = require 'gulp-bower'
browserify = require 'browserify'
concat = require 'gulp-concat'
gulp = require 'gulp'
livereload = require 'gulp-livereload'
nodemon = require 'gulp-nodemon'
open = require 'gulp-open'
rename = require 'gulp-rename'
rimraf = require 'rimraf'
sass = require 'gulp-sass'
notifier = require 'node-notifier'


require './buildTasks/js.coffee'

gulp.task 'default', ->
	gulp.start ['build', 'watch', 'karma']
gulp.task 'server', ->
	gulp.start ['build']
gulp.task 'build', [
		'copy-html'
		'sass'
		'webpack'
	]

gulp.task 'watch', ->
	livereload.listen()
	gulp.watch ['gulpfile.coffee', 'src/**/*.*'], ['webpack']
	gulp.watch ['dist/bundle.js'], ['livereload']
	gulp.watch ['src/**/*.sass'], ['sass']

gulp.task 'bower', ->
	bower()
		.pipe gulp.dest 'bower_components'

gulp.task 'livereload', ->
	gulp.src 'dist/index.html'
		.pipe livereload()

gulp.task 'clean', (cb)->
	rimraf 'dist', cb

gulp.task 'sass', ->
	gulp.src 'src/**/*.sass'
		.pipe sass()
		.pipe rename {extname: '.css'}
		.pipe concat 'style.css'
		.pipe gulp.dest 'dist'

gulp.task 'copy-html', ->
	gulp.src ['src/index.html']
		.pipe gulp.dest 'dist'

gulp.task 'nodemon', ->
	nodemon
		script: 'server/server.coffee'
		ext: 'none'

gulp.task 'open', ->
	gulp.src './server/server.coffee' #unneeded
		.pipe open '', {url: 'http://localhost:31337', app: 'chrome'}

gulp.task 'test', ->
	gulp.start 'jasmine'

gulp.task 'jasmine', ->
	gulp.src 'spec/Game.spec.coffee'
		.pipe jasmine()

fs = require 'fs'

reportStats = (stats) ->
	notifier.notify
		title: "Webpack build complete"
		message: "output written to buildstats.json"
#		stats.toString
#			colors:true
#			hash: false
#			version: false
#			timings: false
#			assets: false
#			chunks: false
#			chunkModules: false
#			modules: false
#			cached: false
#			reasons: false
#			source: false
#			errorDetails: true
#			chunkOrigins: false
#			modulesSort: false
#			chunksSort: false
#			assetsSort: false
	fs.writeFile 'buildstats.json', JSON.stringify(stats.toJson({exclude:[/bower_components/]}), null, 2)#, -> console.log "stats json file written"

gulp.task 'webpack', ->
	gulp.start 'webpack-runonce'


gulp.task 'webpack-runonce', (cb) ->
	webpack = require 'webpack'
	compiler = webpack require './webpack.config.coffee'
	compiler.run (err, stats) ->
		reportStats stats
		if err
			notifier.notify
			title: "Webpack Build Error"
			message: "Something went wrong"
		cb()


gulp.task 'karma', ->
	karma = require 'karma'
	karma.server.start
		configFile: __dirname + '/karma.conf.coffee'