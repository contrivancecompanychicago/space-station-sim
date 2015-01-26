gulp = require 'gulp'
clean = require 'gulp-clean'

through = require 'through2'

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


Plugin = (f,e,done) ->
	# console.log f.isBuffer()
	pre = "_ = require('underscore');\r\nmodule.exports = _.template('"
	post = "');"
	content = f.contents.toString().replace(/'/g, '\\\'').replace(/\r/g, '').replace(/\n/g, '')
	# f.contents = Buffer.concat [pre, f.contents, post]
	f.contents = new Buffer pre+content+post
	this.push f
	done()
plugin = ->
	through.obj Plugin

gulp.task 'test', ->
	gulp.src 'src/index.html'
	.pipe plugin()
	.pipe gulp.dest 'temp'