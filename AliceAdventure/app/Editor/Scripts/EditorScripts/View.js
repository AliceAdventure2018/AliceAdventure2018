'use strict';

// class
var View;

// variables
View = function(_tag = "Untagged", _height = -1, _width = -1){
	this.tag = _tag;
	this.height = _height;
	this.width = _width;
};

// functions
View.prototype.InitView = function(){
	// TODO
	console.log('Init view for ' + this.tag);
	return;
};

module.exports = View;