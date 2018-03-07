'use strict';
const path = require('path');
const electron = require('electron').remote;
const fs = require('fs-extra');
const Debug = require('./Debug');
const ID = require('./ID');
const GameProperties = require('./GameProperties');
const Event = require('./Event');
const Scene = require('./Scene');
const SceneObject = require('./SceneObject');

// class
var File;

// variables
File = function(_path, _gameProperties){
	this.path = _path;
	this.gameProperties = _gameProperties;

	File.instance = this;
};

File.instance = null;

File.extension = "json"; // the extension for our project

File.tempDataObj = {
	sceneList: [],
	objectList: [], 
	settings: {}, 
	projectData: {}, 
	reset: function(){
		this.sceneList = [];
		this.objectList = [];
		this.settings = {};
		this.projectData = {};
	}
};

File.NewProject = function(_name = "untitled-project", _template = null){ // TODO: load from template
	if (File.instance != null){ // have opened proj
		File.CloseProject();
	}
	new File(null, new GameProperties());
	File.instance.gameProperties.settings.projectName = _name;
	Event.Broadcast("reload-project");
};

File.SaveProject = function(){
	if (File.instance == null){
		return;
	}
	if (File.instance.path == null){ // No path saved
		// Open file selector
		electron.dialog.showSaveDialog({
			title: 'Select folder',  
			defaultPath: File.instance.gameProperties.settings.projectName, 
			buttonLabel: 'Select', 
			filters: [{name: 'AliceAdventureProject', extensions: [File.extension]}], 
			properties: ['openFile', 'createDirectory']
		}, (_path)=>{ // callback
			if (_path == null) return;
			File.SaveToPath(_path);
		});
	} else { // Has path saved
		File.SaveToPath(File.instance.path);
	}
};

File.OpenProject = function(){
	if (File.instance != null){ // have opened proj
		File.CloseProject();
	}

	// Open file selector
	electron.dialog.showOpenDialog({
		title: 'Select project',  
		defaultPath: '', 
		buttonLabel: 'Select', 
		filters: [{name: 'AliceAdventureProject', extensions: [File.extension]}], 
		properties: ['openFile']
	}, (_paths)=>{ // callback
		if (_paths == null) return;
		File.OpenFromPath(_paths[0]);
	});	
};

File.CloseProject = function(){
	if (File.instance == null){
		return; // No project loaded
	}
	// TODO: confirm to close unsaved proj
	if (confirm("Are you sure to close this project? \nUnsaved changes may be lost. ")){ // test
		File.instance = null;
		GameProperties.instance = null;
		Event.Broadcast("reload-project")
	}
}

File.SaveToPath = function(_path){
	console.log("save to " + _path);
	File.instance.path = _path;
	File.tempDataObj.reset();

	// SceneList
	for (let i in GameProperties.instance.sceneList){
		let _s = GameProperties.instance.sceneList[i];
		let _d = {
			id: _s.id, 
			name: _s.name
		};
		File.tempDataObj.sceneList.push(_d);
	}

	// ObjectList
	for (let i in GameProperties.instance.objectList){
		let _o = GameProperties.instance.objectList[i];
		console.log(_o.sprite.x);
		let _d = {
			id: _o.id, 
			name: _o.name, 
			src: _o.src, 
			anchor: {x: _o.sprite.anchor.x, y: _o.sprite.anchor.y}, 
			x: _o.sprite.x, 
			y: _o.sprite.y, 
			scale: {x: _o.sprite.scale.x, y: _o.sprite.scale.y}, 
			interactive: true, 
			buttonMode: true,
			properties: _o.properties, 
			bindScene: _o.bindScene, 

			target: null, 

			funct: []
		};
		File.tempDataObj.objectList.push(_d);
	}

	// Settings
	File.tempDataObj.settings = GameProperties.instance.settings;

	// ProjData
	File.tempDataObj.projectData.idCounter = ID._counter;

	// Write JSON file
	fs.writeJsonSync(File.instance.path, File.tempDataObj, {spaces:'\t', EOL:'\n'});
}

File.OpenFromPath = function(_path){

	// Load JSON file
	new File(_path, new GameProperties());
	let data = fs.readJsonSync(_path); 

	if (data == null){
		Debug.LogError("File doesn't exist");
		return;
	}

	// SceneList
	for (let i in data.sceneList){
		let _d = data.sceneList[i];
		let _s = new Scene(_d.id, _d.name);
		// TODO
	}

	// ObjectList
	for (let i in data.objectList){
		let _d = data.objectList[i];
		let _o = new SceneObject(_d.id, _d.name, _d.bindScene);
		_o.properties = _d.properties;
		_o.InitSprite(_d.src, _d.x, _d.y, _d.scale.x, _d.scale.y, true);
	}

	// Settings
	File.instance.gameProperties.resWidth = data.settings.resWidth; 
	File.instance.gameProperties.resHeight = data.settings.resHeight; 
	File.instance.gameProperties.inventoryGridNum = data.settings.inventoryGridNum;
	File.instance.gameProperties.projectName = data.settings.projectName;

	// ProjData
	ID.setCounter(data.projectData.idCounter);

	Event.Broadcast("reload-project");
}
module.exports = File;