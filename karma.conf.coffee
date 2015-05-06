module.exports = (config) ->
  config.set
    basePath: ''
    frameworks: [
      'jasmine'
    ]
    files: [
      'spec/**/*.spec.coffee'
    ]
    exclude: []
    preprocessors:
      'spec/**/*.spec.coffee': ['webpack']
    webpack: require('./webpack.config').karma()
    coverageReporter:
      reporters: [
        {"type": "html", dir: 'coverage/'}
      ]
    reporters: [
      'progress'
      'growl'
      'nyan'
      'coverage'
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