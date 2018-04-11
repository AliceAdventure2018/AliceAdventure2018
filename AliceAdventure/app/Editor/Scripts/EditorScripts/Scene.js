'use strict';

const {PIXI, ID, Event} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');

// class
var Scene;

// variables
Scene = function(_id, _name = "untitledScene"){
	if (_id == null) _id = ID.newID; // NEVER MODIFY THIS
	this.id = _id;
	this.name = _name;

	this.container = null;
	this.selected = false;

	GameProperties.AddScene(this);
};

// static
Scene.AddScene = function(_name){
	let scene = new Scene(null, _name);
	scene.InitContainer();
	return scene;
};

Scene.LoadScene = function(_data){
	let scene = new Scene(_data.id, _data.name);
	scene.InitContainer();
	return scene;
}

/*Scene.Selection = { // only 1 selection is supported 
	scene: null, // Dont set this directly
	hasSelection: function(){ return (this.scene != null); }, 
	select: function(_scene){ 
		if (_scene instanceof Scene) {
			if (this.scene != null){
				this.scene.container.visible = false;
			}
			_scene.container.visible = true;
			this.scene = _scene;
			Event.Broadcast("update-selected-scene");
		}
	}, 
	cancel: function(){ 
		if (this.scene != null){
			this.scene.container.visible = false;
		}
		this.scene = null;
		Event.Broadcast("update-selected-scene");
	}
};*/

// functions
Scene.prototype.InitContainer = function(){
	this.container = new PIXI.Container();
	this.container.visible = false;
}

Scene.prototype.DeleteThis = function(){
	GameProperties.DeleteScene(this);
}

Scene.prototype.SelectOn = function(){
	this.selected = true;
	this.container.visible = true;
};

Scene.prototype.SelectOff = function(){
	this.selected = false;
	this.container.visible = false;
};

Scene.prototype.toJsonObject = function(){
	return {
		id: this.id, 
		name: this.name
	};
}

module.exports = Scene;