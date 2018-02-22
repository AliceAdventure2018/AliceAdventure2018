'use strict';

// class
var GameProperties;
GameProperties = function(){};

// static variables

GameProperties.SceneList = [];

GameProperties.SceneObjectList = [];
GameProperties.SceneObjectList.Delete = function(_obj){
	var i = GameProperties.SceneObjectList.indexOf(_obj);
	if (i >= 0){
		GameProperties.splice(i, 1);
		return true;
	}
	return false;
}

GameProperties.HasInventory = false;
// other properties

module.exports = GameProperties;