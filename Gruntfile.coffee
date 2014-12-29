module.exports = (grunt) ->

	require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

	grunt.initConfig
		pkg: require './package.json'
		clean:
			temp:['temp']
			doc: ['doc']
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
			
		