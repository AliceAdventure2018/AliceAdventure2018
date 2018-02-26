'use strict';

const PIXI = require('../../../Resources/pixi');
const ID = require('./ID');
const Debug = require('./Debug');
const GameProperties = require('./GameProperties');
const Event = require('./Event');

// class
var SceneObject;

// variables
SceneObject = function(_name = "untitled", _bindScene){
	this.id = ID.newID; // NEVER MODIFY THIS
	this.name = _name;
	this.bindScene = _bindScene;

	this.selectAllowed = true;
	this.selected = false;
	this.dragAllowed = true;
	this.drag = { on: false, eventData: {} };
	this.sprite = null;
	this.properties = [];
};

// static properties
SceneObject.AddObject = function(_objIndex, _bindScene, _x, _y){
	// test TODO: should read from objIndex
	let _obj = new SceneObject("bunny", _bindScene);
	_obj.InitSprite("../TestImg/bunny.png", _x, _y);
	_obj.properties = [];

	GameProperties.SceneObjectList.push(_obj);
	return _obj;
};

SceneObject.Selection = { 
	objects: [], // Reference
	set: function(_obj){
		this.objects = [_obj];
		Event.Broadcast("update-selected-object");
	}, 
	add: function(_obj){
		this.objects.push(_obj);
		Event.Broadcast("update-selected-object");
	},
	remove: function(_obj){
		var i = this.objects.indexOf(_obj);
		if (i >= 0) {
			this.objects.splice(i, 1);
			Event.Broadcast("update-selected-object");
		} else {
			Debug.LogWarning("Trying to remove missing selection object: " + _obj.name);
		}
	},
	clear: function(){
		this.objects = [];
		Event.Broadcast("update-selected-object");
	},
	contain: function(_obj){
		return (this.objects.indexOf(_obj) >= 0);
	}
};

// functions
SceneObject.prototype.InitSprite = function(_url, _x, _y, _scaleX = 1, _scaleY = 1, _visible = true){
	if (!(this instanceof SceneObject)) return;

	this.sprite = PIXI.Sprite.fromImage(_url);
	this.sprite.anchor.set(0.5);
	this.sprite.x = (typeof _x == "number" ? _x : 0);
	this.sprite.y = (typeof _y == "number" ? _y : 0);
	this.sprite.scale.set(_scaleX, _scaleY);
	this.sprite.visible = _visible;
	this.sprite.interactive = true;
	this.sprite
		.on("pointerdown", this.OnPointerDown.bind(this))
		.on("pointermove", this.OnPointerMove.bind(this))
		.on("pointerup", this.OnPointerUp.bind(this));
};

SceneObject.prototype.DeleteThis = function(){
	GameProperties.SceneObjectList.Delete(this);
};

SceneObject.prototype.AddUserProperty = function(_name, _value){
	this.properties.push([_name, _value]);
};

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
};

SceneObject.prototype.EditUserProperty = function(_name, _value){
	if (this.properties[_name] == undefined) {
		Debug.LogError("Invalid property name: " + _name + "for object " + this.name);
		return;
	}

	this.properties[_name] = _value;
	// TODO
};

SceneObject.prototype.AddUserProperty = function(_name, _value){
	this.properties.push([_name, _value]);
};

SceneObject.prototype.GetUserProperty = function(_name){
	for (var i in this.properties){
		if (this.properties[i][0] == _name){
			return this.properties[i][1];
		}
	}
	return undefined;
};

SceneObject.prototype.SelectOff = function(){
	this.sprite.alpha = 1;
	SceneObject.Selection.clear();
};

SceneObject.prototype.SelectOn = function(_add = false){
	if (_add){
		SceneObject.Selection.add(this);
		this.sprite.alpha = 0.7;
	} else{
		if (SceneObject.Selection.objects[0] != null){
			SceneObject.Selection.objects[0].SelectOff();
		}
		SceneObject.Selection.set(this);
		this.sprite.alpha = 0.7;
	}
};

SceneObject.prototype.IsSelected = function(){
	return SceneObject.Selection.contain(this);
};

SceneObject.prototype.OnPointerDown = function(_event){
	if (!(this instanceof SceneObject)) return;

	// Select this object
	if (this.selectAllowed){
		this.SelectOn();
	}

	// Start dragging
	if (this.dragAllowed){
		this.drag.on = true;
		this.drag.eventData = _event.data;
	}
};

SceneObject.prototype.OnPointerMove = function(_event){
	if (!(this instanceof SceneObject)) return;

	// While dragging
	if (this.dragAllowed && this.drag.on){
		var newPosition = this.drag.eventData.getLocalPosition(this.sprite.parent);
		this.sprite.x = Math.floor(newPosition.x);
		this.sprite.y = Math.floor(newPosition.y);
	}
};

SceneObject.prototype.OnPointerUp = function(_event){
	if (!(this instanceof SceneObject)) return;

	// Start dragging
	if (this.dragAllowed){
		this.drag.on = false;
	}
};

module.exports = SceneObject;