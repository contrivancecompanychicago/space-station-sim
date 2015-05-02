
configBundle = require './buildTasks/js'
#istanbul = require('browserify-istanbul')

module.exports = (config) ->
  config.set
    basePath: ''
    frameworks: [
      'browserify'
      'jasmine'
    ]
    files: [
#      'spec/spectest.spec.coffee'
#      'dist/bundle.js'
      'spec/**/*.spec.coffee'

    ]
    browserify:
      debug: true
      extensions: [
        '.js'
        '.coffee'
        '.html'
        '.png'
      ]
      transform: [
        'coffeeify'
        'browserify-underscore-templatify'
        'browserify-imgify'
        'browserify-istanbul'
      ]
      configure: (bundle) ->
        bundle.on 'prebundle', ->
          configBundle bundle
    exclude: []
    preprocessors:
      'spec/**/*.spec.coffee': [ 'browserify']

#      '**/*.coffee': ['coverage']
#      'g:\\Projects\\space-station-sim\\**/*.coffee': [ 'coverage' ]
#      'spec/**/*.coffee': [ 'coffee' ]
#      'dist/bundle.js': [ 'coverage', 'sourcemap']
    coverageReporter:
      instrumenters: { ibrik : require('ibrik') }
      instrumenter: {
        '**/*.coffee': 'ibrik'
      }
      reporters: [
#        {"type": "html", dir: 'coverage/'}
#        {"type": "text"}
      ]

# the default configuration
    htmlReporter:
      outputDir: 'karma_html' # where to put the reports
      templatePath: null # set if you moved jasmine_template.html
      focusOnFailures: true # reports show failures on start
      namedFiles: false # name files instead of creating sub-directories
      pageTitle: null # page title for reports; browser info by default
      urlFriendlyName: false # simply replaces spaces with _ for files/dirs
    # experimental
      preserveDescribeNesting: false, # folded suites stay folded
      foldAll: false, # reports start folded (only with preserveDescribeNesting)

    reporters: [
#      'progress'
#      'dots'
      'growl'
      'nyan'
#      'html'
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
#      'Firefox'
#      'PhantomJS'
    ]
    # if true, Karma captures browsers, runs the tests and exits
    singleRun: false