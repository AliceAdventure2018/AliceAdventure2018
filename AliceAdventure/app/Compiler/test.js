
const FileSys = require('./FileSys.js');
const Parser = require('./SimpleParser.js');

function fileSysAlert(e){
	console.log(e);
}

function compile(path){
	var buildDest = FileSys.ensureAndCreate(path,fileSysAlert);
	var parser = new Parser(path,buildDest);
	
	var string = parser.translate(fileSysAlert);

	FileSys.writeFile(FileSys.merge(buildDest, 'game.js'), string);
}

compile("C:/Users/ruilit/Documents/2018-SP/Alice/test.json");