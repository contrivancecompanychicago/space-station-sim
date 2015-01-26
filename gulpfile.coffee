gulp = require 'gulp'
clean = require 'gulp-clean'
rename = require 'gulp-rename'
through = require 'through2'
sass = require 'gulp-sass'
concat = require 'gulp-concat'
insert = require 'gulp-insert'
base64 = require 'gulp-base64'
_ = require 'underscore'

gulp.task 'default', ['build']

gulp.task 'build', [
		'clean'
		'copy-html'
		'copy-coffee'
		'templatify'
		'sass'
		'copy-sprites'
		'image-javascriptify'

		'concat:css'
		# 'testHeroku'
		'coffeeify'
	]


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

gulp.task 'copy-sprites', ->
	gulp.src ['temp/sprites.png']
		.pipe gulp.dest 'dist/sprites.png'


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


base64string = ->
	through.obj (f,e,done) ->
		f.contents = new Buffer f.contents.toString 'base64'
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
		.pipe concat 'style.css'
		.pipe gulp.dest 'temp'


gulp.task 'img-to-js', ->
	gulp.src 'src/**/*.png'
		# .pipe base64string()
		.pipe through.obj (f,e,done) ->
			bkslsh = /\\/g
			path = f.path.substr f.base.length
			path = path.replace(bkslsh, '/')
			out = "img = document.createElement('img')\n"
			out += "img.src = 'data:image/png;base64,"
			out += f.contents.toString 'base64'
			out += "'\nout['"+path+"'] = img\n"

			f.contents = new Buffer out
			this.push f
			done()
		.pipe concat('images.coffee')
		.pipe insert.prepend 'out = {}\n'
		.pipe insert.append 'module?.exports = out'
		.pipe gulp.dest 'temp/Game'

