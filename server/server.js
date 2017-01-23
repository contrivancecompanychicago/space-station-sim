var app, express, port;

console.log("server starting");

express = require('express');

app = express();

app.use(express["static"](__dirname + '/../dist/'));

port = process.env.PORT || 31337;

console.log("trying to bind to", port);

app.listen(port);
