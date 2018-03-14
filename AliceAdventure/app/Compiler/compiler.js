
const FileSys = require('./fileSys.js');
const Parser = require('./simpleParser.js');

function fileSysAlert(e){
	console.log(e);
}

function compile(path){
	var buildDest = FileSys.ensureAndCreate(path,fileSysAlert);
	var string = Parser(path,buildDest);
	
	//console.log(string);

	//var dest = '../build/game.js'
	//FileSys.writeFile(dest, string)
}

compile("D:/ETC/18_SP/saves/example.json");