'use strict';

var ID; 

ID = {
	_counter: 0, 
	get newID(){ return this._counter++; }
};

module.exports = ID;