var fs = require('fs-extra');
var path = require('path');

//the thre 
function move (oldPath, newPath, callback)
{

}

//Create build folder under the project folder, which is the current workingspace.
function createBuildFolder(){

	try{
		fs.mkdirSync('build');
		console.log('Create build folder');
	}
	catch(err){
		if(err.code == 'EEXIST'){
			console.log('The directory named build exists, delete every file under it');

			const directory = 'buid'
			fs.readdir(directory, (err, files) =>{
				if(err) throw err;

				for (const file of files){
					fs.unlink(path.join(directory), file), err=>{
						if (err) throw err;
					}
				}
			});

		}else{
			alert("cannot find the path.");
		}
	}
}