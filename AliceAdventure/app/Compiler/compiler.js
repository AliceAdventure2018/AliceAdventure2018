
const FileSys = require('./fileSys.js');
const Parser = require('./simpleParser.js');

function fileSysAlert(e){
	console.log(e);
}

function compile(path){
	var buildDest = FileSys.ensureAndCreate(path,fileSysAlert);
	var parser = new Parser(path,buildDest);
	
	console.log(parser.readObjects(fileSysAlert));

	//var dest = '../build/game.js'
	//FileSys.writeFile(dest, string)
}

compile("D:/ETC/18_SP/saves/test.json");