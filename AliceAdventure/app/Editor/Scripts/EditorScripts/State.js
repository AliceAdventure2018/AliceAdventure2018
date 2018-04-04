'use strict';

const {ID} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');

// class
var State;

// variables
State = function(_id, _name, _val = false){
	if (_id == null) _id = ID.newID; // NEVER MODIFY THIS
	this.id = _id;
	this.name = _name;
	this.value = _val;

	//GameProperties.AddState(this);
};


State.prototype.toJSONObject = function() {
    var obj = {};
    obj.id = this.id;
    obj.name = this.name;
    obj.value = this.value;
    return obj;
}

// static
State.NewState = function(_name, _val = false){
	let state = new State(null, _name, _val);
	return state;
};

State.LoadState = function(_data){
	// TODO
	console.log("function not implemented");
	//let State = new State(_data.id);
	//State.eventList = [];
	//State.reactionList = [];
	//return State;
};

// functions
State.prototype.SetDefaultValue = function(_val){
	this.value = Boolean(_val);
};

State.prototype.DeleteThis = function(){
	GameProperties.DeleteState(this);
};

module.exports = State;