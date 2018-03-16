
'use strict';

const FileSys = require('./FileSys.js');
const Parser = require('./SimpleParser.js');

var  Compiler;

//path to the json file
//callback function to report error
Compiler = function (path, callback){
	this.buildDest = FileSys.ensureAndCreate(path,callback);



	//need a callback function to report error
	this.build = function(callback){
		
		if (!this.buildDest)return false;

		var parser = new Parser(path,this.buildDest);
		var string = parser.translate(callback);

		if (!string){
			console.log("Something wrong happened\n");
			return false;
		}
		FileSys.writeFile(FileSys.merge(this.buildDest, 'game.js'), string);
		return true;
	}
}

module.exports = Compiler;
