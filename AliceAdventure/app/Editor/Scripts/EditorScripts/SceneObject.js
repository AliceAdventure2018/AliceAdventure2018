'use strict';

const PIXI = require('../../../Resources/pixi');
const Debug = require('./Debug');

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
	// TODO: active
};

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

module.exports = SceneObject;