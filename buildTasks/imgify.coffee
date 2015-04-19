path = require 'path'
t2 = require 'through2'
_ = require 'underscore'

fs = require 'fs'

defaults =
	ext: ['.png', '.jpg', '.jpeg', '.gif']

module.exports = (file) ->
	unless path.extname(file) in defaults.ext
		return t2()
	t2.obj (data, enc, cb) ->
#data given from t2 is shit for some reason
# getting file direct from FS
		self = @
		fs.readFile file, (err, data) ->

			out = "img = document.createElement('img');"
			out += "img.src = 'data:image/png;base64,"
			out += new Buffer(data).toString 'base64'
			out += "';module.exports = img;"

			self.push new Buffer out
			cb()