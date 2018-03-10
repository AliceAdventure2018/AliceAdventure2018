'use strict';

const PIXI = require('../../../Resources/pixi');
const GameProperties = require('./GameProperties');
const Event = require('./Event');
const View = require('./View');
const SceneObject = require('./SceneObject');

// class
var SceneView;

// variables
SceneView = function(_bindElementID, _height = -1, _width = -1){
	View.call(this, "SceneView", _height, _width, _bindElementID);

	this.app = null;
	this.vModel = null;
};
SceneView.prototype = new View();

// static
SceneView.NewView = function(_elementID){
	var view = new SceneView(_elementID);
	view.InitView();
	return view;
}

// functions
SceneView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// Init data binding
	this.vModel = new Vue({
		el: '#scene-view',
		data: {
			projectLoaded: false,
			assetName: ''
		}, 
		methods: {
		}
	});
	// Init app
	this.app = new PIXI.Application({
		width: 600,
		height: 400, 
		antialiasing: true, 
		backgroundcolor: 0xFFFFFF
	});
	document.getElementById(this.bindElementID).appendChild(this.app.view);


	// events
	Event.AddListener('reload-project', ()=>{this.ReloadView();});
	Event.AddListener('add-gallery-object', (_obj)=>{this.TestAddObject(_obj);});
};

SceneView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method
	this.app.stage.removeChildren();
	if (GameProperties.instance == null){ // no project is loaded
		this.vModel.projectLoaded = false;
	} else { // load current project
		this.vModel.projectLoaded = true;
		for (let i in GameProperties.instance.objectList){
			this.app.stage.addChild(GameProperties.instance.objectList[i].sprite);
		}
	}
}

SceneView.prototype.TestAddObject = function(_objInfo){ // test
	var _obj = SceneObject.AddObject(_objInfo, 1, this.app.screen.width / 2, this.app.screen.height / 2);
	_obj.SelectOn();
	this.app.stage.addChild(_obj.sprite);
};

module.exports = SceneView;