'use strict';

// class
var View;

// variables
View = function(_tag = "Untagged", _height = -1, _width = -1, _bindElementID = null){
	this.tag = _tag;
	this.height = _height;
	this.width = _width;
	this.bindElementID = _bindElementID;
};

// functions
View.prototype.InitView = function(){
	// TODO
	//console.log('Init view: ' + this.tag);
	return;
};

View.prototype.ReloadView = function(){
	// TODO
	//console.log('Reload view: ' + this.tag);
	return;
};

module.exports = View;