var express = require('express');
var server = express();
server.get('/**', function (req, res, next) {

  var options = {
    root: __dirname
  };

  console.log(req.path);
  res.sendFile(req.path, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', req.path);
    }
  });

});

server.listen(1290, function () {
  console.log('Express server listening on port 1290!');
});