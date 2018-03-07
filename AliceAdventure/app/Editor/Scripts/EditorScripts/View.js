'use strict';

// class
var View;

// variables
View = function(_tag = "Untagged", _height = -1, _width = -1, _bindElement = null){
	this.tag = _tag;
	this.height = _height;
	this.width = _width;
	this.bindElement = _bindElement;
};

// functions
View.prototype.InitView = function(){
	// TODO
	console.log('Init view: ' + this.tag);
	return;
};

View.prototype.ReloadView = function(){
	// TODO
	console.log('Reload view: ' + this.tag);
	return;
};

module.exports = View;