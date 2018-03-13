/*global require*/
//asychronous fs+JSON.parser version

'use strict';

const BST = require('./binaryTree.js');
const fs = require('fs-extra');
const path = require('path');

var Parser;
Parser = function(jsonPath){this.path = jsonPath;}

Parser.game = fs.readJsonSync(jsonPath);
Parser.sceneList = Parser.game.sceneList;
Parser.objectList = Parser.game.objectList;
Parser.settings = Parser.game.settings;

Parser.createGame = function(){
	return 'var myGame = new GameManager();\n myGame.init(' + settings.resWidth + ',' 
															+ settings.resHeight + ',' 
															+ settings.inventoryGridNum + ');\n';
}

Parser.createScene= function(sceneName){
	return 'var ' + sceneName + '= new PIXI.Container();\n' + 'mayGame.addScene(' +  sceneName + ');'; 
}


//**************************Object Properties************************************
//Must Have:
// src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID

//*********obj is the (name + id) of the object in the json file********
//src must be a valid path to a image file.

//if youdelete a scene, all the objects within it will be deleted.
Parser.addObjectToScene= function(obj, sceneParent){
	return sceneParent + '.addChild(' + obj + ');';
}

Parser.createPIXIObject= function(obj, src){
	return 'var '+ obj + '= PIXI.Sprite.fromImage('+src + ');\n';
}
//
Parser.setAnchor=function(obj, anchor){
	return obj + '.anchor.set('+anchor.x+', ' + anchor.y+');\n';
}

Parser.setScale=function(obj, scale){
	return obj + '.scale.set(' + scale.x + ', ' + scale.y + ');\n';
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
	return obj+'.x = ' + pos.x + ';\n' + obj+'.y = ' + pos.y+';\n';
}

Parser.setActive=function(obj, active){
	return obj + '.visible = ' + active + ';\n';
}

//arg is an array of arguments. It can be empty.
Parser.createFunction=function(obj, funct){
	
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

Parser.createSelfDefinedVar=function(obj, key, value){
	return obj + '.' + key + ' = ' + value + ';\n';
}

//return true if the name of the self defined properties 
// same as src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID
Parser.sameNameAsMustHave = function(key){
	return key =='src' || key == 'anchor' || key == 'scale' || key=='interactive' ||key =='buttonMode'
		|| key =='pos' || key == 'name' || key =='sceneParent' || key == 'id'|| key =='active';
}

Parser.createPropertyList = function (obj, properties){
	
	var toReturn= '';
	for (let i = 0; i < properties.length; i++){

	}
}


//
Parser.translateObj_mustHave=function(object, callback){
	
	var error;
	var toReturn = '';
	//must have
	// src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID
	if (object.hasOwnProperty(name)&& object.hasOwnProperty(id)){

		if (typeof (object.name) === "number"){
			error = "Name of the object cannot be numbers. Must have letters.";
			callback(error);
		}else{

			var name = Parser.getNameWithID(object.name, object.id);
			
			//src
			if (object.hasOwnProperty(src)){

				if (fs.pathExistsSync(object.src) && object.src.filename.match(/\.(jpg|jpeg|png)$/))
				{
					toReturn += Parser.createPIXIObject(name,object.src);

				}else{
					error = "File path does not exist or the file extention does not match jpg/jpeg/png.";
					callback(error);					
				}
			}
			else{
				error = "Object does not have a sprite.";
				callback(error);
			}

			//anchor
			if(object.hasOwnProperty(anchor)){

				if (object.anchor.hasOwnProperty(x) && !isNaN(object.anchor) && typeof object.anchor.x === "number"
					&& object.anchor.hasOwnProperty(y) && !isNaN(object.anchor) && typeof object.anchor.y === "number"){

					toReturn += Parser.setAnchor(name, object.anchor);
				}else{
					error = "x and y of anchor must be defined as numbers.";
					callback(error);
				}
			}else{
				error="Object has not set the anchor.";
				callback(error);
			}

			//pos
			if (object.hasOwnProperty(pos)){

				if (object.pos.hasOwnProperty(x) && !isNaN(object.pos.x) && typeof object.pos.x === "number"
					&& object.pos.hasOwnProperty(y) && !isNaN(object.pos.y) && typeof object.pos.y === "number"){

						toReturn += Parser.setPos(name, object.pos);
				}else{
					error = "x and y of the position must be defined as numbers.";
					callback(error);
				}
			}else{
				error = "Object has not set the position".;
				callback(error);
			}

			//scale
			if (object.hasOwnProperty(scale)){

				if (object.scale.hasOwnProperty(x) && !isNaN(object.scale.x) &&  typeof (object.scale.x) === "number"
					&& object.scale.hasOwnProperty(y) && !isNaN(object.scale.y) && typeof object.scale.y === "number"){

						toReturn += Parser.setScale(name, object.scale);
				}else{
					error = "x and y of the scale must be defined as numbers.";
					callback(error);
				}
			}else{
				error = "Object has not set the scale.";
				callback(error);
			}

			//interactive
			if (object.hasOwnProperty(interactive)){

				if (typeof object.interactive === 'boolean'){

					toReturn += Parser.setInteractive(name, object.interactive);
				}else{
					error = "The interactive value of the object must be a boolean.";
					callback(error);
				}
			}else{
				error = "Object has not set the interativity.";
				callback(error);
			}

			//buttonMode
			if (object.hasOwnProperty(buttonMode)){

				if (typeof object.buttonMode === 'boolean'){
					toReturn += Parser.setButtonMode(name, object.buttonMode);
				}else{
					error = "The buttonMode value of the object must be a boolean.";
					callback(error);
				}
			}else{
				error = "object has not set the button mode.";
				callback(error);
			}

			//active
			if(object.hasOwnProperty(active)){
				if(typeof object.active === 'boolean'){
					toReturn+= Parser.setActive(name, object.active);
				}else{
					error = "The active value of the object must be a boolean.";
					callback(error);
				}
			}else{
				error = "object has not set the active value.";
				callback(error);
			}

			//bindscene
			if (object.hasOwnProperty(bindscene)){
				toReturn+= Parser.addObjectToScene(name, object.bindscene);
			}else{
				error = "Object must be added to a scene.";
				callback(error);
			}


		}
	}else{
		error = "Object must have a name !!"
		callback(error);
	}
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