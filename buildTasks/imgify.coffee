path = require 'path'
t2 = require 'through2'
_ = require 'underscore'

fs = require 'fs'

defaults = 
	ext: ['.png']

module.exports = (opts) ->
	opts = _.extend defaults, opts
	return (file) ->
		unless path.extname(file) in defaults.ext
			return t2()
		# console.log file
		t2.obj (data, enc, cb) ->
			#data given from t2 is shit for some reason
			# getting file direct from FS
			self = @
			fs.readFile file, (err, data) ->
				# console.log err, data

				# console.log enc
				# console.log "-----"
				# console.log (String data).substr 0, 100
				# console.log data
				# console.log data.length
				# console.log _.keys data
				out = "img = document.createElement('img');"
				out += "img.src = 'data:image/png;base64,"
				out += new Buffer(data).toString 'base64'
				# out += String data
				out += "';module.exports = img;"
				# out

				self.push new Buffer out
				# @push new Buffer JSON.stringify data.toJSON()
				cb()