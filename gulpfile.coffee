gulp = require 'gulp'
clean = require 'gulp-clean'
rename = require 'gulp-rename'
through = require 'through2'
sass = require 'gulp-sass'

gulp.task 'default', ['build']

gulp.task 'build', ['clean', 'copy-html', 'copy-coffee']


gulp.task 'clean', ->
	console.log "yolo"
	gulp.src 'temp'
		.pipe clean()

gulp.task 'copy-html', ->
	gulp.src ['src/index.html']
		.pipe gulp.dest 'temp'

gulp.task 'copy-coffee', ->
	gulp.src ['src/**/*.coffee']
		.pipe gulp.dest 'temp'


gulp.task 'templatify', ->
	gulp.src 'src/**/*.html'


templatify = ->
	through.obj (f,e,done) ->
		pre = "_ = require('underscore');\r\nmodule.exports = _.template('"
		post = "');"
		content = f.contents.toString().replace(/'/g, '\\\'').replace(/\r/g, '').replace(/\n/g, '')
		f.contents = new Buffer pre+content+post
		this.push f
		done()

gulp.task 'templatify', ->
	gulp.src 'src/**/*.html'
	.pipe templatify()
	.pipe rename { extname: '.html.js' }
	.pipe gulp.dest 'temp'


gulp.task 'sass', ->
	gulp.src 'src/**/*.sass'
		.pipe sass()
		.pipe rename {extname: '.css'}
		.pipe gulp.dest 'temp'