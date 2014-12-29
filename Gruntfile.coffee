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
				src: '**/*.html'
				dest: 'dist'
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
			game:
				src: 'src/main.coffee'
				dest: 'dist/main.js'



	grunt.registerTask 'default', ['build', 'watch']
	grunt.registerTask 'build', ['clean', 'copy', 'coffeeify']