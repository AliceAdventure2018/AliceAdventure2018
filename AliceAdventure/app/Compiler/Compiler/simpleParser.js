/*global require*/
//asychronous fs+JSON.parser version

'use strict';

const fs = require('fs-extra');

var Parser;
Parser= function(){};

Parser.game = fs.readJsonSync('example.json');
Parser.sceneList = Parser.game.sceneList;
Parser.objectList = Parser.game.objectList;
Parser.settings = Parser.game.settings;

Parser.createGame = function(){
	return 'var myGame = new GameManager();\n myGame.init(' + settings.resWidth + ',' 
															+ settings.resHeight + ',' 
															+ setting.inventoryGridNum + ');\n';
}

Parser.createScene= function(sceneName){
	return 'var ' + sceneName + '= new PIXI.Container();\n' + 'mayGame.addScene(' +  sceneName + ');'; 
}

//**************************Object Properties************************************
//Must Have:
// src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID

//*********obj is the (name + id) of the object in the json file********
//src must be a valid path to a image file.

Parser.addObjectToScene= function(obj, sceneParent){
	return sceneParent + '.addChild(' + obj + ');';
}

Parser.createPIXIObject= function(obj, src){
	return 'var '+ obj + '= PIXI.Sprite.fromImage('+src + ');\n';
}
//
Parser.setAnchor=function(obj, num){
	return obj + '.anchor.set('+num+');\n';
}

Parser.setScale=function(obj, scale){
	return obj + '.scale.set(' + scale + ');\n';
}

//interactive or buttonMode should be boolean
Parser.setInteractive=function(obj, interactive){
	return obj + '.interactive = ' + interactive + ';\n';
}

Parser.setButtonMode=function(obj, buttonMode){
	return obj + '.buttonMode = ' + buttonMode + ';\n';
}

Parser.getNameWithID=function(obj, id){
	return obj + id;
}

Parser.setPos=function(obj, pos){
	return obj+'.x = ' + pos[0] + ';\n' + obj+'.y = ' + pos[1]+';\n';
}

Parser.setTarget=function(obj, target){
	return obj + '.target = ' + target + ';\n';
}

//arg is an array of arguments. It can be empty.
Parser.createFunction=function(obj, functName, arg, body){
	
	return obj + '.' + functName + '= Parser.(' + arg + '){\n'+ body + '}\n\n';
}

Parser.createFunctionList=function(obj, functList){

	var toReturn = ''; 
	var arrayLength = functList.length;
	for (let i = 0; i < arrayLength; i++){
		toReturn += Parser.createFunction(obj, functList[i][0], functList[i][1], functList[i][2]);
	}
	return toReturn;
}

Parser.createSelfDefinedVar=function(obj, selfDefinedVar, selfDefinedTarget){
	return obj + '.' + selfDefinedVar + ' = ' + selfDefinedTarget + ';\n';
}

Parser.translateObj=function(object, key){
	var name = Parser.getNameWithID(object.name, object.id);
	var toReturn ='';
	switch (key){
		case "id": break;
		case "src": toReturn  = Parser.createPIXIObject(name, object[key]); break;
		case "anchor" : toReturn  = Parser.setAnchor(name, object[key]); break;
		case "scale" : toReturn = Parser.setScale(name, object[key]); break;
		case "interactive" : toReturn = Parser.setInteractive(name, object[key]);break;
		case "buttonMode" : toReturn = Parser.setButtonMode(name, object[key]); break;
		case "pos" : toReturn = Parser.setPos(name, object[key]); break;
		case "funct" : toReturn = Parser.createFunctionList(name, object[key]); break;
		case "name" : break;
		case "sceneParent": Parser.addObjectToScene(name, object[key]);
		default:
			//console.log('others');
		//need to do something else
			toReturn = Parser.createSelfDefinedVar(name, key, object[key]);
			break;
	}
	return toReturn;
}


//iterate through the objectList
Parser.readObjects = function(){

	var toReturn = '\n';
	var arrayLength = Parser.objectList.length;

	for (let i = 0; i < arrayLength; i++){
		
		var obj = Parser.objectList[i];

		for (var p in obj){
			if (obj.hasOwnProperty(p)){
				toReturn += Parser.translateObj(obj,p);
			}
		}
	}
	return toReturn;
}

module.exports = Parser;