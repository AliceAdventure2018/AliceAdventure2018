
const fs = require('fs-extra');
const path = require('path');
const pixi = require.resolve('../Resources/pixi/pixi.js');
const pixi_sound = require.resolve('../Resources/pixi/pixi_sound');
const aliceAPI = require.resolve('../Engine/aliceAPI.js');


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

FileSys.folder = function(p){
	return path.dirname(p);
}

//return path to the resources folder under build path
FileSys.ensureAndCreate = function(jsonPath, callback){

	if (!fs.pathExistsSync(jsonPath)) {
		callback("json path : "+ jsonPath + ' is not valid\n');
		return false;
	}

	jsonPath = path.dirname(jsonPath);
	var buildPath = path.join(jsonPath, 'Build');
	var resourcesDest = path.join(buildPath, 'Resources');

	var assetSrc = './Assets';
	var assetDest = path.join(resourcesDest, 'Assets');
	
	var pixi_sound_map_src = path.join(path.dirname(pixi),'pixi-sound.js.map');
	var pixiFolder = path.join(resourcesDest, 'pixi');

	var aliceAPIDest = path.join(resourcesDest, 'aliceAPI.js');

	var pixiDest = path.join(pixiFolder, 'pixi.js');
	var soundDest = path.join(pixiFolder,'pixi_sound.js');
	var pixi_sound_map_dest = path.join(pixiFolder, 'pixi-sound.js.map');
	// if (! fs.pathExistSync(assetSrc)){
	// 	callback("Cannot find the assets folder under saving directory.");
	// 	return false;
	// }
	if (aliceAPI == null){
		callback("Cannot find aliceAPI.js, which should be under Engine/aliceAPI.js");
		return false;
	}
	if (pixi == null){
		callback("Cannot find pixi.js, which should be under Resources/pixi.js");
		return false;
	}
	if (pixi_sound==null){
		callback("Cannot find pixi-sound.js, which should be under Resources/pixi-sound.js");
		return false;
	}
	if (pixi_sound_map_src ==null){
		callback("Cannot find the Linker Address Map:pixi-sound.js.map, which should be under Resources/pixi-sound.js.map");
		return false;
	}

	FileSys.createBuildFolder(buildPath);
	FileSys.createBuildFolder(resourcesDest);
	FileSys.createBuildFolder(assetDest);
	FileSys.createBuildFolder(pixiFolder);
	FileSys.copyFileOrFolder(aliceAPI, aliceAPIDest);
	FileSys.copyFileOrFolder(pixi, pixiDest);
	FileSys.copyFileOrFolder(pixi_sound, soundDest);
	FileSys.copyFileOrFolder(pixi_sound_map_src, pixi_sound_map_dest),

	FileSys.copyFileOrFolder(FileSys.merge(assetSrc, 'inventory.png'), FileSys.merge(assetDest, 'inventory.png'));
	FileSys.copyFileOrFolder(FileSys.merge(assetSrc, 'textbox.png'), FileSys.merge(assetDest, 'textbox.png'));

	return buildPath;
}

module.exports = FileSys;


