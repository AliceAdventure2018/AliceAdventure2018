'use strict';

// class
var GameProperties;
GameProperties = function(){
	this.sceneList = [];
	this.objectList = [];
	this.settings = {
		resWidth: 1280, 
		resHeight: 720, 
		inventoryGridNum: 5,
		projectName: "untitled"
	};

	GameProperties.instance = this;
};

// singleton
GameProperties.instance = null;

// static functions
GameProperties.GetSceneById = function(_id){
	if (GameProperties.instance == null) return null;
	for (let i in GameProperties.instance.sceneList){
		if (GameProperties.instance.sceneList[i].id == _id){
			return GameProperties.instance.sceneList[i];
		}
	}
	return null;
}
GameProperties.GetObjectById = function(_id){
	if (GameProperties.instance == null) return null;
	for (let i in GameProperties.instance.objectList){
		if (GameProperties.instance.objectList[i].id == _id){
			return GameProperties.instance.objectList[i];
		}
	}
	return null;
}
GameProperties.AddScene = function(_scene){
	if (GameProperties.instance == null) return false;
	GameProperties.instance.sceneList.push(_scene);
	return true;
};
GameProperties.DeleteScene = function(_scene){
	if (GameProperties.instance == null) return; 
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
	if (GameProperties.instance == null) return; 
	var i = GameProperties.instance.objectList.indexOf(_obj);
	if (i >= 0){
		GameProperties.instance.objectList.splice(i, 1);
		return true;
	}
	return false;
};

module.exports = GameProperties;