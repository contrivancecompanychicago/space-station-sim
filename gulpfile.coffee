fs = require 'fs'
gulp = require 'gulp'
rimraf = require 'rimraf'
rename = require 'gulp-rename'
through = require 'through2'
sass = require 'gulp-sass'
concat = require 'gulp-concat'
insert = require 'gulp-insert'
base64 = require 'gulp-base64'
coffeeify = require 'gulp-coffeeify'
livereload = require 'gulp-livereload'
coffee = require 'coffee-script'
merge = require 'gulp-merge'

browserify = require 'browserify'
_ = require 'underscore'

gulp.task 'default', ['build', 'watch']

gulp.task 'build', ['prep', 'coffeeify']

gulp.task 'prep', [
		'clean'
		'copy-html'
		'copy-coffee'
		'templatify'
		'sass'
		'copy-sprites'
		'img-to-js'
		# 'coffeeify'
	]

gulp.task 'watch', ->
	livereload.listen()
	gulp.watch ['gulpfile.coffee', 'src/**/*.*'], ['build']


gulp.task 'livereload', ->
	gulp.src 'dist/index.html'
		.pipe livereload()


gulp.task 'test', ->
	b = browserify()
	b.add './src/test.coffee'
	b.add './src/Game/config.coffee'
	b.add './src/index.html'
	b.transform (file) ->
		# console.log file
		# console.log file.indexOf '.'
		ext = file.substr file.indexOf '.'
		# console.log ext
		if ext is '.coffee'
			return through.obj (data,e,done) ->
				# console.log "compile"
				# console.log data.toString()
				# console.log _.keys f
				# f.contents = new Buffer coffee.compile f.contents.toString()
				data = coffee.compile data.toString()
				# console.log data
				this.push data
				done()

		if ext is '.html'
			return through.obj (data,e,done) ->
				pre = "_ = require('underscore');\r\nmodule.exports = _.template('"
				post = "');"
				content = data.toString().replace(/'/g, '\\\'').replace(/\r/g, '').replace(/\n/g, '')
				# f.contents = new Buffer pre+content+post
				data = pre+content+post
				this.push data
				done()


	b.bundle (err, js) ->
		if err
			traceError err
			return
		else
			# js.pipe rename('test.js')
			# 	.pipe gulp.dest 'temp'
			fs.writeFile 'temp/test.js', js, (err)-> console.log err

		# .pipe(gulp.dest 'temp')
	# src = gulp.src 'src/test.coffee'
	# tpl = gulp.src 'src/**/*.html'
	# 	.pipe templatify()
	# 	# .pipe rename { extname: '.html.js' }
	# merge(src,tpl)
	# 	.pipe coffeeify()
	# 	# .pipe rename 'test.js'
	# 	.pipe concat('testfile.js')
	# 	.pipe gulp.dest 'temp'



gulp.task 'coffeeify', ['prep'], ->
	gulp.src 'temp/main.coffee'
	# gulp.src 'src/test.coffee'
		.pipe coffeeify({
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
		.pipe concat('main.js')
		.pipe gulp.dest 'dist'
		.pipe livereload()

gulp.task 'clean', (cb)->
	# return gulp.src 'temp'
	# 	.pipe rimraf()
	rimraf 'temp', ->
		rimraf 'dist', cb


gulp.task 'copy-html', ['clean'], ->
	gulp.src ['src/index.html']
		.pipe gulp.dest 'dist'

gulp.task 'copy-coffee', ['clean'], ->
	gulp.src ['src/**/*.coffee']
		.pipe gulp.dest 'temp'

gulp.task 'copy-sprites', ['clean'], ->
	gulp.src ['temp/sprites.png']
		.pipe gulp.dest 'dist/sprites.png'




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


gulp.task 'templatify', ['clean'], ->
	gulp.src 'src/**/*.html'
	.pipe templatify()
	.pipe rename { extname: '.html.js' }
	.pipe gulp.dest 'temp'


gulp.task 'sass', ['clean'], ->
	gulp.src 'src/**/*.sass'
		.pipe sass()
		.pipe rename {extname: '.css'}
		.pipe concat 'style.css'
		.pipe gulp.dest 'dist'


gulp.task 'img-to-js', ['clean'], ->
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

