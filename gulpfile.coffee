_ = require 'underscore'
base64 = require 'gulp-base64'
bower = require 'gulp-bower'
browserify = require 'browserify'
coffee = require 'coffee-script'
concat = require 'gulp-concat'
fs = require 'fs'
glob = require 'glob'
gulp = require 'gulp'
gulpbrowserify = require 'gulp-browserify'
gulpcoffeeify = require 'gulp-coffeeify'
insert = require 'gulp-insert'
livereload = require 'gulp-livereload'
merge = require 'gulp-merge'
path = require 'path'
rename = require 'gulp-rename'
rimraf = require 'rimraf'
sass = require 'gulp-sass'
source = require 'vinyl-source-stream'
sourcemaps = require 'gulp-sourcemaps'
templatify = require 'browserify-underscore-templatify'
through = require 'through2'

imgify = require './buildTasks/imgify.coffee'

require './buildTasks/js.coffee'

bkslsh = /\\/g
dblbkslsh = /\\\\/g

gulp.task 'default', ['build', 'watch']
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

htmlXform = (data)->
	content = data.replace(/'/g, '\\\'').replace(/\r/g, '').replace(/\n/g, '')
	"module.exports = require('underscore').template('" + content + "');"
imgXform = (data) ->
	# console.log "-----"
	# console.log (String data).substr 0, 100
	# console.log data
	# console.log data.length
	# console.log data.toJSON()
	out = "img = document.createElement('img');"
	out += "img.src = 'data:image/png;base64,"
	out += new Buffer(data).toString 'base64'
	# out += String data
	out += "';module.exports = img;"
	out
	# JSON.stringify data.toJSON()

gulp.task 'coffeeify', ['bower'], ->
	gulp.src 'src/main.coffee'
	# gulp.src 'src/test.coffee'
		# .pipe sourcemaps.init()
		.pipe gulpcoffeeify({
			transforms: [
				{
					ext: '.html'
					transform: htmlXform
				}
				{
					ext: '.png'
					transformRaw: imgXform
				}
			]
			aliases: [
				{
					cwd: 'src'
					# base: 'Game'
				}
				{
					cwd: 'bower_components'
					base: 'bower'
				}
			]
			# debug: true
		})
		# .pipe sourcemaps.write()
		.pipe concat('main.js')
		.pipe gulp.dest 'dist'
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
