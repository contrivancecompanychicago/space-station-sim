path = require 'path'
t2 = require 'through2'
_ = require 'underscore'

defaults = 
	ext: ['.png']

module.exports = (opts) ->
	opts = _.extend defaults, opts
	return (file) ->
		unless path.extname(file) in defaults.ext
			return t2()
		t2 (data, enc, cb) ->
			out = "img = document.createElement('img');"
			out += "img.src = 'data:image/png;base64,"
			out += new Buffer(data).toString 'base64'
			out += "';module.exports = img;"
			out
			@push new Buffer out
			cb()