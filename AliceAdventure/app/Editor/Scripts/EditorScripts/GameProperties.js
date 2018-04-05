'use strict';

// class
var GameProperties;
GameProperties = function(){
	this.sceneList = [];
	this.objectList = [];
	this.interactionList = [];
	this.stateList = [];
    this.soundList = [];
	this.settings = {
		resWidth: 640, 
		resHeight: 360, 
		inventoryGridNum: 5,
		projectName: "untitled"
	};
	this.projectData = {
		idCounter: 0
	};

	GameProperties.instance = this;
};

// singleton
GameProperties.instance = null;

// static functions
GameProperties.ProjectLoaded = function(){
	return (GameProperties.instance != null);
};

GameProperties.GetSceneById = function(_id){
	if (GameProperties.instance == null) return null;
	for (let i in GameProperties.instance.sceneList){
		if (GameProperties.instance.sceneList[i].id == _id){
			return GameProperties.instance.sceneList[i];
		}
	}
	return null;
};
GameProperties.GetObjectById = function(_id){
	if (GameProperties.instance == null) return null;
	for (let i in GameProperties.instance.objectList){
		if (GameProperties.instance.objectList[i].id == _id){
			return GameProperties.instance.objectList[i];
		}
	}
	return null;
};
GameProperties.GetInteractionById = function(_id){
	if (GameProperties.instance == null) return null;
	for (let i in GameProperties.instance.interactionList){
		if (GameProperties.instance.interactionList[i].id == _id){
			return GameProperties.instance.interactionList[i];
		}
	}
	return null;
};
GameProperties.GetStateById = function(_id){
	if (GameProperties.instance == null) return null;
	for (let i in GameProperties.instance.stateList){
		if (GameProperties.instance.stateList[i].id == _id){
			return GameProperties.instance.stateList[i];
		}
	}
	return null;
};
GameProperties.GetSoundById = function(_id){
	if (GameProperties.instance == null) return null;
	for (let i in GameProperties.instance.soundList){
		if (GameProperties.instance.soundList[i].id == _id){
			return GameProperties.instance.soundList[i];
		}
	}
	return null;
};

GameProperties.AddScene = function(_scene){
	if (GameProperties.instance == null) return false;
	GameProperties.instance.sceneList.push(_scene);
	return true;
};
GameProperties.DeleteScene = function(_scene){
	if (GameProperties.instance == null) return false; 
	var i = GameProperties.instance.sceneList.indexOf(_scene);
	if (i >= 0){
		GameProperties.instance.sceneList.splice(i, 1);
		return true;
	}
	return false;
};

GameProperties.AddObject = function(_obj){
	if (GameProperties.instance == null) return false;
	GameProperties.instance.objectList.push(_obj);
	return true;
};
GameProperties.DeleteObject = function(_obj){
	if (GameProperties.instance == null) return false; 
	var i = GameProperties.instance.objectList.indexOf(_obj);
	if (i >= 0){
		GameProperties.instance.objectList.splice(i, 1);
		return true;
	}
	return false;
};

GameProperties.AddInteraction = function(_ntra){
	if (GameProperties.instance == null) return false;
	GameProperties.instance.interactionList.push(_ntra);
	return true;
};
GameProperties.DeleteInteraction = function(_ntra){
	if (GameProperties.instance == null) return false; 
	var i = GameProperties.instance.interactionList.indexOf(_ntra);
	if (i >= 0){
		GameProperties.instance.interactionList.splice(i, 1);
		return true;
	}
	return false;
};

GameProperties.AddState = function(_state){
	if (GameProperties.instance == null) return false;
	GameProperties.instance.stateList.push(_state);
	return true;
};
GameProperties.DeleteState = function(_state){
	if (GameProperties.instance == null) return false; 
	var i = GameProperties.instance.stateList.indexOf(_state);
	if (i >= 0){
		GameProperties.instance.stateList.splice(i, 1);
		return true;
	}
	return false;
};

GameProperties.AddSound = function(_sound){
	if (GameProperties.instance == null) return false;
	GameProperties.instance.soundList.push(_sound);
	return true;
};
GameProperties.DeleteSound = function(_sound){
	if (GameProperties.instance == null) return false; 
	var i = GameProperties.instance.soundList.indexOf(_sound);
	if (i >= 0){
		GameProperties.instance.soundList.splice(i, 1);
		return true;
	}
	return false;
};

module.exports = GameProperties;