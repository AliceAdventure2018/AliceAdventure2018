'use strict';

const Debug = require('./Debug');
const ID = require('./ID');
const GameProperties = require('./GameProperties');

// class
var IEvent;

// variables
IEvent = function(_id, _type, _name){
	if (_id == null) _id = ID.newID; // NEVER MODIFY THIS
	this.id = _id;
	this.type = _type;
	this.name = _name;

	this.args = {};

	GameProperties.AddIEvent(this);
};

// static
IEvent.Type = {
	StateChange: 0, 
	ObjClick: 1, 
	ObjUse: 2, 
	InvCombine: 3, 
	InvClick: 4, 
};

IEvent.NewIEvent = function(_type, _name, _args = {}){
	let iEvent = new IEvent(null, _type, _name);
	iEvent.InitArgs(_args);
	return iEvent;
};

IEvent.LoadIEvent = function(_data){
	// TODO
	console.log("function not implemented");
};

// functions
IEvent.prototype.InitArgs = function(_args){
	this.args = _args;
	switch (this.type){
		case IEvent.Type.StateChange: 
		case IEvent.Type.ObjClick: 
		case IEvent.Type.ObjUse: 
		case IEvent.Type.InvCombine: 
		case IEvent.Type.InvClick: 
			break;
		default: 
			Debug.LogError("IEvent type not exists");
	}
}

IEvent.prototype.DeleteThis = function(){
	GameProperties.DeleteIEvent(this);
};

module.exports = IEvent;