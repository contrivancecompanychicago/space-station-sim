fs = require 'fs'
gulp = require 'gulp'
rimraf = require 'rimraf'
rename = require 'gulp-rename'
through = require 'through2'
sass = require 'gulp-sass'
path        = require 'path'
glob        = require 'glob'
concat = require 'gulp-concat'
insert = require 'gulp-insert'
base64 = require 'gulp-base64'
coffeeify = require 'gulp-coffeeify'
livereload = require 'gulp-livereload'
coffee = require 'coffee-script'
merge = require 'gulp-merge'
sourcemaps = require 'gulp-sourcemaps'

browserify = require 'browserify'
gulpbrowserify = require 'gulp-browserify'
_ = require 'underscore'

bkslsh = /\\/g
dblbkslsh = /\\\\/g

gulp.task 'default', ['clean', 'build', 'watch']

gulp.task 'build', [
		'copy-html'
		'sass'
		'coffeeify'
	]

gulp.task 'watch', ->
	livereload.listen()
	gulp.watch ['gulpfile.coffee', 'src/**/*.*'], ['coffeeify']


gulp.task 'livereload', ->
	gulp.src 'dist/index.html'
		.pipe livereload()

htmlXform = (data)->
	content = data.replace(/'/g, '\\\'').replace(/\r/g, '').replace(/\n/g, '')
	"module.exports = require('underscore').template('" + content + "');"
imgXform = (data, raw) ->
	out = "img = document.createElement('img');"
	out += "img.src = 'data:image/png;base64,"
	out += new Buffer(raw).toString 'base64'
	# out += "';out['"+path+"'] = img;"
	out += "';module.exports = img;"
	out

gulp.task 'coffeeify', ->
	gulp.src 'src/main.coffee'
	# gulp.src 'src/test.coffee'
		# .pipe sourcemaps.init()
		.pipe coffeeify({
			transforms: [
				{
					ext: '.html'
					transform: htmlXform
				}
				{
					ext: '.png'
					transform: imgXform
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

gulp.task 'sass', ['clean'], ->
	gulp.src 'src/**/*.sass'
		.pipe sass()
		.pipe rename {extname: '.css'}
		.pipe concat 'style.css'
		.pipe gulp.dest 'dist'

gulp.task 'copy-html', ['clean'], ->
	gulp.src ['src/index.html']
		.pipe gulp.dest 'dist'


# gulp.task 'copy-coffee', ['clean'], ->
# 	gulp.src ['src/**/*.coffee']
# 		.pipe gulp.dest 'temp'

# gulp.task 'copy-sprites', ['clean'], ->
# 	gulp.src ['temp/sprites.png']
# 		.pipe gulp.dest 'dist/sprites.png'


# gulp.task 'test', ->
# 	raw = fs.readFileSync './src/Game/Grid/Block/Type/plain.png'
# 	str = String raw
# 	buff = new Buffer str, 'binary'
# 	console.log "expect"
# 	console.log buff.toString('base64').substr 0, 100
# 	console.log "to be"
# 	console.log new Buffer(raw).toString('base64').substr 0, 100


# templatify = ->
# 	through.obj (f,e,done) ->
# 		pre = "_ = require('underscore');\r\nmodule.exports = _.template('"
# 		post = "');"
# 		content = f.contents.toString().replace(/'/g, '\\\'').replace(/\r/g, '').replace(/\n/g, '')
# 		f.contents = new Buffer pre+content+post
# 		this.push f
# 		done()


# base64string = ->
# 	through.obj (f,e,done) ->
# 		f.contents = new Buffer f.contents.toString 'base64'
# 		this.push f
# 		done()


# gulp.task 'templatify', ['clean'], ->
# 	gulp.src 'src/**/*.html'
# 	.pipe templatify()
# 	.pipe rename { extname: '.html.js' }
# 	.pipe gulp.dest 'temp'




# gulp.task 'img-to-js', ['clean'], ->
# 	gulp.src 'src/**/*.png'
# 		# .pipe base64string()
# 		.pipe through.obj (f,e,done) ->
			
# 			path = f.path.substr f.base.length
# 			path = path.replace(bkslsh, '/')
# 			out = "img = document.createElement('img')\n"
# 			out += "img.src = 'data:image/png;base64,"
# 			out += f.contents.toString 'base64'
# 			out += "'\nout['"+path+"'] = img\n"

# 			f.contents = new Buffer out
# 			this.push f
# 			done()
# 		.pipe concat('images.coffee')
# 		.pipe insert.prepend 'out = {}\n'
# 		.pipe insert.append 'module?.exports = out'
# 		.pipe gulp.dest 'temp/Game'

