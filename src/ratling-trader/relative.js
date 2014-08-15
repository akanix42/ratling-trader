var path = require('path');

var srcPath = process.argv[2];
var otherPath = process.argv[3];

console.log(path.relative(path.resolve(srcPath), path.resolve(otherPath)));
