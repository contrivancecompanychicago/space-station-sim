module.exports = (grunt) ->

	require('matchdep').filterDev('grunt-*').forEach grunt.loadNpmTasks

	grunt.initConfig
		pkg: require './package.json'
		clean:
			temp:['temp']
			doc: ['doc']
			dest: ['dest']
			
		copy:
			html:
				src: 'src/**/*.html'
				dest: 'dist'
				expand: true