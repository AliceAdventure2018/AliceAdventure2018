'use strict';

const PIXI = require('../../../Resources/pixi');
const View = require('./View');
const SceneObject = require('./SceneObject');
const GameProperties = require('./GameProperties');

// class
var SceneView;

// variables
SceneView = function(_height = -1, _width = -1){
	View.call(this, "SceneView", _height, _width);

	this.app = null;
	
};
SceneView.prototype = new View();

// functions
SceneView.prototype.InitView = function(_element){
	View.prototype.InitView.apply(this); // call super method
	this.app = new PIXI.Application({
		width: 600,
		height: 400, 
		antialiasing: true, 
		backgroundcolor: 0xFFFFFF
	});
	if (!_element) _element = document.getElementById('scene-view');
	_element.appendChild(this.app.view);
};

SceneView.prototype.TestAddObject = function(_objIndex, _x, _y){ // test

	if (_x == undefined) _x = this.app.screen.width / 2;
	if (_y == undefined) _y = this.app.screen.height / 2;

	var _obj = SceneObject.AddObject(_objIndex, 1, _x, _y);
	_obj.SelectOn();
	this.app.stage.addChild(_obj.sprite);
};

module.exports = SceneView;