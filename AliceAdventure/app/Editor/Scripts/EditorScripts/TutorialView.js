'use strict';

const {IPC, Event} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');
const Scene = require('./Scene');
const SceneObject = require('./SceneObject');
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
			addScene: ()=>{Scene.AddScene("new scene")},
			addObject: ()=>{SceneObject.AddEmptyObject("new object")}, 

			changeName: (event, thing)=>{if (thing.name != null) thing.name = event.target.innerHTML}, 

			newProj: ()=>{File.NewEmptyProject(()=>{/*IPC.send('new-proj');*/});}, 
			openProj: ()=>{File.OpenProject(()=>{IPC.send('open-proj');});}, 
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

module.exports = TutorialView;