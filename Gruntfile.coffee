path = require 'path'

module.exports = (grunt) ->

	require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

	grunt.initConfig
		pkg: require './package.json'
		clean:
			temp:['temp']
			dist: ['dist']
			
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
				src: 'src/**/*.sass'
				dest: 'dist/style.css'



	grunt.registerTask 'default', ['build', 'watch']
	grunt.registerTask 'build', ['clean', 'copy', 'templatify', 'coffeeify', 'sass']

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
