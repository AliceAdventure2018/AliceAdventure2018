
const fs = require('fs-extra');
const path = require('path');

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


FileSys.merge = function(p1,p2){
	return path.join(p1, p2);
}

FileSys.filename = function(absPath){
	return path.basename(absPath);
}

//need to create a html basic file
//need to rename the title


//return path to the resources folder under build path
FileSys.ensureAndCreate = function(jsonPath, callback){

	jsonPath = path.dirname(jsonPath);
	var buildPath = path.join(jsonPath, 'Build');
	var resourcesDest = path.join(buildPath, 'Resources');
	//var assetSrc = path.join(jasonPath, 'assets');
	var assetDest = path.join(resourcesDest, 'Assets');
	var aliceAPISrc = '../Engine/aliceAPI.js';
	var aliceAPIDest = path.join(resourcesDest, 'aliceAPI.js');
	var pixiSrc = '../Resources/pixi.js';
	var pixiDest = path.join(resourcesDest, 'pixi.js');

	// if (! fs.pathExistSync(assetSrc)){
	// 	callback("Cannot find the assets folder under saving directory.");
	// 	return false;
	// }
	if (! fs.pathExistsSync(aliceAPISrc)){
		callback("Cannot find aliceAPI.js, which should be under Engine/aliceAPI.js");
		return false;
	}
	if (! fs.pathExistsSync(pixiSrc)){
		callback("Cannot find pixi.js, which should be under Resources/pixi.js");
		return false;
	}

	FileSys.createBuildFolder(buildPath);
	FileSys.createBuildFolder(resourcesDest);
	FileSys.createBuildFolder(assetDest);
	FileSys.copyFileOrFolder(aliceAPISrc, aliceAPIDest);
	FileSys.copyFileOrFolder(pixiSrc, pixiDest);

	return buildPath;
}

module.exports = FileSys;


