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
			deleteObject: (object)=>{if(confirm("Are you sure to delete the object?\nYou may not be able to recover it.")) object.DeleteThis()},
			deleteScene: (scene)=>{if(confirm("Are you sure to delete the scene?\nYou may not be able to recover it.\n\nWARNING: All the objects in the scene will also be deleted. Please move the objects under the other scenes if you need them.")) scene.DeleteThis()},

			changeName: (event, thing)=>{if (thing.name != null) thing.name = event.target.innerHTML}, 
			changeScene: (obj, toScene)=>{obj.SwitchScene(toScene);},

			back: ()=>{/*Event.Broadcast("reload-project")*/},
			next: ()=>{/*Event.Broadcast("reload-project")*/},
			skip: ()=>{File.SaveProject((path)=>{IPC.send('complete-tut', path);});},
			finish: ()=>{File.SaveProject((path)=>{IPC.send('complete-tut', path);});},
			exit: ()=>{IPC.send('exit');}
		}
	});

	Event.AddListener('reload-project', ()=>{this.ReloadView();});
	Event.AddListener('delete-scene', (id)=>{this.HandleDeleteScene(id);});
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
	var _obj = SceneObject.AddEmptyObject(_name, null);
	_obj.isCharacter = _isCharacter;
};

TutorialView.prototype.AddScene = function(_name){
	var _scene = Scene.AddScene(_name);
	//this.app.stage.addChild(_scene.container);
};

TutorialView.prototype.HandleDeleteScene = function(_id){
	if (GameProperties.instance.settings.startScene == _id){
		GameProperties.instance.settings.startScene = GameProperties.instance.sceneList[0].id;
	}
};

module.exports = TutorialView;