/*jslint node:true */

var jsmx = require('./lib/mx'), request = require('request'), nodeunit = require('nodeunit'), port = 9002, url = "http://localhost:"+port,
tests = {}, reporter = nodeunit.reporters["default"];


tests = {
  jsmx: {
    checkBasicEvent: function(test) {
      var mx = jsmx.create();
      mx.listen(port,function(){
        mx.on('foo',function(arg) {
          test.deepEqual(arg,{a:'b'},"passed should be equivalent");
          test.done();
          mx.close();
        });
        // and now just send it an event and check the results
        request(url+"/foo?a=b");
      });
    },
    checkComplexEvent: function(test) {
      var mx = jsmx.create();
      mx.listen(port,function(){
        mx.on('foo/bar/fubar',function(arg){
          test.deepEqual(arg,{a:'b'},"passed should be equivalent");
          mx.close();
          test.done();
        });
        request(url+"/foo/bar/fubar?a=b");
      });
    },
    check127_0_0_1: function(test) {
      var mx = jsmx.create();
      mx.listen(port,"127.0.0.1",function(e){
        mx.on('foo2',function(arg) {
          test.deepEqual(arg,{a:'b'},"passed should be equivalent");
          mx.close();
          test.done();
        });
        // and now just send it an event and check the results
        request(url+"/foo2?a=b");
      });
    },
    checkLocalhost: function(test) {
      var mx = jsmx.create();
      mx.listen(port,"localhost",function(e){
        mx.on('foo',function(arg) {
          test.deepEqual(arg,{a:'b'},"passed should be equivalent");
          mx.close();
          test.done();
        });
        // and now just send it an event and check the results
        request(url+"/foo?a=b");
      });
    }
  }
};


reporter.run(tests);


