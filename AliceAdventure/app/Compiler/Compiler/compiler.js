
const FileSys = require('./fileSys.js');
const Parser = require('./simpleParser.js');

function compile(path){
	FileSys.ensureAndCreate();
	var string = Parser('example.json').readObjects();
	
	console.log(string);

	var dest = '../build/game.js'
	//FileSys.writeFile(dest, string)
}

compile();