
configBundle = require './buildTasks/js'

module.exports = (config) ->
  config.set
    basePath: ''
    frameworks: [
#      'browserify'
      'jasmine'
    ]
    files: [
      'dist/bundle.js'
      'spec/**/*.spec.coffee'
    ]
#    browserify:
#      debug: true
#      extensions: [
#        '.js'
#        '.coffee'
#        '.html'
#        '.png'
#      ]
#      configure: (bundle) ->
#        bundle.on 'prebundle', ->
#          # bundle.external 'underscore'
#          configBundle bundle
    exclude: []
    preprocessors:
      'spec/**/*.coffee': [ 'coffee' ]
#      'spec/**/*spec.coffee': [ 'browserify' ]
      'dist/bundle.js': [ 'coverage', 'sourcemap']
    coverageReporter:
      type: 'html'
      dir: 'coverage/'
    reporters: [
      'progress'
      'dots'
      'nyan'
      'coverage'
    ]
    port: 9876
    colors: true
    # possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: 'LOG_DISABLE'
    autoWatch: true
    # available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    # 'Firefox', 'FirefoxDeveloper', 'FirefoxAurora', 'FirefoxNightly'
    browsers: [
      'Chrome'
      'Firefox'
    ]
    # if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  return

