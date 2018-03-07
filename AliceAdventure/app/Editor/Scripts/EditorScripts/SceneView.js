'use strict';

const PIXI = require('../../../Resources/pixi');
const GameProperties = require('./GameProperties');
const Event = require('./Event');
const View = require('./View');
const SceneObject = require('./SceneObject');

// class
var SceneView;

// variables
SceneView = function(_height = -1, _width = -1){
	View.call(this, "SceneView", _height, _width);

	this.app = null;
};
SceneView.prototype = new View();

// static
SceneView.NewView = function(_bindElement){
	var view = new SceneView();
	view.InitView(_bindElement);
	return view;
}

// functions
SceneView.prototype.InitView = function(_bindElement){
	View.prototype.InitView.apply(this); // call super method
	this.bindElement = _bindElement;
	this.app = new PIXI.Application({
		width: 600,
		height: 400, 
		antialiasing: true, 
		backgroundcolor: 0xFFFFFF
	});
	if (!_bindElement) _bindElement = document.getElementById('scene-view');
	_bindElement.appendChild(this.app.view);

	// events
	Event.AddListener('reload-project', ()=>{this.ReloadView();})
};

SceneView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method
	this.app.stage.removeChildren();
	if (GameProperties.instance == null){ // no project is loaded
		// do nothing
	} else { // load current project
		for (let i in GameProperties.instance.objectList){
			this.app.stage.addChild(GameProperties.instance.objectList[i].sprite);
		}
	}
}

SceneView.prototype.TestAddObject = function(_objIndex, _x, _y){ // test

	if (_x == undefined) _x = this.app.screen.width / 2;
	if (_y == undefined) _y = this.app.screen.height / 2;

	var _obj = SceneObject.AddObject(_objIndex, 1, _x, _y);
	_obj.SelectOn();
	this.app.stage.addChild(_obj.sprite);
};

module.exports = SceneView;