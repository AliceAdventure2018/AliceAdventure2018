'use strict';

const {PIXI} = require('./Utilities/Utilities');
const View = require('./View');

// class
var RunView;

// variables
RunView = function(_bindElementID, _height = -1, _width = -1){
	View.call(this, "RunView", _height, _width);	
	this._bindElemetnID = _bindElementID;
	this.app = null;
};
RunView.prototype = new View();

// static
RunView.NewView = function(_elementID){
	var view = new RunView(_elementID);
	view.InitView();
	return view;
};

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
	document.getElementById(this._bindElementID).appendChild(this.app.view);
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