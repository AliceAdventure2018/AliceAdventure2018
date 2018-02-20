'use strict';

const PIXI = require('../../../Resources/pixi');
const Debug = require('./Debug');
const Event = require('./Event');

// class
var SceneObject;

// variables
SceneObject = function(_name = "untitled", _x = 0, _y = 0, _active = true, _properties = {}){
	this.name = _name;
	this.properties = _properties;

	// test
	this.sprite = PIXI.Sprite.fromImage("../TestImg/bunny.png");
	this.sprite.anchor.set(0.5);
	this.sprite.x = _x;
	this.sprite.y = _y;
	this.sprite.visible = _active;
	this.sprite.interactive = true;
	this.sprite.on("click", this.SelectOn);
	console.log("create object finished");
};

SceneObject.Selection = {
	objects: [], 
	set: function(_obj){
		this.objects = [_obj];
		Event.Broadcast("update-selected-object");
	}, 
	add: function(_obj){
		this.objects.push(_obj);
	},
	remove: function(_obj){
		// TODO rmv one obj
	},
	clear: function(){
		this.objects = [];
		Event.Broadcast("update-selected-object");
	}
}

// functions
SceneObject.prototype.EditDefinedProperty = function(_name, _value){
	switch (_name){
	case 'name': 
		this[_name] = _value;
		break;
	case 'x':
	case 'y':
	case 'active':
		// TODO: set sprite attribute
		break;
	default:
		Debug.LogError("Invalid property name: " + _name + "for object " + this.name);
		return;
	}
	// TODO: update visual
};

SceneObject.prototype.EditUserProperty = function(_name, _value){
	if (this.properties[_name] == undefined) {
		Debug.LogError("Invalid property name: " + _name + "for object " + this.name);
		return;
	}

	this.properties[_name] = _value;
	// TODO
};

SceneObject.prototype.SelectOff = function(){
	SceneObject.Selection.clear();
}

SceneObject.prototype.SelectOn = function(){
	if (SceneObject.Selection.objects[0] != null){
		SceneObject.Selection.objects[0].SelectOff();
	}
	SceneObject.Selection.set(this);
}

module.exports = SceneObject;