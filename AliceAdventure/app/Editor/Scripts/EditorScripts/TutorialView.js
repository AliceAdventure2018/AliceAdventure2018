'use strict';

const {IPC, Event} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');
const Scene = require('./Scene');
const SceneObject = require('./SceneObject');
const File = require('./File');
const View = require('./View');

// class
var TutorialView; // working on this

// variables
TutorialView = function(_bindElementID, _height = -1, _width = -1){
	View.call(this, "TutorialView", _height, _width, _bindElementID);
	this.vModel = null;
};
TutorialView.prototype = new View();

// static
TutorialView.NewView = function(_elementID){
	var view = new TutorialView(_elementID);
	view.InitView();
	return view;
};

// functions
TutorialView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// init data binding
	this.vModel = new Vue({
		el: '#' + this.bindElementID,
		data: {
			sceneList: null,
			objectList: null,
			projectName: null,
		}, 
		methods: {
			addScene: ()=>{this.AddScene("new scene")},
			addObject: ()=>{this.AddEmptyObject("new object")}, 
			addCharacter: ()=>{this.AddEmptyObject("new object", true)}, 
			deleteThing: (thing)=>{thing.DeleteThis()},

			changeName: (event, thing)=>{if (thing.name != null) thing.name = event.target.innerHTML}, 
			changeScene: (obj, toScene)=>{obj.SwitchScene(toScene);},

			back: ()=>{Event.Broadcast("reload-project")},
			next: ()=>{Event.Broadcast("reload-project")},
			skip: ()=>{File.SaveProject((path)=>{IPC.send('complete-tut', path);});},
			finish: ()=>{File.SaveProject((path)=>{IPC.send('complete-tut', path);});},
			exit: ()=>{IPC.send('exit');}
		}
	});

	Event.AddListener('reload-project', ()=>{this.ReloadView();});
};

TutorialView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method
	if (GameProperties.instance == null){ // no proj loaded
		this.vModel.sceneList = null;
		this.vModel.objectList = null;
		this.vModel.projectName = null;
	} else { // proj loaded
		this.vModel.sceneList = GameProperties.instance.sceneList;
		this.vModel.objectList = GameProperties.instance.objectList;
		this.vModel.projectName = GameProperties.instance.settings.projectName;
	}
};

TutorialView.prototype.AddEmptyObject = function(_name, _isCharacter = false){
	var _obj = SceneObject.AddEmptyObject(_name, {id: 0});
	_obj.isCharacter = _isCharacter;
};

TutorialView.prototype.AddScene = function(_name){
	var _scene = Scene.AddScene(_name);
	//this.app.stage.addChild(_scene.container);
};

module.exports = TutorialView;