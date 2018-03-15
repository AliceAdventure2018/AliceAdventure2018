'use strict';
const PATH = require('path');
const ELECTRON = require('electron').remote;
const PROMPT = require('electron-prompt');
const FS = require('fs-extra');
//const Compiler = require(''); // TODO
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

File.extension = "aap"; // the extension for our project

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

File.NewProject = function(_template = null){ // TODO: load from template
	if (File.instance != null){ // have opened proj
		File.CloseProject();
	}
	PROMPT({
		title: "New project", 
		label: "Input new project name: ", 
		value: "untitled-project", 
	}).then((_name)=>{
		if (_name != null) {
			new File(null, new GameProperties());
			File.instance.gameProperties.settings.projectName = _name;
			Event.Broadcast("reload-project");
		}
	})
};

File.SaveProject = function(){
	if (File.instance == null){
		return;
	}
	if (File.instance.path == null){ // No path saved
		// Open file selector
		ELECTRON.dialog.showSaveDialog({
			title: 'Select folder',  
			defaultPath: File.instance.gameProperties.settings.projectName, 
			buttonLabel: 'Select', 
			filters: [{ name: 'AliceAdventureProject', extensions: [File.extension] }]
		}, (_path)=>{ // callback
			if (_path == null) return;
			File.SaveToPath(_path);
		});
	} else { // Has path saved
		File.SaveToPath(File.instance.path);
	}
};

File.SaveAsNewProject = function(){
	if (File.instance == null){
		return;
	}
	// open file selecter
	ELECTRON.dialog.showSaveDialog({
			title: 'Select folder',  
			defaultPath: File.instance.gameProperties.settings.projectName, 
			buttonLabel: 'Select', 
			filters: [{name: 'AliceAdventureProject', extensions: [File.extension]}], 
			properties: ['openFile', 'createDirectory']
		}, (_path)=>{ // callback
			if (_path == null) return;
			File.SaveToPath(_path);
		});
}

File.OpenProject = function(){
	if (File.instance != null){ // have opened proj
		File.CloseProject();
	}

	// Open file selector
	ELECTRON.dialog.showOpenDialog({
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

File.BuildProject = function(){
	// TODO
	Debug.LogError("Function not implemented");
}

File.RunProject = function(){
	// TODO
	Debug.LogError("Function not implemented");
}

File.SaveToPath = function(_path){
	console.log("Save to " + _path);
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
		let _d = {
			id: _o.id, 
			name: _o.name, 
			src: _o.src, 
			pos: {x: Number(_o.sprite.x), y: Number(_o.sprite.y)}, 
			anchor: {x: Number(_o.sprite.anchor.x), y: Number(_o.sprite.anchor.y)}, 
			scale: {x: Number(_o.sprite.scale.x), y: Number(_o.sprite.scale.y)}, 
			active: _o.sprite.visible, 
			interactive: _o.interactive, 
			bindScene: _o.bindScene.id, 
			properties: _o.properties, 
		};
		File.tempDataObj.objectList.push(_d);
	}

	// Settings
	File.tempDataObj.settings = GameProperties.instance.settings;

	// ProjData
	File.tempDataObj.projectData.idCounter = ID._counter;

	// Write JSON file
	FS.writeJsonSync(File.instance.path, File.tempDataObj, {spaces:'\t', EOL:'\n'});

	// Ensure has Assets folder
	FS.ensureDir(PATH.dirname(File.instance.path) + '/Assets/');
}

File.OpenFromPath = function(_path){

	// Load JSON file
	new File(_path, new GameProperties());
	let data = FS.readJsonSync(_path); 

	if (data == null){
		Debug.LogError("File doesn't exist");
		return;
	}

	// SceneList
	for (let i in data.sceneList){
		let _d = data.sceneList[i];
		Scene.LoadScene(_d);
	}

	// ObjectList
	for (let i in data.objectList){
		let _d = data.objectList[i];
		SceneObject.LoadObject(_d);
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