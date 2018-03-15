'use strict';

const PIXI = require('../../../Resources/pixi');
const View = require('./View');

// class
var RunView;

// variables
RunView = function(_height = -1, _width = -1){
	View.call(this, "RunView", _height, _width);	
	this.app = null;
};
RunView.prototype = new View();

// functions
RunView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	
	// Init app
	this.app = new PIXI.Application({
		width: 600,
		height: 400, 
		antialiasing: true, 
		backgroundcolor: 0xFFFFFF
	});
};

RunView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method
};

RunView.prototype.Start = function(){
	// TODO
}; 

RunView.prototype.Terminate = function(){
	// TODO
}; 

module.exports = RunView;