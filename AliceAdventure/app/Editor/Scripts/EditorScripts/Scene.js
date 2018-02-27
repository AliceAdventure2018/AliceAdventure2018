'use strict';

const ID = require('./ID');
const GameProperties = require('./GameProperties');

// class
var Scene;

// variables
Scene = function(_id, _name = "untitledScene"){
	if (_id == null) this.id = ID.newID; // NEVER MODIFY THIS
	this.name = _name;

	GameProperties.AddScene(this);
};

// static functions
Scene.AddScene = function(){
	// TODO
}

module.exports = Scene;