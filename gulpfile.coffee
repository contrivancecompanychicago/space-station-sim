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

require './buildTasks/js.coffee'

gulp.task 'default', ['build', 'watch', 'nodemon']
gulp.task 'server', ['build']
gulp.task 'build', [
		'copy-html'
		'sass'
		'js'
	]

gulp.task 'watch', ->
	livereload.listen()
	gulp.watch ['gulpfile.coffee', 'src/**/*.*'], ['js']
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
