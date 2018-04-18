'use strict';

const {PIXI, FS, ID, Debug, Event} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');
const Resizer = require('./Resizer');

// class
var SceneObject;

// variables
SceneObject = function(_id = null, _name = "untitled", _src = "", _bindScene = null, _clickable = false, _draggable = false){
	if (_id == null) _id = ID.newID; // NEVER MODIFY THIS
	this.id = _id;
	this.name = _name;
	this.src = _src; // "Assets/xxx"
	//this.isDefault = true; // TODO
	this.bindScene = _bindScene;
	this.clickable = _clickable;
	this.draggable = _draggable;

	this.selectAllowed = true;
	this.selected = false;
	this.dragAllowed = true;
	this.drag = { on: false, eventData: {} };

	this.properties = [];
	this.sprite = null;

	GameProperties.AddObject(this);
};

// static properties
SceneObject.AddObject = function(_objInfo, _bindScene, _x, _y){
	// test TODO: should read from objIndex // currently _objIndex is the file name
	let _path = _objInfo.src;
	let _obj = new SceneObject(null, _objInfo.name, _path, _bindScene);
	_obj.InitSprite('../../' + _path, {x: _x, y: _y});
	return _obj;
};

SceneObject.LoadObject = function(_data){ // I AM HERE
	let _obj = new SceneObject(_data.id, _data.name, _data.src, GameProperties.GetSceneById(_data.bindScene), _data.clickable, _data.draggable);
	_obj.InitSprite('../../' + _data.src, _data.pos, _data.scale, _data.anchor, _data.active);
	return _obj;
};

SceneObject.SetViewSize = function(w, h){
	viewW = w; viewH = h;
};

var pixiFilters = { // private
	outlineFilterBlue: new PIXI.filters.OutlineFilter(4, 0x99ff99), 
}; 

// functions
SceneObject.prototype.InitSprite = function(_url, _pos, _scale, _anchor, _active){
	if (!(this instanceof SceneObject)) return;
	this.sprite = PIXI.Sprite.fromImage(_url);
	this.sprite.x = (_pos != null)?_pos.x: 0;
	this.sprite.y = (_pos != null)?_pos.y: 0;
	this.sprite.scale.set((_scale != null)?_scale.x: 0.5, (_scale != null)?_scale.y: 0.5);
	this.sprite.anchor.set((_anchor != null)?_anchor.x: 0.5, (_anchor != null)?_anchor.y: 0.5);
	this.sprite.visible = (_active != null)?_active:true;
	this.sprite.interactive = true;
	this.sprite
		.on("pointerdown", (e)=>{this.OnPointerDown(e);})
		.on("pointermove", (e)=>{this.OnPointerMove(e);})
		.on("pointerup", (e)=>{this.OnPointerUp(e);})
		.on("pointerupoutside", (e)=>{this.OnPointerUp(e);});
};

SceneObject.prototype.DeleteThis = function(){
	this.sprite.destroy({children:true, texture:true, baseTexture:true});
	GameProperties.DeleteObject(this);
};

SceneObject.prototype.AddUserProperty = function(_key, _type, _value){
	this.properties.push({
		key: _key,
		type: _type, 
		value: _value
	});
};

SceneObject.prototype.GetUserProperty = function(_name){
	for (var i in this.properties){
		if (this.properties[i].name == _name){
			return this.properties[i].value;
		}
	}
	return undefined;
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
	if (this.properties[_name].type != typeof _value) {
		Debug.LogError("Invalid type of value: " + _value + "for object " + this.name);
		return;
	}

	this.properties[_name].value = _value;
};

SceneObject.prototype.SelectOff = function(){
	this.selected = false;
	this.sprite.filters = [];
	Resizer.hideHelper(this.sprite);
};

SceneObject.prototype.SelectOn = function(){
	this.selected = true;
	this.sprite.filters = [pixiFilters.outlineFilterBlue];
	//Resizer.showHelper(this.sprite);	
};

SceneObject.prototype.OnPointerDown = function(_event){
	// Select this object
	if (this.selectAllowed){
		Event.Broadcast('object-sprite-click', this);
	}

	// Start dragging
	if (this.dragAllowed){
		this.drag.on = true;
		this.drag.eventData = _event.data;
		Resizer.showHelper(this.sprite);
	}
};

SceneObject.prototype.OnPointerMove = function(_event){
	// While dragging
	if (this.dragAllowed && this.drag.on){
		var newPosition = this.drag.eventData.getLocalPosition(this.sprite.parent);
		this.sprite.x = Math.floor(newPosition.x);
		this.sprite.y = Math.floor(newPosition.y);
		Resizer.updateBox();
	}
};

SceneObject.prototype.OnPointerUp = function(_event){
	// Stop dragging
	if (this.dragAllowed){
		this.drag.on = false;
	}
};

SceneObject.prototype.toJsonObject = function(){
	return {
		id: this.id, 
		name: this.name, 
		src: this.src, 
		//isDefault: this.isDefault, 
		pos: {x: this.sprite.x, y: this.sprite.y}, 
		anchor: {x: this.sprite.anchor.x, y: this.sprite.anchor.y}, 
		scale: {x: this.sprite.scale.x, y: this.sprite.scale.y}, 
		active: this.sprite.visible, 
		clickable: this.clickable, 
		draggable: this.draggable, 
		bindScene: this.bindScene.id, 
		//properties: _o.properties, 
	};
};

module.exports = SceneObject;