'use strict';

const {PIXI, PROMPT, Event} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');
const Scene = require('./Scene');
const SceneObject = require('./SceneObject');
const View = require('./View');

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
};

// functions
SceneView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// Init data binding
	this.vModel = new Vue({
		el: '#' + this.bindElementID,
		data: {
			projectLoaded: false
		}, 
		methods: {
			addScene: ()=>{this.AddScene();},
			assetDragover: (ev)=>{View.HandleDragover(ev, View.DragInfo.GalleryImage);},
			assetDrop: (ev)=>{View.HandleDrop(ev, View.DragInfo.GalleryImage, (data)=>{this.AddObject(data);});},
		}
	});
	// Init app
	this.app = new PIXI.Application({
		width: 480,
		height: 360, 
		antialiasing: true, 
		backgroundcolor: 0xFFFFFF
	});
	document.getElementById('canvas-container').appendChild(this.app.view);
	GameProperties.SetViewSize(480, 360);

	// events
	Event.AddListener('reload-project', ()=>{this.ReloadView();});
	Event.AddListener('add-gallery-object', (_obj)=>{this.AddObject(_obj);});
	Event.AddListener('object-sprite-click', (_obj)=>{this.SelectObject(_obj);});
};

SceneView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method
	this.app.stage.removeChildren();
	if (GameProperties.instance == null){ // no project is loaded
		this.vModel.projectLoaded = false;
	} else { // load current project
		this.vModel.projectLoaded = true;
		for (let i in GameProperties.instance.sceneList){
			this.app.stage.addChild(GameProperties.instance.sceneList[i].container);
		}
		for (let i in GameProperties.instance.objectList){
			GameProperties.instance.objectList[i].bindScene.container.addChild(GameProperties.instance.objectList[i].sprite);
		}
	}
};

SceneView.prototype.AddObject = function(_objInfo){
	if (View.Selection.scene == null) return;
	var _bindScene = View.Selection.scene;
	var _obj = SceneObject.AddObject(_objInfo, _bindScene, this.app.screen.width / 2, this.app.screen.height / 2);
	this.SelectObject(_obj);
	//this.app.stage.addChild(_obj.sprite);
	_bindScene.container.addChild(_obj.sprite);
};

SceneView.prototype.AddScene = function(_name = null){
	var _scene;
	if (_name == null){
		PROMPT({
			title: "New scene", 
			label: "Input scene name: ", 
			value: "new-scene"
		}).then((_name)=>{
			if (_name != null) {
				_scene = Scene.AddScene(_name);
				this.SelectScene(_scene);
				this.app.stage.addChild(_scene.container);
			}
		});
	} else {
		_scene = Scene.AddScene(_name);
		this.SelectScene(_scene);
		this.app.stage.addChild(_scene.container);
	}
};

SceneView.prototype.SelectObject = function(_obj){
	// Select this object
	if (_obj.selectAllowed){
		View.Selection.selectObject(_obj);
	}
};

SceneView.prototype.SelectScene = function(_scn){
	// Select this object
	View.Selection.selectScene(_scn);
};

module.exports = SceneView;