console.log "server starting"

express = require 'express'

app = express()

app.use(express.static(__dirname + '/../dist/'));

app.listen process.env.port or 31337