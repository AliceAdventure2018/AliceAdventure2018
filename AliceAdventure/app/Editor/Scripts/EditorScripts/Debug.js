'use strict';

// class
var Debug;

// variables
Debug = function(){};

// functions
Debug.Log = function(something){
	console.log("LOG: " + something);
	// TODO: Reserved for later output functionality
}

Debug.LogError = function(something){
	console.log("ERROR: " + something);
	// TODO: Reserved for later output functionality
}

Debug.LogWarnning = function(something){
	console.log("WARNNING: " + something);
	// TODO: Reserved for later output functionality
}

module.exports = Debug;