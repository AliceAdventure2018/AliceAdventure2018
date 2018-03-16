
'use strict';

const FileSys = require('./FileSys.js');
const Parser = require('./SimpleParser.js');

var  Compiler;

Compiler = function (path, callback){
	this.buildDest = FileSys.ensureAndCreate(path,callback);
	this.parser = new Parser(path,buildDest);
	
	this.build = function(callback){
		var string = this.parser.translate(callback);
		FileSys.writeFile(FileSys.merge(this.buildDest, 'game.js'), string);
	}
}

module.exports = Compiler;
