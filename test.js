/*jslint node:true */

var mx = require('./lib/mx'), request = require('request'), nodeunit = require('nodeunit'), port = 9002, url = "http://localhost:"+port,
tests = {}, reporter = nodeunit.reporters["default"];


tests = {
  jsmx: {
    checkBasicEvent: function(test) {
      mx.listen(port);
      mx.on('foo',function(arg) {
        test.deepEqual(arg,{a:'b'},"passed should be equivalent");
        test.done();
        mx.close();
      });
      // and now just send it an event and check the results
      request(url+"/foo?a=b");
    },
    checkComplexEvent: function(test) {
      mx.listen(port);
      mx.on('foo/bar/fubar',function(arg){
        test.deepEqual(arg,{a:'b'},"passed should be equivalent");
        mx.close();
        test.done();
      });
      request(url+"/foo/bar/fubar?a=b");
    }
  }
};


reporter.run(tests);


