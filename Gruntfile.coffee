path = require 'path'

module.exports = (grunt) ->

	require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

	grunt.initConfig
		pkg: require './package.json'
		clean:
			build:['temp']
			dist: ['dist']
			
		base64:
			images:
				cwd: 'src'
				src: '**/*.png'
				expand: true
				dest: 'temp'
				ext: '.b64'
		copy:
			html:
				cwd: 'src'
				src: 'index.html'
				dest: 'dist'
				expand: true
			coffee:
				cwd: 'src'
				src: '**/*.coffee'
				dest: 'temp'
				expand: true
			sprites:
				src: 'temp/sprites.png'
				dest: 'dist/sprites.png'
		concat:
			css:
				src: ['temp/**/*.css']
				dest: 'dist/style.css'
		coffee:
			compile:
				options:
					bare:true
				cwd: 'src'
				src: ['**/*.coffee']
				dest: 'dist'
				expand: true
				ext: '.js'
		watch:
			all: 
				files: [
					'Gruntfile.coffee'
					'src/**/*.*'
					]
				tasks: ['build']
				options:
					livereload: true
		open:
			chrome: 
				path: 'file:///G:/Projects/space-station-sim/dist/index.html'
				app: 'Chrome'
		coffeeify: 
			options:
				debug: true
				# alias: 
				# 	'jquery-browserify': 'jquery'
			game:
				src: 'temp/main.coffee'
				dest: 'dist/main.js'
		sass:
			compile:
				expand: true
				src: ['src/**/*.sass']
				dest: 'temp'
				ext: '.css'
		cjsx:
			options:
				bare: true
			compile:
				cwd: 'src'
				src: ['**/*.cjsx']
				dest: 'temp'
				expand: true
				ext: '.cjsx.js'
		sprite:
			all: 
				src: 'src/**/*.png'
				dest: 'temp/sprites.png'
				destCss: 'temp/sprite.css'
				cssOpts:
					cssSelector: (item) ->
						# console.log item
						# item.name = "spr_"  + item.name
						item.name = '.' + item.source_image
							.replace(/\//g, '_')
							.substr(0, item.source_image.length - 4)
							.substr 4
				# cssVarMap: (sprite) ->
				# 	console.log sprite
				# 	sprite.name = 'sprite_' + sprite.name



	grunt.registerTask 'default', ['build', 'watch']
	grunt.registerTask 'build', [
		'clean'
		'copy:html'
		'copy:coffee'
		'cjsx'
		'templatify'
		'sprite'
		'sass'
		'concat:css'
		'copy:sprites'
		'image-javascriptify'
		'coffeeify'
	]

	grunt.registerTask 'image-javascriptify', ->
		cwd = 'src'
		src =  ['**/*.png']
		expand = false
		dest = ''

		mapping = grunt.file.expandMapping src, dest, {cwd}
		files = {}
		test = null
		mapping.forEach (map)->
			buffers = map.src.map (path) ->
				grunt.file.read path, {encoding:null}
			output = Buffer.concat buffers
			files[map.dest] = output.toString 'base64'
		# console.log files

		output = 'out = {}\r\n'#+JSON.stringify files
		for key of files
			grunt.verbose.write key
			val = files[key]
			output += "img = document.createElement('img')\r\n"
			output += "img.src = 'data:image/png;base64,"+val+"'\r\n"
			output += "out['"+key+"'] = img\r\n"
		output += 'module?.exports = out\r\n'

		outPath = 'temp/Game/images.coffee'
		grunt.file.write outPath, output
		grunt.log.writeln outPath + " written"


	grunt.registerTask 'templatify', ->

		# done = this.async()

		cwd = 'src'
		src = ['**/*.html', '!index.html']
		dest = 'temp'
		ext = '.html.js'
		expand = true
		# rename = (dest, src, op) ->
		# 	newdest = src.substr(0, src.length - op.ext.length) + 'Template' + op.ext
		# 	path.join dest, newdest

		mapping = grunt.file.expandMapping src, dest, {cwd, ext}

		mapping.forEach (map)->
			content = "_ = require('underscore'); module.exports = _.template('"
			# console.log map
			map.src.forEach (filepath) ->
				content += grunt.file.read(filepath).replace /'/g, '\\\''
			content += "');"
			grunt.file.write map.dest, content
