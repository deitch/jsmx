/*jslint node:true */
var http = require('http'), url = require('url'), qs = require('querystring').parse, server,
EventEmitter2 = require('eventemitter2').EventEmitter2, mx = new EventEmitter2({}), DEFAULT_PORT = 9002;

mx.listen = function(port) {
  port = port || DEFAULT_PORT;
  // start a listener
  server = http.createServer(function(req,res){
    // the message is the path, and the params are passed to the event
    var pathname = url.parse(req.url).pathname, query = qs(url.parse(req.url).query);
    res.writeHead(200);
    res.end();
    // remove any trailing '/' in the event name
    pathname = pathname.replace(/^\//,"");
    mx.emit(pathname,query);
  });
  server.listen(port);
};
mx.close = function(port) {
  mx.emit('close');
  if (server && server.close) {
    server.close();
  }
};

module.exports = mx;
