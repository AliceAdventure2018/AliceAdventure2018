/*global require*/
//sychronous fs+JSON.parser version

'use strict';

const fs = require('fs-extra');
const FileSys = require('./fileSys.js');

var Parser;
Parser = function (jsonPath, buildPath){

	this.build = buildPath;
	this.game = fs.readJsonSync(jsonPath);

	this.assetPath = FileSys.merge(this.build, 'Resources/Assets');
	this.sceneList = this.game.sceneList;
	this.objectList = this.game.objectList;
	this.settings = this.game.settings;




this.createGame = function(){
	return 'var myGame = new GameManager();\n myGame.init(' + settings.resWidth + ',' 
															+ settings.resHeight + ',' 
															+ settings.inventoryGridNum + ');\n';
}

this.createScene= function(sceneName){
	return 'var ' + sceneName + '= new PIXI.Container();\n' + 'mayGame.addScene(' +  sceneName + ');'; 
}


//**************************Object Properties************************************
//Must Have:
// src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID

//*********obj is the (name + id) of the object in the json file********
//src must be a valid path to a image file.

//if youdelete a scene, all the objects within it will be deleted.
this.addObjectToScene= function(obj, sceneParent){
	return sceneParent + '.addChild(' + obj + ');';
}

this.createPIXIObject= function(obj, src){
	return 'var '+ obj + '= PIXI.Sprite.fromImage('+src + ');\n';
}
//
this.setAnchor=function(obj, anchor){
	return obj + '.anchor.set('+anchor.x+', ' + anchor.y+');\n';
}

this.setScale=function(obj, scale){
	return obj + '.scale.set(' + scale.x + ', ' + scale.y + ');\n';
}

//interactive or buttonMode should be boolean
this.setInteractive=function(obj, interactive){
	return obj + '.interactive = ' + interactive + ';\n';
}

this.setButtonMode=function(obj, buttonMode){
	return obj + '.buttonMode = ' + buttonMode + ';\n';
}

this.getNameWithID=function(obj, id){
	return obj + id;
}

this.setPos=function(obj, pos){
	return obj+'.x = ' + pos.x + ';\n' + obj+'.y = ' + pos.y+';\n';
}

this.setActive=function(obj, active){
	return obj + '.visible = ' + active + ';\n';
}

//arg is an array of arguments. It can be empty.
this.createFunction=function(obj, funct){
	
	return obj + '.' + functName + '= this.(' + arg + '){\n'+ body + '}\n\n';
}

this.createFunctionList=function(obj, functList){

	var toReturn = ''; 
	var arrayLength = functList.length;
	for (let i = 0; i < arrayLength; i++){
		toReturn += this.createFunction(obj, functList[i][0], functList[i][1], functList[i][2]);
	}
	return toReturn;
}

this.createSelfDefinedVar=function(obj, key, value){
	return obj + '.' + key + ' = ' + value + ';\n';
}

//return true if the name of the self defined properties 
// same as src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID
this.sameNameAsMustHave = function(key){
	return key =='src' || key == 'anchor' || key == 'scale' || key=='interactive' ||key =='buttonMode'
		|| key =='pos' || key == 'name' || key =='sceneParent' || key == 'id'|| key =='active';
}

this.createPropertyList = function (obj, properties){
	
	var toReturn= '';
	for (let i = 0; i < properties.length; i++){

	}
}


//
this.translateObj_mustHave=function(object, callback){
	
	var error;
	var toReturn = '';
	//must have
	// src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID
	if (object.hasOwnProperty(name)&& object.hasOwnProperty(id)){

		if (typeof (object.name) === "number"){
			error = "Name of the object cannot be numbers. Must have letters.";
			callback(error);
			return false;
		}else{

			var name = this.getNameWithID(object.name, object.id);
			
			//src
			if (object.hasOwnProperty(src)){

				if (fs.pathExistsSync(object.src) && object.src.filename && object.src.filename.match(/\.(jpg|jpeg|png)$/))
				{
					toReturn += this.createPIXIObject(name,object.src);
					FileSys.copyFileOrFolder(object.src, FileSys.merge(this.assetPath, object.src.filename));


				}else{
					error = "File path does not exist or the file extention does not match jpg/jpeg/png.";
					callback(error);	
					return false;				
				}
			}
			else{
				error = "Object does not have a sprite.";
				callback(error);
				return false;
			}

			//anchor
			if(object.hasOwnProperty(anchor)){

				if (object.anchor.hasOwnProperty(x) && !isNaN(object.anchor) && typeof object.anchor.x === "number"
					&& object.anchor.hasOwnProperty(y) && !isNaN(object.anchor) && typeof object.anchor.y === "number"){

					toReturn += this.setAnchor(name, object.anchor);
				}else{
					error = "x and y of anchor must be defined as numbers.";
					callback(error);
					return false;
				}
			}else{
				error="Object has not set the anchor.";
				callback(error);
				return false;
			}

			//pos
			if (object.hasOwnProperty(pos)){

				if (object.pos.hasOwnProperty(x) && !isNaN(object.pos.x) && typeof object.pos.x === "number"
					&& object.pos.hasOwnProperty(y) && !isNaN(object.pos.y) && typeof object.pos.y === "number"){

						toReturn += this.setPos(name, object.pos);
				}else{
					error = "x and y of the position must be defined as numbers.";
					callback(error);
					return false;
				}
			}else{
				error = "Object has not set the position.";
				callback(error);
				return false;
			}

			//scale
			if (object.hasOwnProperty(scale)){

				if (object.scale.hasOwnProperty(x) && !isNaN(object.scale.x) &&  typeof (object.scale.x) === "number"
					&& object.scale.hasOwnProperty(y) && !isNaN(object.scale.y) && typeof object.scale.y === "number"){

						toReturn += this.setScale(name, object.scale);
				}else{
					error = "x and y of the scale must be defined as numbers.";
					callback(error);
					return false;
				}
			}else{
				error = "Object has not set the scale.";
				callback(error);
				return false;
			}

			//interactive
			if (object.hasOwnProperty(interactive)){

				if (typeof object.interactive === 'boolean'){

					toReturn += this.setInteractive(name, object.interactive);
				}else{
					error = "The interactive value of the object must be a boolean.";
					callback(error);
					return false;
				}
			}else{
				error = "Object has not set the interativity.";
				callback(error);
				return false;
			}

			//buttonMode
			if (object.hasOwnProperty(buttonMode)){

				if (typeof object.buttonMode === 'boolean'){
					toReturn += this.setButtonMode(name, object.buttonMode);
				}else{
					error = "The buttonMode value of the object must be a boolean.";
					callback(error);
					return false;
				}
			}else{
				error = "object has not set the button mode.";
				callback(error);
				return false;
			}


			//active
			if(object.hasOwnProperty(active)){
				if(typeof object.active === 'boolean'){
					toReturn+= this.setActive(name, object.active);
				}else{
					error = "The active value of the object must be a boolean.";
					callback(error);
					return false;
				}
			}else{
				error = "object has not set the active value.";
				callback(error);
				return false;
			}

			//bindscene
			if (object.hasOwnProperty(bindscene)){
				toReturn+= this.addObjectToScene(name, object.bindscene);
			}else{
				error = "Object must be added to a scene.";
				callback(error);
				return false;
			}


		}
	}else{
		error = "Object must have a name !!"
		callback(error);
		return false;
	}

	return toReturn;
}


//iterate through the objectList
this.readObjects = function(callback){

	var toReturn = '\n';
	console.log(this.objectList);
	var arrayLength = this.objectList.length;

	for (let i = 0; i < arrayLength; i++){
		
		var obj = this.objectList[i];

			toReturn += this.translateObj_mustHave(obj, callback) + '\n';
			
		
	}
	return toReturn;
}

}
module.exports = Parser;