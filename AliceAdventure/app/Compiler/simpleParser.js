/*global require*/
//asychronous fs+JSON.parser version
"use strict";
const fs = require('fs');

var main;
fs.readFile('./example.json', function read(err, data){
	if (err) throw err;
	main = JSON.parse(data);
})
var sceneList = main.game;

function createGame(gameName, width,height,invent_size){
	return 'var ' + gameName + '= new GameManager();\n' + gameName + '.init(' + width + ',' + height + ',' + invent_size + ');';
}

function createScene(sceneName, GameName){
	return 'var ' + sceneName + '= new PIXI.Container();\n' + GameName + '.addScene(' +  sceneName + ');'; 
}

function addPIXIObjectToScene(obj, scene){
	return scene + '.addChild(' + obj + ');';
}

//**************************Object Properties************************************
//Must Have:
// src, anchor, scale, interactive, buttonMode, pos, name

//*********obj is the name of the object in the json file********
//src must be a valid path to a image file.
function createPIXIObject(obj, src){
	return 'var '+ obj + '= PIXI.Sprite.fromImage('+src + ');\n';
}
//
function setAnchor(obj, num){
	return obj + '.anchor.set('+num+');\n';
}

function setScale(obj, scale){
	return obj + '.scale.set(' + scale + ');\n';
}

//interactive or buttonMode should be boolean
function setInteractive(obj, interactive){
	return obj + '.interactive = ' + interactive + ';\n';
}

function setButtonMode(obj, buttonMode){
	return obj + '.buttonMode = ' + buttonMode + ';\n';
}

//name should be a string
function setName(obj, name){
	return obj + '.name = ' + name + ';\n';
}

function setPos(obj, pos){
	return obj+'.x = ' + pos[0] + ';\n' + obj+'.y = ' + pos[1]+';\n';
}

function setTarget(obj, target){
	return obj + '.target = ' + target + ';\n';
}

//arg is an array of arguments. It can be empty.
function createFunction(obj, functName, arg, body){
	return obj + '.' + functName + '= function (' + arg.toString() + '){\n'+ body + '}\n\n';
}

function translateObj(obj, key, val){
	var toReturn;
	switch (key){
		case "src": toReturn  = createPIXIObject(obj, obj[key]); break;
		case "anchor" : toReturn  = setAnchor(obj, obj[key]); break;
		case "scale" : toReturn = setScale(obj, obj[key]); break;
		case "interactive" : toReturn = setInteractive(obj, obj[key]);break;
		case "buttonMode" : toReturn = setButtonMode(obj, obj[key]); break;
		case "pos" : toReturn = setPos(obj, obj[key]); break;
		case "name": toReturn = setName(obj, obj[key]); break;
		case "funct" : toReturn = createFunction(obj, obj[key][0], obj[key][1], obj[key][2]); break;
		default:
		//need to do something else
			toReturn = "not must-have";
			break;
	}
	return toReturn;
}


//iterate through the objectList in each scene.
function readandWriteObjects(obj){
	
}

//iterate through the sceneList in the game.
function readandWriteSceneS(){

}

function writeFile(dest, string){
    fs.writeFile(dest, string);
}
