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
		return 'var myGame = new GameManager();\n myGame.init(' + this.settings.resWidth + ',' 
																+ this.settings.resHeight + ',' 
																+ this.settings.inventoryGridNum + ');\n';
	}

	this.createScene= function(){
		var toReturn = '\n';

		for (let i =0; i < this.sceneList.length; i++){
			toReturn +='var ' + this.sceneList[i].name + '= new Alice.Scene();\n' + 'mayGame.sceneManager.addScene(' +  this.sceneList[i].name + ');\n'; 
		}

		return toReturn;
	}

	this.getSceneWithID = function(scene){
		return scene.name + '_' + scene.id;
	}
	//return sceneID
	this.findScene = function(id){
		for (let i =0; i < this.sceneList.length; i++){
			if (this.sceneList[i].id == id){
				return this.getSceneWithID(this.sceneList[i]);
			}
		}
		return false;
	}

	//**************************Object Properties************************************
	//Must Have:
	// src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID

	//*********obj is the (name + id) of the object in the json file********
	//src must be a valid path to a image file.

	//if youdelete a scene, all the objects within it will be deleted.
	this.addObjectToScene= function(obj, sceneParent){
		return sceneParent + '.addChild(' + obj + ');\n';
	}

	this.createPIXIObject= function(obj, src){
		return 'var '+ obj + '= Alice.Object.fromImage(\''+src + '\');\n';
	}
	

	this.setName = function (obj, nameID){
		return obj + '.name = ' + nameID+ ';\n';
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
		if (object.hasOwnProperty("name")&& object.hasOwnProperty("id")){

			if (typeof (object.name) === "number"){
				error = "Name of the object cannot be numbers. Must have letters.";
				callback(error);
				return false;
			}else{

				var name = this.getNameWithID(object.name, object.id);
				
				//src
				if (object.hasOwnProperty("src")){

					console.log(typeof(object.src));
					if (fs.pathExistsSync(object.src)&& FileSys.filename(object.src).match(/\.(jpg|jpeg|png)$/) )
					{	
						var dest = FileSys.merge(this.assetPath, FileSys.filename(object.src));
						FileSys.copyFileOrFolder(object.src, dest);
						toReturn += this.createPIXIObject(name,dest);
						toReturn += this.setName(name,name);

					}else{
						error = "File path does not exist or the file extention does not match jpg/jpeg/png.\n Invalid Path:**********\n" + object.src + '\n';
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
				if(object.hasOwnProperty("anchor")){

					if (object.anchor.hasOwnProperty("x") && !isNaN(object.anchor.x) && typeof (object.anchor.x) === "number"
						&& object.anchor.hasOwnProperty('y') && !isNaN(object.anchor.y) && typeof (object.anchor.y) === "number"){

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
				if (object.hasOwnProperty("pos")){

					if (object.pos.hasOwnProperty('x') && !isNaN(object.pos.x) && typeof object.pos.x === "number"
						&& object.pos.hasOwnProperty('y') && !isNaN(object.pos.y) && typeof object.pos.y === "number"){

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
				if (object.hasOwnProperty("scale")){

					if (object.scale.hasOwnProperty('x') && !isNaN(object.scale.x) &&  typeof (object.scale.x) === "number"
						&& object.scale.hasOwnProperty('y') && !isNaN(object.scale.y) && typeof object.scale.y === "number"){

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
				if (object.hasOwnProperty("interactive")){

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



				//active
				if(object.hasOwnProperty("active")){
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
				}//end active

				//bindscene
				if (object.hasOwnProperty("bindScene")){

					var scene = this.findScene(object.bindScene);

					if(!scene){
						error = 'Cannot find scene which hold ' + object.name + '\n';
						callback(error);
						return false;
					}else{
						toReturn+= this.addObjectToScene(name, scene);
					}
				}else{
					error = "Object must be added to a scene.";
					callback(error);
					return false;
				}


			}//end name

		}else{
			error = "Object must have a name !!"
			callback(error);
			return false;
		}

		return toReturn;
	}


	this.translateObj_NotMustHave = function(object, callback){

		var name = this.getNameWithID(object.name, object.id);
		if(obj.hasOwnProperty("nextTexture")){

			if (fs.pathExistsSync(object.nextTexture)
				&& FileSys.filename(object.nextTexture).match(/\.(jpg|jpeg|png)$/))
					{	
						var dest = FileSys.merge(this.assetPath,FileSys.filename(object.nextTexture));
						FileSys.copyFileOrFolder(object.nextTexture, dest);
						toReturn += name + '.nextTexture = Alice.Texture.fromImage(\''+object.nextTexture + '\');\n';

					}else{
						error = "Next Texture File path does not exist or the file extention does not match jpg/jpeg/png.";
						callback(error);	
						return false;				
					}
			}
		
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


	this.translate = function (callback){

		var toReturn= '\n';

		toReturn += "//===============create Game==================\n" + this.createGame();
		toReturn += "\n//===============create Scenes==================\n" +this.createScene();

		toReturn += "\n//===============create Objects==================\n";
		var mustHave = this.readMustHave(callback);
		if (!mustHave) {
			return false;
		}
		else toReturn += mustHave;

		return toReturn;
	}
}


module.exports = Parser;