
'use strict';

const FileSys = require('./FileSys.js');
const Parser = require('./SimpleParser.js');

var  Compiler;

//path to the json file
//callback function to report error
Compiler = function (path, callback){
	this.buildDest = FileSys.ensureAndCreate(path,callback);
	this.parser = new Parser(path,this.buildDest);
	

	//need a callback function to report error
	this.build = function(callback){
		var string = this.parser.translate(callback);
		FileSys.writeFile(FileSys.merge(this.buildDest, 'game.js'), string);
	}
}

module.exports = Compiler;
