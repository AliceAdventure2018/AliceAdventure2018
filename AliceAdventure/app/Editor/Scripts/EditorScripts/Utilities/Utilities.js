'use strict'

var Utilities; 

Utilities = (function(){
	var PIXI = require('../../../../Resources/pixi/pixi');
	Object.assign(PIXI.filters, require('../../../../Resources/pixi/pixi-extra-filters.min.js'));
	return {
		PIXI: PIXI, 
		ELECTRON: require('electron').remote,
		//MENU: require('electron').remote.Menu, 
		FS: require('fs-extra'), 
		PATH: require('path'),
		PROMPT: require('electron-prompt'), 
		ID: require('./ID'), 
		Debug: require('./Debug'),
		Event: require('./Event'), 
		//Resizer: require('./Resizer'),
	}
})();

module.exports = Utilities;