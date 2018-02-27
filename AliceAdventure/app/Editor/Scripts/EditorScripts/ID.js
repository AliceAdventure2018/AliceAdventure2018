'use strict';

var ID; 

ID = {
	_counter: 0, // DO NOT MODIFY DIRECTLY
	get newID(){ return this._counter++; }, 
	setCounter: function(n){this._counter = n;}
};

module.exports = ID;