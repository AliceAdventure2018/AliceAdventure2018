'use strict';
const {PATH, ELECTRON, PROMPT, FS, Debug, ID, Event} = require('./Utilities/Utilities');
const Compiler = require('../../../Compiler/Compiler'); // TODO
const GameProperties = require('./GameProperties');
const Scene = require('./Scene');
const SceneObject = require('./SceneObject');
const State = require('./State');
const Interaction = require('./Interaction');
const Sound = require('./Sound');
const Image = require('./Image');
const View = require('./View');

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

File.tempJsonObj = {
	sceneList: [],
	objectList: [], 
	interactionList: [],
	stateList: [],
    soundList: [],
	settings: {}, 
	projectData: {}, 
	reset: function(){
		this.sceneList = [];
		this.objectList = [];
		this.interactionList = [];
		this.stateList = [];
		this.soundList = [];
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
			// Default settings
			let firstScene = Scene.AddScene("First scene");
			
			Event.Broadcast("reload-project");

			View.Selection.selectScene(firstScene);
		}
	});
};

File.SaveProject = function(){
	if (File.instance == null){return;}
	if (File.instance.path == null){ // No path saved
		// Open file selector
		ELECTRON.dialog.showSaveDialog({
			title: 'Select folder',  
			defaultPath: File.instance.gameProperties.settings.projectName, 
			buttonLabel: 'Save', 
			filters: [{ name: 'AliceAdventureProject', extensions: [File.extension] }]
		}, (_path)=>{ // callback
			if (_path == null) return;
			File.SaveToPath(_path);
		});
	} else { // Has path saved
		File.SaveToPath(File.instance.path);
	}
};

File.SaveAsNewProject = function(callback){
	if (File.instance == null){return;}
	// open file selecter
	ELECTRON.dialog.showSaveDialog({
		title: 'Select folder',  
		defaultPath: File.instance.gameProperties.settings.projectName, 
		buttonLabel: 'Save', 
		filters: [{name: 'AliceAdventureProject', extensions: [File.extension]}], 
		properties: ['openFile', 'createDirectory']
	}, (_path)=>{ // callback
		if (_path == null) return;
		File.SaveToPath(_path);
		if (typeof callback == "function"){
			callback();
		}
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
	if (confirm("Are you sure to close this project? \nUnsaved changes may be lost. ")){ // test
		File.instance = null;
		GameProperties.instance = null;
		Event.Broadcast("reload-project")
	}
}

File.BuildProject = function(){
	if (File.instance == null) return;
	// check if project saved
	if (File.instance.path == null){ // no existing file
		if (confirm('Your project is unsaved. \nSave it first?')){
			File.SaveAsNewProject(()=>{File.Build()});
		} else {
			return;
		}
	} else {
		File.SaveToPath(File.instance.path);
		File.Build();
	}	
}

File.RunProject = function(){
	// TODO
	Debug.LogError("Function not implemented");
}

File.ImportAssets = function(){
	ELECTRON.dialog.showOpenDialog({
		title: 'Import assets',  
		defaultPath: '', 
		buttonLabel: 'Import', 
		filters: [{name: 'Audio', extensions: ['mp3', 'wav']}, {name: 'Image', extensions: ['png', 'jpg', 'jpeg']}], 
		properties: ['openFile', 'multiSelections']
	}, (_paths)=>{ // callback
		if (_paths == null) return;
		_paths.forEach((path)=>{ 
			switch (path){
				case 'mp3':
				case 'wav':
					Sound.NewSound(PATH.basename(path, PATH.extname(path)), path);
					break;
				case 'png':
				case 'jpg':
				case 'jpeg':
					Image.ImportImage(path);
					break;
				default:
					break;
			}
		});
	});	
}

File.ImportSound = function(){ // test
	ELECTRON.dialog.showOpenDialog({
		title: 'Import sound',  
		defaultPath: '', 
		buttonLabel: 'Import', 
		filters: [{name: 'Audio', extensions: ['mp3', 'wav']}], 
		properties: ['openFile', 'multiSelections']
	}, (_paths)=>{ // callback
		if (_paths == null) return;
		_paths.forEach((path)=>{ 
			Sound.NewSound(PATH.basename(path, PATH.extname(path)), path);
		});
	});	
}

File.ImportImage = function(){ // test
	ELECTRON.dialog.showOpenDialog({
		title: 'Import image',  
		defaultPath: '', 
		buttonLabel: 'Import', 
		filters: [{name: 'Image', extensions: ['png', 'jpg', 'jpeg']}], 
		properties: ['openFile', 'multiSelections']
	}, (_paths)=>{ // callback
		if (_paths == null) return;
		_paths.forEach((path)=>{ 
			Image.ImportImage(path);
		});
	});	
}

File.SaveToPath = function(_path){
	console.log("Save to " + _path);
	File.instance.path = _path;
	File.tempJsonObj.reset();

	// sceneList
	GameProperties.instance.sceneList.forEach((scene)=>{
		File.tempJsonObj.sceneList.push(scene.toJsonObject());
	});

	// objectList
	GameProperties.instance.objectList.forEach((obj)=>{
		File.tempJsonObj.objectList.push(obj.toJsonObject());
	});

    // interationList
    GameProperties.instance.interactionList.forEach(function(interaction) {
        File.tempJsonObj.interactionList.push(interaction.toJsonObject());
    });
    
    // stateList
    GameProperties.instance.stateList.forEach(function(state) {
        File.tempJsonObj.stateList.push(state.toJsonObject());
    });
    
    // soundList
    GameProperties.instance.soundList.forEach(function(sound){
    	File.tempJsonObj.soundList.push(sound.toJsonObject());
    });
    
	// settings
	File.tempJsonObj.settings = GameProperties.instance.settings;

	// projData
	File.tempJsonObj.projectData.idCounter = ID._counter;
    
	// Write JSON file
	FS.writeJsonSync(File.instance.path, File.tempJsonObj, {spaces:'\t', EOL:'\n'});

	// Ensure has Assets folder
	//FS.ensureDir(PATH.dirname(File.instance.path) + '/Assets/');
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
	if (data.sceneList != null){
	    data.sceneList.forEach((scene)=>{
	        Scene.LoadScene(scene);
	    });
	}

	// ObjectList
	if (data.objectList != null){
	    data.objectList.forEach((object)=>{
	        SceneObject.LoadObject(object);
	    });
	}
    
    //stateList
    if (data.stateList != null){
	    data.stateList.forEach((state)=>{
	        State.LoadState(state);
	    });
	}
	    
    // Sound
    if (data.soundList != null){
	    data.soundList.forEach((sound)=>{
	    	Sound.LoadSound(sound);
	    });   
	} 
    
    //Interaction
    if (data.interactionList != null){
	    data.interactionList.forEach((interaction)=>{
	        Interaction.LoadInteraction(interaction);
	    });
    }

	// Settings
	File.instance.gameProperties.resWidth = data.settings.resWidth; 
	File.instance.gameProperties.resHeight = data.settings.resHeight; 
	File.instance.gameProperties.inventoryGridNum = data.settings.inventoryGridNum;
	File.instance.gameProperties.startScene = data.settings.startScene; 
	File.instance.gameProperties.projectName = data.settings.projectName;

	// ProjData
	ID.setCounter(data.projectData.idCounter);

	Event.Broadcast("reload-project");
}

File.Build = function(){
	var compiler = new Compiler(File.instance.path, (_err)=>{ Debug.LogError(_err); });
	if (compiler.build((_err)=>{ Debug.LogError(_err); })){ // success
		Debug.Log("Build succeeded")
	} else { // fail
		Debug.Log("Build failed with error");
	}
}
module.exports = File;