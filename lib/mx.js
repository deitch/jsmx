/*jslint node:true */
var http = require('http'), url = require('url'), qs = require('querystring').parse,
EventEmitter2 = require('eventemitter2').EventEmitter2, DEFAULT_PORT = 9002;
module.exports = {
  create : function() {
    var server, mx = new EventEmitter2({});
    mx.listen = function(port,hostname,cb) {
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
      server.on('error',function(e){
        if (cb && typeof(cb) === "function") {
          cb(e);
        }
      });
      server.on('listening',function(){
        if (cb && typeof(cb) === "function") {
          cb();
        }
      });
      server.listen(port,hostname);
    };
    mx.close = function(port) {
      mx.emit('close');
      if (server && server.close) {
        server.close();
      }
    };
    return(mx);
  }
};
