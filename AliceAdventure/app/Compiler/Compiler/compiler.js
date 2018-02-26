
const FileSys = require('./fileSys.js');
const Parser = require('./simpleParser.js');

function compile(){
	FileSys.ensureAndCreate();
	var string = Parser.readObjects();
	
	console.log(string);

	var dest = '../build/game.js'
	//FileSys.writeFile(dest, string)
}

compile();