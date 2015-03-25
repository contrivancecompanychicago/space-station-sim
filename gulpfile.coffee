_ = require 'underscore'
base64 = require 'gulp-base64'
bower = require 'gulp-bower'
browserify = require 'browserify'
concat = require 'gulp-concat'
fs = require 'fs'
glob = require 'glob'
gulp = require 'gulp'
gulpbrowserify = require 'gulp-browserify'
gulpcoffeeify = require 'gulp-coffeeify'
insert = require 'gulp-insert'
livereload = require 'gulp-livereload'
merge = require 'gulp-merge'
nodemon = require 'gulp-nodemon'
open = require 'gulp-open'
path = require 'path'
rename = require 'gulp-rename'
rimraf = require 'rimraf'
sass = require 'gulp-sass'
source = require 'vinyl-source-stream'
sourcemaps = require 'gulp-sourcemaps'
templatify = require 'browserify-underscore-templatify'
through = require 'through2'
jasmine = require 'gulp-jasmine'

imgify = require './buildTasks/imgify.coffee'

require './buildTasks/js.coffee'

bkslsh = /\\/g
dblbkslsh = /\\\\/g

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


b64 = require 'gulp-base64'
gulp.task 'b64', ->
	gulp.src './src/**/*.png'
		.pipe b64()
		.pipe gulp.dest './temp'

gulp.task 'nodemon', ->
	nodemon
		script: 'server/server.coffee'

gulp.task 'open', ->
	gulp.src './server/server.coffee' #unneeded
		.pipe open '', {url: 'http://localhost:31337', app: 'chrome'}

gulp.task 'test', ->
	gulp.start 'jasmine'

gulp.task 'jasmine', ->
	gulp.src 'spec/Game.spec.coffee'
		.pipe jasmine()


# coffee = require 'gulp-coffee'
# gulp.task 'coffee-spec', ->
# 	gulp.src './spec/**/*.coffee'
# 		.pipe coffee()
# 		.pipe gulp.dest './temp'