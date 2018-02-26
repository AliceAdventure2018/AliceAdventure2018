
const fs = require('fs-extra');

//1) create a build folder. If it already exists, delete all the files within
//2) copy assets folder to build folder
//3) copy pixi folder to it
//4) copy aliceAPI.js
//7) write the parsed js file
//6) create an index which should include: 
//			--aliceAPI.js
//          --../pixi/pixi.min.js"
//          --game.js

//All are sync

var FileSys;
FileSys = function(){};

//asset folder should be unde the current working folder 'asset'
//The dest folder should be 'build/asset'
FileSys.copyFileOrFolder= function(src, dest){
	fs.copySync(src, dest);
}


//Ensures that a directory is empty. Deletes directory contents 
//if the directory is not empty. If the directory does not exist, it is created.
// The directory itself is not deleted.
FileSys.createBuildFolder = function(buildPath){
	fs.emptyDirSync(buildPath);
}

FileSys.writeFile = function(dest, string){
	fs.outputFileSync(dest, string);
}

//need to create a html basic file
//need to rename the title

FileSys.ensureAndCreate = function(){
	var buildPath = '../build';
	var assetSrc = '../assets';
	var assetDest = '../build/assets';
	var aliceAPISrc = '../aliceAPI.js';
	var aliceAPIDest = '../build/aliceAPI.js';
	var pixiSrc = '../pixi';
	var pixiDest = '../build/pixi';

	FileSys.createBuildFolder(buildPath);
	FileSys.copyFileOrFolder(assetSrc, assetDest);
	FileSys.copyFileOrFolder(aliceAPISrc, aliceAPIDest);
	FileSys.copyFileOrFolder(pixiSrc, pixiDest);

}

module.exports = FileSys;


