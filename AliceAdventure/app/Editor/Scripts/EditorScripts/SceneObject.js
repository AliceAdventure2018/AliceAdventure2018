'use strict';

const PIXI = require('../../../Resources/pixi');
const Debug = require('./Debug');
const GameProperties = require('./GameProperties');
const Event = require('./Event');

// class
var SceneObject;

// variables
SceneObject = function(_name = "untitled", _x = 0, _y = 0, _active = true, _properties = []){
	this.name = _name;
	this.properties = _properties;
	this.selectAllowed = true;
	this.dragAllowed = true;
	this.drag = { on: false, eventData: {} };

	// test
	this.sprite = PIXI.Sprite.fromImage("../TestImg/bunny.png");
	this.sprite.anchor.set(0.5);
	this.sprite.x = _x;
	this.sprite.y = _y;
	this.sprite.visible = _active;
	this.sprite.interactive = true;
	this.sprite
		.on("pointerdown", this.OnPointerDown.bind(this))
		.on("pointermove", this.OnPointerMove.bind(this))
		.on("pointerup", this.OnPointerUp.bind(this));
	console.log("Created object " + _name);
};

SceneObject.Selection = { 
	objects: [], // Reference
	set: function(_obj){ // Internal Use
		SceneObject.Selection.objects = [_obj];
		Event.Broadcast("update-selected-object");
	}, 
	add: function(_obj){ // Internal Use
		SceneObject.Selection.objects.push(_obj);
	},
	remove: function(_obj){ // Internal Use
		// TODO rmv one obj
	},
	clear: function(){ // Internal Use
		SceneObject.Selection.objects = [];
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
}

SceneObject.prototype.GetUserProperty = function(_name){
	for (var i in this.properties){
		if (this.properties[i][0] == _name){
			return this.properties[i][1];
		}
	}
	return undefined;
}

SceneObject.prototype.SelectOff = function(){
	this.sprite.alpha = 1;
	SceneObject.Selection.clear();
}

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
}

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
}

SceneObject.prototype.OnPointerMove = function(_event){
	if (!(this instanceof SceneObject)) return;

	// While dragging
	if (this.dragAllowed && this.drag.on){
		var newPosition = this.drag.eventData.getLocalPosition(this.sprite.parent);
		this.sprite.x = Math.floor(newPosition.x);
		this.sprite.y = Math.floor(newPosition.y);
	}
}

SceneObject.prototype.OnPointerUp = function(_event){
	if (!(this instanceof SceneObject)) return;

	// Start dragging
	if (this.dragAllowed){
		this.drag.on = false;
	}
}

module.exports = SceneObject;