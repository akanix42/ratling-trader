var express = require('express');
    var app = express();
var port = process.argv[2] || 8888;

app.use(express.static(process.cwd()));
app.listen(port);

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");