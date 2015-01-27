
_           = require 'lodash'
fs          = require 'fs'
path        = require 'path'
glob        = require 'glob'
through2    = require 'through2'
browserify  = require 'browserify'
coffee      = require 'coffee-script'

module.exports = (opts = {})->
	console.log "bify"
	opts.aliases = [
		{
			cwd: 'src'
			# base: 'Game'
		}
		{
			cwd: 'bower_components'
			base: 'bower'
		}
	]
	aliasMap = {}
	if opts.aliases
		aliases = if _.isArray(opts.aliases) then opts.aliases else [opts.aliases]
		aliases.forEach (alias)->
			return unless alias
			{ cwd, base, file } = alias
			file = ['**/*.coffee', '**/*.js', '**/*.json', '**/*.cson'] unless _.isArray file
			file.map (pattern)->
				return unless cwd
				dir = cwd
				dir = path.join(process.cwd(), dir) unless dir.match /^\//
				pattern = path.join dir, pattern
				glob.sync(pattern).forEach (file)->
					alias = path.relative dir, file
					alias = path.join base, alias if base
					alias = alias.replace /\.[^.]+$/, ''
					file = file.replace /\//g, '\\'
					# console.log alias
					alias = alias.replace /\\/g, '.'
					# console.log "aliasmap", alias, file
					aliasMap[alias] = file
	# console.log aliasMap
	through2.obj (file, enc, cb)->
		self = this
		if file.isStream()
			return cb new PluginError 'gulp-coffeeify', 'Streaming not supported'

		
		opts.builtins  = _.defaults require('browserify/lib/builtins'), aliasMap
		# console.log opts.builtins
		data = {}
		b = browserify(data, opts)
		b.add './src/test.coffee'
		# b.add './src/Game/config.coffee'
		# b.add './src/index.html'
		b.transform (file) ->
			console.log "looking for transform", file
			# console.log file.indexOf '.'
			ext = file.substr file.indexOf '.'
			# console.log ext
			if ext is '.coffee'
				return through2.obj (data,e,done) ->
					console.log "compile coffee", file
					# console.log data.toString()
					# console.log _.keys f
					# f.contents = new Buffer coffee.compile f.contents.toString()
					data = coffee.compile data.toString()
					# console.log data
					this.push data
					done()

			if ext is '.html'
				return through2.obj (data,e,done) ->
					pre = "_ = require('underscore');\r\nmodule.exports = _.template('"
					post = "');"
					content = data.toString().replace(/'/g, '\\\'').replace(/\r/g, '').replace(/\n/g, '')
					# f.contents = new Buffer pre+content+post
					data = pre+content+post
					this.push data
					done()


		b.bundle (err, js) ->
			if err
				console.log err
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