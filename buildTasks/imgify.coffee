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
			data = String data
			data = 'module.exports = ' + _.template(data).source
			@push new Buffer data
			cb()


	# imgXform = (raw) ->
	# out = "img = document.createElement('img');"
	# out += "img.src = 'data:image/png;base64,"
	# out += new Buffer(raw).toString 'base64'
	# # out += "';out['"+path+"'] = img;"
	# out += "';module.exports = img;"
	# out