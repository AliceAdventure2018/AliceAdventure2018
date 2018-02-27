'use strict';

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

File.tempDataObj = {
	sceneList: [],
	objectList: [], 
	settings: {}, 
	projectData: {}
};

File.New = function(_name, _template = null){ // TODO: load from template
	if (File.instance != null){ // have opened proj
		File.Close();
	}
	new File(null, new GameProperties());
	File.instance.gameProperties.settings.name = _name;
	Event.Broadcast("reload-project");
};

File.Save = function(){
	if (File.instance.path == null){
		// TODO: choose path
		File.instance.path = "./" + File.instance.gameProperties.settings.name + ".json"; // test
	}

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
	for (let i in GameProperties.instance.sceneObjectList){
		let _o = GameProperties.instance.sceneObjectList[i];
		let _d = {
			id: _o.id, 
			name: _o.name, 
			src: _o.src, 
			anchor: {x: _o.sprite.anchor.x, y: _o.sprite.anchor.y}, 
			x: _o.x, 
			y: _o.y, 
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
};

File.Load = function(_path){
	if (File.instance != null){ // have opened proj
		File.Close();
	}
	new File(_path, new GameProperties);

	// Load JSON file
	let data = fs.readJsonSync(_path); // TODO: detect if file exist

	if (data == null){
		Debug.LogError("File doesn't exist");
		return;
	}

	// SceneList
	for (let i in data.sceneList){
		let _d = data.sceneList[i];
		let _s = new Scene(_d.id, _d.name);
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
};

File.Close = function(){
	if (File.instance == null){
		return; // No project loaded
	}
	// TODO: confirm to close unsaved proj
	if (confirm("Are you sure to close this project? \nUnsaved changes may be lost. ")){ // test
		File.instance = null;
		GameProperties.instance = null;
		//Event.Broadcast("reload-project")
	}
}

module.exports = File;