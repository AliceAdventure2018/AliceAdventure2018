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

SceneView.prototype.AddObject = function(_object){
	// test
	let _obj = new SceneObject("Bunny", this.app.screen.width / 2, this.app.screen.height / 2, true, {age: 8});
	this.app.stage.addChild(_obj.sprite);
	// TODO: add to GameProperties.SceneObjectList
};

module.exports = SceneView;