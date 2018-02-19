'use strict';

const View = require('./View');

// class
var PropertyView;

// variables
PropertyView = function(_height = -1, _width = -1){
	View.call(this, "PropertyView", _height, _width);
	
};
PropertyView.prototype = new View();

// functions
PropertyView.prototype.InitPropertyView = function(){
	this.InitView();
};

module.exports = PropertyView;