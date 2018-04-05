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

}

//public:
//====================================================================================
	Parser.prototype.translate = function (callback){

		var toReturn= '\n';
		var sound = createSoundList.call(this,callback);
		if (sound ===false) return false;

		toReturn += "//===============create Game==================\n" + createGame.call(this);
		toReturn += "\n//===============add Sound==================\n" + sound;
		toReturn += "\n//===============create Scene================\n" + createScene.call(this);
		toReturn += "\n//===============create States================\n" + createStates.call(this);

		toReturn += "\n//===============create Objects==================\n";
		var mustHave = translateObjects.call(this,callback);
		if (mustHave===false) {
			return false;
		}
		else toReturn += mustHave;

		toReturn += "\n//================interaction=====================\n";
		var interaction = interactionListParser.call(this, callback);
		if (interaction === false) return false;
		else toReturn += interaction;

		toReturn += 'myGame.start(0);'
		return toReturn;
	}

	Parser.prototype.writeHTML = function(){
		var dest = FileSys.merge(this.build, 'index.html');
		var string = '<!doctype html>\n<head>\n <meta charset="utf-8">\n' 
					+'<title>' + this.settings.projectName + '</title> \n</head>\n' + 
					' <body><script src="Resources/pixi/pixi.js"></script>\n<script src="Resources/pixi/pixi-sound.js"></script>\n<script src="Resources/aliceAPI.js"></script>\n<script src="game.js">\n</script>\n</body>'
		FileSys.writeFile(dest, string);
	}


//private:
//=================setting up the basic game properties==============================
	function createGame(){
		return 'var myGame = new GameManager();\n myGame.init(' + this.settings.resWidth + ',' 
																+ this.settings.resHeight + ',' 
																+ this.settings.inventoryGridNum + ');\n';
	}

	function createScene(){
		return 'myGame.sceneManager.createScenes(' +this.sceneList.length + ');\n';
	}

	//the returned structure is {name_id : value} 
	function createStates() {
		var toReturn = 'myGame.states = {'
		for (let i = 0; i <this.stateList.length; i++){
			toReturn += this.stateList[i].name + '_' + this.stateList[i].id + ' : ' + this.stateList[i].value + ', '
		}
		return toReturn + '};\n';
	}


	function createSoundList(callback){
		var toReturn = '';
		
		//if (!this.soundList) return true;

		for (let i = 0; i < this.soundList.length; i++){
			var sound = this.soundList[i];

			if (sound.hasOwnProperty("id") && sound.hasOwnProperty("name") && sound.hasOwnProperty("src")){

				if (fs.pathExistsSync(sound.src)&& FileSys.filename(sound.src).match(/\.(wav|mp3)$/)){
					toReturn += addSound(sound);

				}else{
					callback("Compiler ERROR: sound {id = " +sound.id + ", name = " + sound.name + "} has INVALID source: \n" + sound.src + "\nEither the path is not correct or the file format is not WAV/MP4.");
					return false;
				}

			}else{
				callback("Compile ERROR: The soundList structure is not complete. It needs id, name , and a valid src path.");
				return  false;
			}

		}

		return toReturn;
	}

	function addSound(sound){
		return "myGame.sound.add('" + sound.name+'_'+sound.id +"', '" + sound.src+"');\n";
	}
	
	//if the scene is found, return the SCENE INDEX!!!!.
	//Otherwise, return false;
	function findSceneByID (id){
		for (let i =0; i < this.sceneList.length; i++){
	
			if (this.sceneList[i].id == id){

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

	function addObjectToScene(objName, sceneIndex){
		return 'myGame.scene(' + sceneIndex +  ').addChild(' + objName + ');\n';
	}

	function createPIXIObject(obj, src){
		return 'var '+ obj + '= Alice.Object.fromImage(\''+src + '\');\n';
	}

	function setName (obj, nameID){
		return obj + '.name = \'' + nameID+ '\';\n';
	}

	function setAnchor(obj, anchor){
		return obj + '.anchor.set('+anchor.x+', ' + anchor.y+');\n';
	}

	function setScale(obj, scale){
		return obj + '.scale.set(' + scale.x + ', ' + scale.y + ');\n';
	}

	//interactive or buttonMode should be boolean
	function setInteractive(obj, interactive){
		return obj + '.interactive = ' + interactive + ';\n' +obj + '.buttonMode = ' + interactive + ';\n';
	}

	function getNameWithID(obj, id){
		return obj.replace(/ +/g, "_") + '_' +  id;
	}

	function setPos(obj, pos){
		return obj+'.x = ' + pos.x + ';\n' + obj+'.y = ' + pos.y+';\n';
	}

	function setActive(obj, active){
		return obj + '.visible = ' + active + ';\n';
	}

	//return true if the name of the self defined properties 
	// same as src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID
	function sameNameAsMustHave(key){
		return key =='src' || key == 'anchor' || key == 'scale' || key=='interactive' ||key =='buttonMode'
			|| key =='pos' || key == 'name' || key =='sceneParent' || key == 'id'|| key =='active';
	}


	function translateObj_properties(object, callback){
		
		var error;
		var toReturn = '';
		
		// src, anchor, scale, interactive, buttonMode, pos, name, sceneParent, ID
		if (object.hasOwnProperty("name")&& object.hasOwnProperty("id")){

			if (typeof (object.name) === "number"){
				error = "Compile ERROR: Name of the object:  " + object.name + " cannot be numbers. Must have letters.";
				callback(error);
				return false;
			}else{

				var name = getNameWithID(object.name, object.id);
				
				//src
				//check if the path is valid, then copy the picture to the build folder
				if (object.hasOwnProperty("src")){

					if (fs.pathExistsSync(object.src)&& FileSys.filename(object.src).match(/\.(jpg|jpeg|png)$/) )
					{	
						var dest = FileSys.merge(this.assetPath, FileSys.filename(object.src));
						dest= dest.replace(/\\/g, "/");
						FileSys.copyFileOrFolder(object.src, dest);
						toReturn += createPIXIObject(name,dest);
						toReturn += setName(name,name);

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

						toReturn += setAnchor(name, object.anchor);
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

							toReturn += setPos(name, object.pos);
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

							toReturn += setScale(name, object.scale);
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

						toReturn += setInteractive(name, object.interactive);
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
						toReturn+= setActive(name, object.active);
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

					var sceneIndex =findSceneByID.call(this,object.bindScene);
					
					if (sceneIndex === false){
						callback("Compile ERROR: cannot find scene id = " + object.bindScene  + ".");
						return false;
					}else{
						toReturn+= addObjectToScene(name, sceneIndex);
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
	function translateObjects(callback){

		var toReturn = '\n';	
		var arrayLength = this.objectList.length;

		for (let i = 0; i < arrayLength; i++){
			
			var result = translateObj_properties.call(this, this.objectList[i], callback) + '\n';
			
			if (result === false){
				return false;
			}else{
				toReturn += result;
			}
			
		}
		return toReturn;
	}


//=====================Parse Interaction ===================================
	function translateInteractions(callback){
		var toReturn='\n';
		var arrayLength = this.interactionList.length;

		for(let i = 0; i< arrayLength;i++){
			var result = interactionParser.call(this, this.interactionList[i], callback)+ '\n';

			if (result === false){
				return false;
			}else{
				toReturn+= result;
			}
		}

		return toReturn;
	}

	//----------------------INTERACTION-------------------------------
	// interaction json format:
	// @param id:               the global counter
	// @param event:        	{type specifier, args[]}
	// @param conditionList:    a list of {stateID, val}
	// @param reactionList:     a list of reaction which is defineMiao Rend below

	//----------------------EVENT----------------------------------------
	// @param type：			type specifier
	// @param arg:  		different for each type

	// type     name          args_num        template
	//-----------------------------------------------------------
	// 0       Click on A        1           # is clicked on
	// 1       Use A on B        2           # is used on #
	// 2       Observe A         1           # is observed
	// 3     Combine A with B    2           # is combined with # 
	//------------------------------------------------------------

	//--------------------CONDITION-------------------------------
	//@param id: 		stateID
	//@param value: 	right-handside of the equation

	//----------------------REACTION-------------------------------
	// @param type:         type specifier 
	// @param args:        different for each type

	// type      name             input                template
	//-----------------------------------------------------------------------------------
	//   0     set state        [stateID, bool]       change (state of this ID) to (bool)
	//   1   transit to scene   [sceneID]             transite to scene of this ID
	//   2   put into inventory [objID]               put object of this ID INTO inventory
	//   3   remove outof inv   [objID]               remove object of this ID OUT OF inventory
	//   4   make visible       [objID]               make object visible
	//   5   make invisible     [objID]               make object invisible
	//   6   make interactive   [objID]               make object of this ID interactive
	//   7   make UNinteractive [objID]               make object of this ID UNinteractive
	//   8   play music         [soundID]             play music of this ID
	//   9   show message box   [string]              show message box 
	function interactionListParser(callback){

		var toReturn = "";
		for (let i = 0; i < this.interactionList.length; i++){
			var result = interactionParser.call(this, this.interactionList[i], callback);

			if (result === false) return false;
			else toReturn += result;
		}

		return toReturn + "\n";

	}

	function interactionParser(interaction, callback){
		var toReturn = "";
		if (interaction.hasOwnProperty("event") && interaction.hasOwnProperty("conditionList") && interaction.hasOwnProperty("reactionList")){

			var hasCondition = (interaction.conditionList.length > 0);

			var event = eventParser.call(this, interaction.event, callback);
			if (event === false) return false;

			var conditions = "";
			if (hasCondition){
				conditions  = conditionListParser.call(this, interaction.conditionList, callback);
				if (conditions === false ) return false;
			}

			var reactions = reactionListParser.call(this, interaction.reactionList,callback);
			if (reactions === false) return false;

			toReturn += event + conditions + reactions + "\n";
			if (hasCondition) toReturn += "}//if statement end\n"; //if statementend

			return toReturn + "}); //interaction end\n";


		}else{
			callback("JSON Format ERROR: interaction must have: event, conditionList, reactionList");
			return false;
		}

	}
//-------------------------CONDITION----------------------------------------

	function conditionListParser(conditionList, callback){
		var toReturn = "	if (";
		for (let i = 0; i < conditionList.length; i++){

			var state = findStateByID.call(this,conditionList[i].id);
			var value = conditionList[i].value;

			if (state === false){
				callback("Compile ERROR: conditionList: cannot find state of id : " + conditionList[i].id);
				return false;
			}else{
				if (i == conditionList.length -1){
					toReturn += "(myGame.states." + state + "==" + value + ")){\n";
				}
				else{
					toReturn += "(myGame.states." + state + "==" + value + ") &&";
				}
			}
		}
		return toReturn;

	}


//-------------------------REACTION------------------------------------------
	function reactionListParser(reactionList, callback){
		var toReturn = "";
		var indentCounter = 1;
		var messageBoxParenCounter = 0;
		for (let i = 0; i < reactionList.length; i++){
			var result = reactionParser.call(this,reactionList[i], callback);

			//if messageBox, all the following reaction is included in the call-back function.
			//console.log("reaction type is " + reactionList[i].type + "\n");
			if (reactionList[i].type == 9) {
				messageBoxParenCounter++;
				indentCounter++;
			}		

			if (result === false) return false;
			else if (reactionList[i].type == 9) toReturn += indent(indentCounter - 1, "") + result;
			else toReturn +=  indent(indentCounter, "") + result;
		}


		//message box back paren.
		//console.log("messageBoxParenCounter : " + messageBoxParenCounter + "\n");
		for (let j = 0; j < messageBoxParenCounter; j++){
			toReturn += indent( indentCounter,"") + "});//messageBox end\n";
			indentCounter--;
		}

		return toReturn;

	}

	function indent( indentCounter, string){
		if (indentCounter <= 0){
			return string;
		}else{
			return indent(indentCounter-1, string + "	");
		}

	}

	function reactionParser(reaction, callback){
		var type = reaction.type;
		var toReturn = "";

		switch(type){
			case 0:
				toReturn = translate_reactionType_0.call(this,reaction.args, callback);

				if (toReturn === false) return false;
				else return toReturn;
			case 1:
				toReturn = translate_reactionType_1.call(this,reaction.args, callback);

				if (toReturn === false) return false;
				else return toReturn;
			case 2:
				toReturn = translate_reactionType_2.call(this, reaction.args, callback);

				if (toReturn === false) return false;
				else return toReturn;
			case 3:
				toReturn = translate_reactionType_3.call(this, reaction.args, callback);

				if (toReturn === false) return false;
				else return toReturn;
			case 4:
				toReturn = translate_reactionType_4.call(this,reaction.args, callback);

				if (toReturn === false) return false;
				else return toReturn;
			case 5:
				toReturn = translate_reactionType_5.call(this,reaction.args, callback);

				if (toReturn === false) return false;
				else return toReturn;
			case 6:
				toReturn = translate_reactionType_6.call(this,reaction.args, callback);

				if (toReturn === false) return false;
				else return toReturn;
			case 7:
				toReturn = translate_reactionType_7.call(this,reaction.args, callback);

				if (toReturn === false) return false;
				else return toReturn;
			case 8:
				toReturn = translate_reactionType_8.call(this,reaction.args, callback);

				if (toReturn === false) return false;
				else return toReturn;

			case 9:
				toReturn = translate_reactionType_9.call(this,reaction.args, callback);

				if (toReturn === false) return false;
				else return toReturn;
			default:
				callback("WRONG REACTION TYPE");
				return false;
		}

	}
	//state changer
	function translate_reactionType_0( args, callback){
		if (args.length == 2){

			var state = findStateByID.call(this, args[0]);

			if (state === false || typeof (args[1]) !== "boolean"){
				callback("Compile ERROR: cannot find state of id for reaction type 0: " + args[0] + ".");
				return false;

			}else{
				return "myGame.states." + state + "= " + args[1] + ";\n";
			}

		}else{
			callback("JSON Format ERROR: reaction type 0 (set state [stateID, bool]) should have TWO arguments.");
			return false;
		}

	}

	//transit to scene
	function translate_reactionType_1( args, callback){
		if (args.length == 1){

			var sceneIndex = findSceneByID.call(this, args[0]);

			if (sceneIndex === false){
				callback("Compile ERROR: cannot find scene of id for reaction type 1: " + args[0] + ".");
				return false;

			}else{
				return "myGame.sceneManager.jumpToScene(" + sceneIndex +  ");\n";
			}

		}else{
			callback("JSON Format ERROR: reaction type 1 (scene transit) should have ONE argument.");
			return false;
		}
	}

	//put into Inventory
	function translate_reactionType_2( args, callback){
		if (args.length == 1){

			var obj= findObjectByID.call(this, args[0]);

			if (obj === false){
				callback("Compile ERROR: cannot find object of id: " + args[0] + ".");
				return false;

			}else{
				return "myGame.inventory.add(" + obj +  ");\n";
			}

		}else{
			callback("JSON Format ERROR: reaction type 2 (put into inventory) should have ONE argument.");
			return false;
		}
	}

	//remove out of inventory
	function translate_reactionType_3( args, callback){
		if (args.length == 1){

			var obj= findObjectByID.call(this, args[0]);

			if (obj === false){
				callback("Compile ERROR: cannot find object of id: " + args[0] + ".");
				return false;

			}else{
				return "myGame.inventory.remove(" + obj +  ");\n";
			}

		}else{
			callback("JSON Format ERROR: reaction type 3 (remvoe out of inventory) should have ONE argument.");
			return false;
		}

	}

	//make visible
	function translate_reactionType_4( args, callback){
		if (args.length == 1){

			var obj= findObjectByID.call(this, args[0]);

			if (obj === false){
				callback("Compile ERROR: cannot find object of id: " + args[0] + ".");
				return false;

			}else{
				return obj + ".visible = true;\n";
			}

		}else{
			callback("JSON Format ERROR: reaction type 4 (make A visible) should have ONE argument.");
			return false;
		}
	}

	//make invisible
	function translate_reactionType_5( args, callback){
		if (args.length == 1){

			var obj= findObjectByID.call(this, args[0]);

			if (obj === false){
				callback("Compile ERROR: cannot find object of id: " + args[0] + ".");
				return false;

			}else{
				return obj + ".visible = false;\n";
			}

		}else{
			callback("JSON Format ERROR: reaction type 5 (make A invisible) should have ONE argument.");
			return false;
		}
	}

	//make interactive
	function translate_reactionType_6( args, callback){
		if (args.length == 1){

			var obj= findObjectByID.call(this, args[0]);

			if (obj === false){
				callback("Compile ERROR: cannot find object of id: " + args[0] + ".");
				return false;

			}else{
				return obj + ".interactive = true;\n";
			}

		}else{
			callback("JSON Format ERROR: reaction type 6 (make A interactive) should have ONE argument.");
			return false;
		}

	}
	//make UNinteractive
	function translate_reactionType_7( args, callback){
		if (args.length == 1){

			var obj= findObjectByID.call(this, args[0]);

			if (obj === false){
				callback("Compile ERROR: cannot find object of id: " + args[0] + ".");
				return false;

			}else{
				return obj + ".interactive = false;\n";
			}

		}else{
			callback("JSON Format ERROR: reaction type 7 (make A UNinteractive) should have ONE argument.");
			return false;
		}

	}

	function translate_reactionType_8( args, callback){
		if (args.length == 1){

			var sound = findSoundByID.call(this, args[0]);

			if (sound === false){
				callback("Compile ERROR: cannot find sound of id: " + args[0] + ".");
				return false;

			}else{
				return "myGame.sound.play('" + sound + "')\n";
			}

		}else{
			callback("JSON Format ERROR: reaction type 8 (make A interactive) should have ONE argument.");
			return false;
		}

	}

	//show message box
	function translate_reactionType_9( args, callback){
		if (args.length == 1){
	
			return "myGame.messageBox.startConversation(['" + args[0] + "'], function(){\n";

		}else{
			callback("JSON Format ERROR: reaction type 9 (show messageBox) should have ONE argument.");
			return false;
		}
	}

//-------------------------EVENT----------------------------------------------
	function eventParser(event, callback){

		if (event.hasOwnProperty("type") && event.hasOwnProperty("args")){
			var toReturn = "";
			var type = event.type;

			switch(type){
				case 0: 
					toReturn = translate_eventType_0.call(this, event.args, callback);

					if (toReturn === false) return false;
					else return toReturn;
				case 1:
					toReturn = translate_eventType_1.call(this, event.args, callback);

					if (toReturn === false) return false;
					else return toReturn;
				case 2: 
					toReturn = translate_eventType_2.call(this, event.args, callback);

					if (toReturn === false) return false;
					else return toReturn;
				case 3:
					toReturn = translate_eventType_3.call(this, event.args, callback);

					if (toReturn === false) return false;
					else return toReturn;
			}
		}else{
			callback("JSON Format ERROR: Event has includes two componets: type and args.");
			return false;
		}
	}

	//click on A
	function translate_eventType_0(args, callback){
		if (args.length == 1){
			var objName = findObjectByID.call(this, args[0]);

			if (objName === false){
				callback("Compile ERROR: Cannot find the object of ID: " + objID + ".") ;
				return false;
			}else{
				return "\n//--------------Click--------------\n" +  objName + ".on('pointerdown', function(){\n";		
			}

		}else{
			callback("JSON Format ERROR: For event type 0 (click on A) must have ONLY one argument.");
			return false;
		}
	}

	//use A on B
	function translate_eventType_1(args, callback){
		if (args.length == 2){
			var obj1 = findObjectByID.call(this, args[0]);
			var obj2 = findObjectByID.call(this, args[1]);

			if (obj1 != false && obj2 != false){
				return "\n//-------------USE--------------\nmyGame.inventory.interactionSystem.addUsedEvent(" + obj1 + ", " + obj2 + ", function(){\n";

			}else{
				callback("Compile ERROR: cannot find object of id: " + obj1 + " or " + obj2 + ".");
				return false;
			}
		}else{
			callback("JSON Format ERROR: For event type 1 (Use A on B) must have TWO arguments.");
			return false;
		}
	}
		

	function translate_eventType_2(args, callback){
		if (args.length == 1){
			var objID = args[0];
			var objName = findObjectByID.call(this,objID);

			if (objName === false){
				callback("Compile ERROR: Cannot find the object of ID: " + objID + ".") ;
				return false;
			}else{
				return "\n//--------------Observe--------------\n" + objName + ".on('pointerdown', function(){\n";		
			}

		}else{
			callback("JSON Format ERROR: For event type 2 (Observe A) must have ONLY one argument.");
			return false;
		}
	}

	function translate_eventType_3(args, callback){
		if (args.length == 2){
			var obj1 = findObjectByID.call(this, args[0]);
			var obj2 = findObjectByID.call(this, args[1]);

			if (obj1 != false && obj2 != false){
				return "\n//-------------COMBINE--------------\nmyGame.inventory.interactionSystem.addCombineEvent(" + obj1 + ", " + obj2 + ", function(){\n";

			}else{
				callback("Compile ERROR: cannot find object of id: " + obj1 + " or " + obj2 + ".");
				return false;
			}

		}else{
			callback("JSON Format ERROR: For event type 3 (Combine A and B) must have TWO arguments.");
			return false;
		}
	}


	// return false if not found
	// return name_id if found
	function findObjectByID(ID){
		for (let i = 0; i < this.objectList.length; i++){
			if (this.objectList[i].id == ID){
				return getNameWithID(this.objectList[i].name, this.objectList[i].id);
			}
		}
		return false;
	}

	//return false if not found
	//return state_id if found
	function findStateByID(ID){
		for (let i = 0; i < this.stateList.length; i++){
			if (this.stateList[i].id == ID){
				return  this.stateList[i].name + '_' + this.stateList[i].id; 
			}
		}
		return false;
	}

	//return false if not found
	//return sound_id if found
	function findSoundByID(ID){
		for (let i = 0; i < this.soundList.length; i++){
			if (this.soundList.soundList[i].id == ID){
				return this.soundList[i].name + '_' + this.soundList[i].id; 
			}
		}
		return false;
	}


module.exports = Parser;