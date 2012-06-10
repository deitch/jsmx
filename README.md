jsmx
====

Overview
--------
jsmx is a simple way to communicate **to** your nodejs app. All communications happens using a very simple HTTP API.

Installation
------------
npm install jsmx

Usage
-----
Inside your app, jsmx is nothing more or less than an event emitter (ok, actually an EventEmitter2 https://github.com/hij1nx/EventEmitter2 ). You need only three steps to get on your way:

1. Start a listener on a port (default is 9002)
2. Attach an event listener
3. Send a management event

````JavaScript
var mx = require('jsmx');
mx.listen(port); // if no port is specified, defaults to 9002
mx.on('someEvent',function(arg){
	// will be called when 'someEvent' is passed
	// arg is a single JS object
});
````

To send an event, make a GET request to the host on which your app is running, to the port you specified. 

The path (after) the initial slash will be the event name, and the parameters will be converted to a JS object and passed to the callback.

    curl http://localhost:9002/foo?a=b&d=1

will create an event "foo" passing the object {a:'b','d':1} to the callbacks

You can also do

	curl http://localhost:9002/foo/bar/baz?a=b&d=1

To get an event 'foo/bar/baz'.

Licensing
---------
jsmx is released under the MIT License http://www.opensource.org/licenses/mit-license.php
