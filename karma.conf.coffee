module.exports = (config) ->
  config.set
    basePath: ''
    frameworks: [
      'jasmine'
    ]
    files: [
#      'spec/spectest.spec.coffee'
      'spec/**/*.spec.coffee'
    ]
    exclude: []
    preprocessors:
      'spec/**/*.spec.coffee': ['webpack']
    webpack: require('./webpack.config').karma()
#    coverageReporter:
#
#      reporters: [
#        {"type": "html", dir: 'coverage/'}
#        {"type": "text"}
#      ]

#    plugins: [
#      require "karma-webpack"
#      require "karma-nyan-reporter"
#      require "karma-growl-reporter"
#    ]
    reporters: [
      'progress'
#      'dots'
      'growl'
      'nyan'
#      'coverage'
    ]
    port: 9876
    colors: true
    logLevel: 'LOG_DISABLE'
    autoWatch: true
    browsers: [
      'Chrome'
#      'Firefox'
#      'PhantomJS'
    ]
    singleRun: false