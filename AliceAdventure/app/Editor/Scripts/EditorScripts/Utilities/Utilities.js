'use strict'

var Utilities; 

Utilities = (function(){
	return {
		PIXI: require('../../../../Resources/pixi/pixi'), 
		ELECTRON: require('electron').remote,
		MENU: require('electron').remote.Menu, 
		FS: require('fs-extra'), 
		PATH: require('path'),
		PROMPT: require('electron-prompt'), 
		ID: require('./ID'), 
		Debug: require('./Debug'),
		Event: require('./Event'), 
	}
})();

module.exports = Utilities;