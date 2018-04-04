/*global require*/
//sychronous fs+JSON.parser version

'use strict';

const fs = require('fs-extra');
const FileSys = require('./FileSys.js');

var Parser;
Parser = function (jsonPath, buildPath){

	this.build = buildPath;
	this.game = fs.readJsonSync(jsonPath);

	this.assetPath = FileSys.merge(this.build, 'Resources/Assets');
	this.sceneList = this.game.sceneList;
	this.objectList = this.game.objectList;
	this.settings = this.game.settings;
	this.interactionList=this.game.interactionList;
	this.stateList = this.game.stateList;
	this.soundList = this.game.soundList;


	this.createGame = function(){
		return 'var myGame = new GameManager();\n myGame.init(' + this.settings.resWidth + ',' 
																+ this.settings.resHeight + ',' 
																+ this.settings.inventoryGridNum + ');\n';
	}

	this.createScene= function(){
		return 'myGame.sceneManager.createScenes(' +this.sceneList.length + ');\n';
	}

	//the returned structure is {name_id : value} 
	this.createStates = function(){
		var toReturn = 'myGame.states = {'
		for (let i = 0; i <this.stateList.length; i++){
			toReturn += stateList[i].name + '_' + stateList[i].id + ' : ' + stateList[i].value + ',\n'
		}
		return toReturn + '};\n';
	}

	this.addSound = function(sound){
		return "myGame.sound.add('" + sound.name+'_'+sound.id +"', '" + sound.src+"');\n";
	}

	this.createSoundList = function(callback){
		var toReturn = '';
		for (let i = 0; i < this.soundList.length; i++){
			var sound = soundList[i];

			if (sound.hasOwnProperty(id) && sound.hasOwnProperty(name) && sound.hasOwnProperty(src)){

				if (fs.pathExistsSync(sound.src)&& FileSys.filename(sound.src).match(/\.(wav|mp3)$/)){
					toReturn += addSound(sound);

				}else{
					callback("Compiler ERROR: sound {id = " +sound.id + ", name = " + sound.name + "} has INVALID source. Either the path is not correct or the file format is not WAV/MP4.");
				}

			}else{
				callback("Compile ERROR: The soundList structure is not complete. It needs id, name , and a valid src path.")
			}

		}
	}

	
	//if the scene is found, return the SCENE INDEX!!!!.
	//Otherwise, return false;
	this.findSceneByID = function(id){
		for (let i =0; i < this.sceneList.length; i++){
			if (this.sceneList[i].id === id){
				return i;
			}
		}
		return false;
	}

	//**************************Object Properties************************************
	//Must Have:
	// src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID

	//*********obj is the (name + id) of the object in the json file********
	//src must be a valid path to a image file.

	this.addObjectToScene= function(objName, sceneIndex){
		return 'myGame.scene(' + sceneIndex +  ').addChild(' + objName + ');\n';
	}

	this.createPIXIObject= function(obj, src){
		return 'var '+ obj + '= Alice.Object.fromImage(\''+src + '\');\n';
	}
	

	this.setName = function (obj, nameID){
		return obj + '.name = \'' + nameID+ '\';\n';
	}

	this.setAnchor=function(obj, anchor){
		return obj + '.anchor.set('+anchor.x+', ' + anchor.y+');\n';
	}

	this.setScale=function(obj, scale){
		return obj + '.scale.set(' + scale.x + ', ' + scale.y + ');\n';
	}

	//interactive or buttonMode should be boolean
	this.setInteractive=function(obj, interactive){
		return obj + '.interactive = ' + interactive + ';\n' +obj + '.buttonMode = ' + interactive + ';\n';
	}

	this.getNameWithID=function(obj, id){
		return obj + '_' +  id;
	}

	this.setPos=function(obj, pos){
		return obj+'.x = ' + pos.x + ';\n' + obj+'.y = ' + pos.y+';\n';
	}

	this.setActive=function(obj, active){
		return obj + '.visible = ' + active + ';\n';
	}

	//return true if the name of the self defined properties 
	// same as src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID
	this.sameNameAsMustHave = function(key){
		return key =='src' || key == 'anchor' || key == 'scale' || key=='interactive' ||key =='buttonMode'
			|| key =='pos' || key == 'name' || key =='sceneParent' || key == 'id'|| key =='active';
	}


	this.translateObj_mustHave=function(object, callback){
		
		var error;
		var toReturn = '';
		//must have
		// src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID
		if (object.hasOwnProperty("name")&& object.hasOwnProperty("id")){

			if (typeof (object.name) === "number"){
				error = "Compile ERROR: Name of the object:  " + object.name + " cannot be numbers. Must have letters.";
				callback(error);
				return false;
			}else{

				var name = this.getNameWithID(object.name, object.id);
				
				//src
				//check if the path is valid, then copy the picture to the build folder
				if (object.hasOwnProperty("src")){

					if (fs.pathExistsSync(object.src)&& FileSys.filename(object.src).match(/\.(jpg|jpeg|png)$/) )
					{	
						var dest = FileSys.merge(this.assetPath, FileSys.filename(object.src));
						dest= dest.replace(/\\/g, "/");
						FileSys.copyFileOrFolder(object.src, dest);
						toReturn += this.createPIXIObject(name,dest);
						toReturn += this.setName(name,name);

					}else{
						error = "Compile ERROR: Object: " + object.name + " File path does not exist or the file extention does not match jpg/jpeg/png.\n Invalid Path:**********\n" + object.src + '\n';
						callback(error);	
						return false;				
					}
				}
				else{
					error = "Compile ERROR: Object " + object.name + " does not have a sprite.";
					callback(error);
					return false;
				}//end src

				//anchor
				if(object.hasOwnProperty("anchor")){

					if (object.anchor.hasOwnProperty("x") && !isNaN(object.anchor.x) && typeof (object.anchor.x) === "number"
						&& object.anchor.hasOwnProperty('y') && !isNaN(object.anchor.y) && typeof (object.anchor.y) === "number"){

						toReturn += this.setAnchor(name, object.anchor);
					}else{
						error =  "Object " + object.name + ": x and y of anchor must be defined as numbers.";
						callback(error);
						return false;
					}
				}else{
					error="Object " + object.name + " has not set the anchor.";
					callback(error);
					return false;
				}//end anchor

				//pos
				if (object.hasOwnProperty("pos")){

					if (object.pos.hasOwnProperty('x') && !isNaN(object.pos.x) && typeof object.pos.x === "number"
						&& object.pos.hasOwnProperty('y') && !isNaN(object.pos.y) && typeof object.pos.y === "number"){

							toReturn += this.setPos(name, object.pos);
					}else{
						error = "Compile ERROR: x and y of the position must be defined as numbers.";
						callback(error);
						return false;
					}
				}else{
					error = "Compile ERROR: Object has not set the position.";
					callback(error);
					return false;
				}//end pos

				//scale
				if (object.hasOwnProperty("scale")){

					if (object.scale.hasOwnProperty('x') && !isNaN(object.scale.x) &&  typeof (object.scale.x) === "number"
						&& object.scale.hasOwnProperty('y') && !isNaN(object.scale.y) && typeof object.scale.y === "number"){

							toReturn += this.setScale(name, object.scale);
					}else{
						error = "Compile ERROR: x and y of the scale must be defined as numbers.";
						callback(error);
						return false;
					}
				}else{
					error = "Compile ERROR: Object has not set the scale.";
					callback(error);
					return false;
				}

				//interactive
				if (object.hasOwnProperty("interactive")){

					if (typeof object.interactive === 'boolean'){

						toReturn += this.setInteractive(name, object.interactive);
					}else{
						error = "Compile ERROR: The interactive value of the object must be a boolean.";
						callback(error);
						return false;
					}
				}else{
					error = "Compile ERROR: Object has not set the interativity.";
					callback(error);
					return false;
				}//end interactive



				//active
				if(object.hasOwnProperty("active")){
					if(typeof object.active === 'boolean'){
						toReturn+= this.setActive(name, object.active);
					}else{
						error = "Compile ERROR: The active value of the object must be a boolean.";
						callback(error);
						return false;
					}
				}else{
					error = "Compile ERROR: object has not set the active value.";
					callback(error);
					return false;
				}//end active

				//bindscene
				if (object.hasOwnProperty("bindScene")){

					var sceneIndex = findSceneByID(object.bindscene);
					if (! sceneIndex){
						callback("Compile ERROR: cannot find scene id = " + sceneID  + ".");
						return false;
					}else{
						toReturn+= this.addObjectToScene(name, sceneIndex);
					}
				}else{
					error = "Compile ERROR: Object must be added to a scene.";
					callback(error);
					return false;
				}


			}//end name

		}else{
			error = "Compile ERROR: Object must have a name !!"
			callback(error);
			return false;
		}

		return toReturn;
	}



	//iterate through the objectList
	this.readMustHave = function(callback){

		var toReturn = '\n';	
		var arrayLength = this.objectList.length;

		for (let i = 0; i < arrayLength; i++){
			
			var result = this.translateObj_mustHave(this.objectList[i], callback) + '\n';
			
			if (!result){
				return false;
			}else{
				toReturn += result;
			}
			
		}
		return toReturn;
	}


//========================settings=============
	this.writeHTML = function (){
		var dest = FileSys.merge(this.build, 'index.html');
		var string = '<!doctype html>\n<head>\n <meta charset="utf-8">\n' 
					+'<title>' + this.settings.projectName + '</title> \n</head>\n' + 
					' <body><script src="Resources/pixi/pixi.js"></script>\n<script src="Resources/pixi/pixi-sound.js"></script>\n<script src="Resources/aliceAPI.js"></script>\n<script src="game.js">\n</script>\n</body>'
		FileSys.writeFile(dest, string);
	}

	
	this.translate = function (callback){

		var toReturn= '\n';

		toReturn += "//===============create Game==================\n" + this.createGame();
		toReturn += "\n//===============add Sound==================\n" +this.createSoundList();
		toReturn += "\n//===============create Scene================\n" + this.createScene();
		toReturn += "\n//===============create States================\n" + this.createStates();

		toReturn += "\n//===============create Objects==================\n";
		var mustHave = this.readMustHave(callback);
		if (!mustHave) {
			return false;
		}
		else toReturn += mustHave;


		toReturn += 'myGame.start();'
		return toReturn;
	}
}


module.exports = Parser;